"""
Couche de sérialisation du module d'authentification.

Ce module regroupe les sérialiseurs des quatre flux d'authentification :

- inscription : :class:`RegisterSerializer` ;
- connexion : :class:`LoginSerializer` ;
- vérification d'adresse email par code : :class:`VerifyEmailSerializer` ;
- réinitialisation de mot de passe : :class:`PasswordResetRequestSerializer`
  et :class:`PasswordResetConfirmSerializer`.

Chaque sérialiseur valide strictement ses entrées et produit des messages
d'erreur en français, clairs et rattachés au champ concerné, sans jamais
exposer d'information sensible (existence d'un compte, état d'un code, etc.).
"""

import re
from typing import Any, Final

from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils import timezone
from django.utils.encoding import force_str
from rest_framework import serializers

from .models import User, optCode

# Longueur minimale imposée aux mots de passe (inscription et réinitialisation).
LONGUEUR_MIN_MOT_DE_PASSE: Final[int] = 8


def _valider_robustesse_mot_de_passe(password: str) -> None:
    """
    Applique la politique de robustesse des mots de passe du projet.

    Règles métier :
    - longueur minimale de ``LONGUEUR_MIN_MOT_DE_PASSE`` caractères ;
    - au moins une lettre majuscule ;
    - au moins un chiffre ;
    - au moins un caractère spécial (non alphanumérique).

    Les validateurs Django (``validate_password``, configurés via
    ``AUTH_PASSWORD_VALIDATORS``) sont ensuite appliqués : mots de passe trop
    courants, similarité avec les attributs du compte, etc.

    Toutes les erreurs détectées sont accumulées puis renvoyées en une seule
    exception, afin que l'utilisateur voie l'intégralité des règles non
    respectées en un seul essai.

    Args:
        password: Mot de passe en clair soumis par l'utilisateur.

    Raises:
        serializers.ValidationError: Si au moins une règle n'est pas respectée.
    """
    erreurs: list[str] = []

    if len(password) < LONGUEUR_MIN_MOT_DE_PASSE:
        erreurs.append(
            f"Le mot de passe doit contenir au moins "
            f"{LONGUEUR_MIN_MOT_DE_PASSE} caractères."
        )
    if not re.search(r"[A-Z]", password):
        erreurs.append("Le mot de passe doit contenir au moins une lettre majuscule.")
    if not re.search(r"[0-9]", password):
        erreurs.append("Le mot de passe doit contenir au moins un chiffre.")
    if not re.search(r"[^A-Za-z0-9]", password):
        erreurs.append("Le mot de passe doit contenir au moins un caractère spécial.")

    if erreurs:
        raise serializers.ValidationError(erreurs)

    # Validateurs Django (mots de passe courants, similarité, etc.) : leurs
    # messages sont traduits en français via LANGUAGE_CODE = "fr-fr". Ils sont
    # convertis explicitement en ValidationError DRF pour garantir un format
    # d'erreur homogène, rattaché au champ appelant.
    try:
        validate_password(password)
    except DjangoValidationError as exc:
        raise serializers.ValidationError(
            [force_str(message) for message in exc.messages]
        ) from exc


class RegisterSerializer(serializers.Serializer):
    """
    Sérialiseur d'inscription d'un nouvel utilisateur.

    Rôle : valider les données d'inscription puis créer le compte.

    Champs :
        - ``email`` : adresse email du compte, unique et insensible à la
          casse (le format est validé par ``EmailField``) ;
        - ``password`` : mot de passe en clair (écriture seule, jamais
          renvoyé dans les réponses) ;
        - ``confirmPassword`` : confirmation du mot de passe (écriture
          seule, non persistée, strictement identique à ``password``).

    Le mot de passe est haché par le manager (``UserManager.create_user`` →
    ``set_password``) : il n'est jamais stocké ni sérialisé en clair.
    """

    email = serializers.EmailField(
        required=True,
        error_messages={
            "required": "L'email est obligatoire.",
            "invalid": "Veuillez fournir une adresse email valide.",
        },
    )
    password = serializers.CharField(
        required=True,
        write_only=True,
        error_messages={"required": "Le mot de passe est obligatoire."},
    )
    confirmPassword = serializers.CharField(
        required=True,
        write_only=True,
        error_messages={"required": "La confirmation du mot de passe est obligatoire."},
    )

    def validate_email(self, value: str) -> str:
        """
        Normalise l'email puis vérifie son unicité de manière insensible à
        la casse.

        La mise en minuscules garantit qu'un même email saisi avec des casses
        différentes (ex. ``Jean@Mail.com`` et ``jean@mail.com``) ne peut pas
        créer deux comptes distincts.
        """
        email = value.strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("Un compte existe déjà avec cet email.")
        return email

    def validate_password(self, value: str) -> str:
        """Vérifie la robustesse du mot de passe (politique du projet)."""
        _valider_robustesse_mot_de_passe(value)
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """
        Validation croisée : le mot de passe et sa confirmation doivent être
        strictement identiques.

        L'erreur est rattachée au champ ``confirmPassword`` pour que le
        frontend puisse l'afficher au bon endroit. Si l'un des deux champs a
        déjà échoué à sa validation de champ, il est absent de ``attrs`` et
        la comparaison est ignorée (l'erreur de champ suffit).
        """
        password = attrs.get("password")
        confirmation = attrs.get("confirmPassword")
        if (
            password is not None
            and confirmation is not None
            and password != confirmation
        ):
            raise serializers.ValidationError(
                {"confirmPassword": ["Les mots de passe ne correspondent pas."]}
            )
        return attrs

    def create(self, validated_data: dict[str, Any]) -> User:
        """
        Crée le compte utilisateur.

        - ``confirmPassword`` est retiré : champ de contrôle, non persisté ;
        - la création est déléguée à ``UserManager.create_user``, qui hache
          le mot de passe (``set_password``) et normalise l'email.

        Les champs profil obligatoires du modèle (``first_name``,
        ``last_name``, ``number_phone``) sont initialisés à vide : ils seront
        renseignés lors de l'onboarding (cf. ``onboarding_completed``).
        """
        validated_data.pop("confirmPassword")
        validated_data.setdefault("first_name", "")
        validated_data.setdefault("last_name", "")
        validated_data.setdefault("number_phone", "")
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    """
    Sérialiseur de connexion (authentification email + mot de passe).

    Rôle : vérifier les identifiants et exposer l'utilisateur authentifié.

    Champs :
        - ``email`` : adresse email du compte ;
        - ``password`` : mot de passe en clair (écriture seule).

    Après validation réussie, ``validated_data["user"]`` contient l'instance
    ``User`` authentifiée, directement exploitable par la vue pour émettre
    les tokens JWT (sans nouvelle requête en base).
    """

    email = serializers.EmailField(
        error_messages={
            "required": "L'email est obligatoire.",
            "invalid": "Veuillez fournir une adresse email valide.",
        },
    )
    password = serializers.CharField(
        write_only=True,
        error_messages={"required": "Le mot de passe est obligatoire."},
    )

    def validate_email(self, value: str) -> str:
        """
        Normalise l'email (espaces, minuscules) pour garantir une recherche
        cohérente avec l'email stocké à l'inscription.
        """
        return value.strip().lower()

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """
        Authentifie l'utilisateur à partir de l'email et du mot de passe.

        Logique métier :
        - l'email est recherché en base de manière insensible à la casse ;
        - si aucun compte n'existe, une comparaison de mot de passe factice
          est malgré tout effectuée afin d'uniformiser la durée de traitement
          et de contrer l'énumération de comptes par analyse temporelle ;
        - le mot de passe est vérifié via ``check_password`` (comparaison au
          hash stocké, jamais en clair) et le compte doit être actif ;
        - un message d'erreur volontairement générique couvre les trois cas
          d'échec (email inconnu, mot de passe erroné, compte désactivé)
          afin de ne rien révéler à un attaquant.
        """
        email = attrs.get("email")
        password = attrs.get("password")
        if not email or password is None:
            # Erreurs de champ déjà signalées (email invalide ou champ
            # manquant) : la validation croisée n'a rien à ajouter.
            return attrs

        user = User.objects.filter(email__iexact=email).first()

        if user is None:
            # Comparaison factice : même durée de traitement qu'une vraie
            # vérification, pour ne pas révéler l'absence du compte.
            check_password(password, make_password(password))

        if user is None or not user.check_password(password) or not user.is_active:
            raise serializers.ValidationError("Email ou mot de passe incorrect.")

        attrs["user"] = user
        return attrs


class VerifyEmailSerializer(serializers.Serializer):
    """
    Sérialiseur de vérification d'adresse email par code à 6 chiffres.

    Rôle : valider le code de vérification saisi par l'utilisateur.

    Champ :
        - ``code`` : chaîne strictement numérique de 6 caractères, alignée
          sur ``optCode.code`` (``max_length=6``).

    Contrat avec la vue : l'email concerné doit être fourni dans le contexte
    du sérialiseur (``VerifyEmailSerializer(data=..., context={"email": ...})``).
    Le code est alors recherché en base en étant associé à l'utilisateur dont
    l'email correspond (insensible à la casse), non expiré
    (``code_expiration``) et non encore utilisé (``is_used``).

    La vue reste responsable du marquage du code comme utilisé et de
    l'activation du compte : ce sérialiseur se limite à la validation.
    """

    code = serializers.CharField(
        min_length=6,
        max_length=6,
        trim_whitespace=True,
        error_messages={
            "required": "Le code de vérification est obligatoire.",
            "min_length": "Le code doit contenir exactement 6 chiffres.",
            "max_length": "Le code doit contenir exactement 6 chiffres.",
        },
    )

    def validate_code(self, value: str) -> str:
        """
        Vérifie que le code est strictement numérique : tout caractère non
        numérique (lettre, symbole) est refusé, même s'il respecte la
        longueur attendue.
        """
        if not value.isdigit():
            raise serializers.ValidationError(
                "Le code doit contenir uniquement des chiffres."
            )
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """
        Vérifie l'existence d'un code valide associé à l'email concerné.

        Logique métier :
        - l'email est récupéré depuis le contexte (fourni par la vue) ;
        - le code est recherché en base joint à l'utilisateur correspondant,
          en excluant les codes déjà utilisés (``is_used``) et les codes
          expirés (``code_expiration`` postérieur à maintenant) ;
        - un message générique couvre tous les cas d'échec (code erroné,
          expiré, déjà utilisé ou email non concerné) afin de ne pas aider
          un attaquant à deviner les codes valides.
        """
        code = attrs.get("code")
        if code is None:
            # Le champ `code` a déjà échoué à sa validation de champ :
            # rien à ajouter.
            return attrs

        email = self.context.get("email")
        if not email:
            # Sans l'email fourni par la vue, aucune vérification sûre n'est
            # possible : le code ne peut pas être associé à un compte.
            raise serializers.ValidationError(
                "L'email de vérification est requis pour valider le code."
            )

        code_valide = (
            optCode.objects.filter(
                user__email__iexact=email,
                code=code,
                is_used=False,
                code_expiration__gt=timezone.now(),
            )
            .order_by("-date_created")
            .first()
        )

        if code_valide is None:
            raise serializers.ValidationError(
                "Code de vérification invalide ou expiré."
            )

        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Sérialiseur de demande de réinitialisation de mot de passe.

    Rôle : valider l'email saisi avant que la vue n'envoie (ou non) le lien
    de réinitialisation.

    Champ :
        - ``email`` : adresse email du compte concerné.

    Note de sécurité : la validation ne vérifie volontairement pas
    l'existence de l'email en base. Révéler si un compte existe exposerait
    la liste des emails inscrits (énumération de comptes). La vue doit
    renvoyer une réponse identique que le compte existe ou non.
    """

    email = serializers.EmailField(
        error_messages={
            "required": "L'email est obligatoire.",
            "invalid": "Veuillez fournir une adresse email valide.",
        },
    )

    def validate_email(self, value: str) -> str:
        """
        Normalise l'email (espaces, minuscules) uniquement.

        Aucune vérification d'existence en base n'est effectuée ici : c'est
        un choix de sécurité (anti-énumération de comptes).
        """
        return value.strip().lower()


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Sérialiseur de confirmation de réinitialisation de mot de passe.

    Rôle : valider le nouveau mot de passe et sa confirmation.

    Champs :
        - ``newPassword`` : nouveau mot de passe (écriture seule) ;
        - ``confirmPassword`` : confirmation du nouveau mot de passe
          (écriture seule, non persistée, strictement identique à
          ``newPassword``).

    Le code/token de réinitialisation est extrait de l'URL par la vue : il
    ne fait pas partie du payload sérialisé et n'est pas vérifié ici. La
    responsabilité de ce sérialiseur se limite à la validation du nouveau
    mot de passe ; la vue reste responsable de la vérification du token et
    de l'enregistrement effectif (``set_password``).
    """

    newPassword = serializers.CharField(
        write_only=True,
        error_messages={"required": "Le nouveau mot de passe est obligatoire."},
    )
    confirmPassword = serializers.CharField(
        write_only=True,
        error_messages={
            "required": "La confirmation du nouveau mot de passe est obligatoire."
        },
    )

    def validate_newPassword(self, value: str) -> str:
        """Vérifie la robustesse du nouveau mot de passe (politique du projet)."""
        _valider_robustesse_mot_de_passe(value)
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """
        Validation croisée : le nouveau mot de passe et sa confirmation
        doivent être strictement identiques. L'erreur est rattachée au champ
        ``confirmPassword``. Si l'un des deux champs a déjà échoué à sa
        validation de champ, la comparaison est ignorée.
        """
        password = attrs.get("newPassword")
        confirmation = attrs.get("confirmPassword")
        if (
            password is not None
            and confirmation is not None
            and password != confirmation
        ):
            raise serializers.ValidationError(
                {"confirmPassword": ["Les mots de passe ne correspondent pas."]}
            )
        return attrs
