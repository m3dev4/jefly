"""
Utilitaires pour la gestion des images de profil via Cloudinary.

Ce module isole toute la logique d'upload, de validation et de suppression
d'images vers Cloudinary, afin de garder les vues propres et testables.

Configuration Cloudinary :
- Initialisée via les variables d'environnement :
  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
"""

import os
import logging
from typing import Optional

import cloudinary
import cloudinary.uploader
import cloudinary.api
from django.conf import settings

# Configuration Cloudinary au chargement du module
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME")
    or getattr(settings, "CLOUDINARY_CLOUD_NAME", None),
    api_key=os.getenv("CLOUDINARY_API_KEY")
    or getattr(settings, "CLOUDINARY_API_KEY", None),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
    or getattr(settings, "CLOUDINARY_API_SECRET", None),
    secure=True,
)

logger = logging.getLogger(__name__)

# Constantes de validation
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 Mo


class CloudinaryError(Exception):
    """Exception personnalisée pour les erreurs Cloudinary."""

    pass


class InvalidImageError(CloudinaryError):
    """Exception levée quand un fichier image est invalide."""

    pass


def validate_image_file(image_file) -> None:
    """
    Valide un fichier image avant upload.

    Vérifications :
    - Type MIME autorisé (JPEG, PNG, WebP)
    - Taille maximale (5 Mo par défaut)

    Args:
        image_file: Fichier uploadé (InMemoryUploadedFile ou similaire)

    Raises:
        InvalidImageError: Si le fichier ne passe pas les validations
    """
    # Vérifier le type MIME
    content_type = getattr(image_file, "content_type", None)
    if content_type not in ALLOWED_MIME_TYPES:
        raise InvalidImageError(
            f"Type de fichier non autorisé : {content_type}. "
            f"Types acceptés : {', '.join(ALLOWED_MIME_TYPES)}"
        )

    # Vérifier la taille
    file_size = getattr(image_file, "size", None)
    if file_size is not None and file_size > MAX_FILE_SIZE:
        raise InvalidImageError(
            f"Fichier trop volumineux : {file_size} octets. "
            f"Taille maximale : {MAX_FILE_SIZE} octets (5 Mo)."
        )

    # Vérifier que le fichier n'est pas vide
    if file_size == 0:
        raise InvalidImageError("Le fichier image est vide.")


def upload_profile_image(image_file, user_id: int) -> str:
    """
    Upload une image de profil vers Cloudinary.

    Args:
        image_file: Fichier image validé (InMemoryUploadedFile ou similaire)
        user_id: ID de l'utilisateur pour générer un public_id unique

    Returns:
        str: URL sécurisée (HTTPS) de l'image uploadée

    Raises:
        CloudinaryError: Si l'upload échoue
    """
    import time

    # Générer un public_id unique : profile_<user_id>_<timestamp>
    public_id = f"profile_{user_id}_{int(time.time())}"

    try:
        # Upload vers Cloudinary
        result = cloudinary.uploader.upload(
            image_file,
            public_id=public_id,
            folder="jefly/profiles",
            resource_type="image",
            overwrite=False,
            transformation=[
                {"width": 400, "height": 400, "crop": "fill", "gravity": "face"},
                {"quality": "auto:good"},
                {"fetch_format": "auto"},
            ],
        )

        secure_url = result.get("secure_url")
        if not secure_url:
            raise CloudinaryError("Cloudinary n'a pas retourné d'URL sécurisée.")

        logger.info(
            "Image de profil uploadée pour user_id=%s : %s", user_id, secure_url
        )
        return secure_url

    except cloudinary.exceptions.Error as e:
        logger.exception("Erreur Cloudinary lors de l'upload pour user_id=%s", user_id)
        raise CloudinaryError(f"Échec de l'upload vers Cloudinary : {str(e)}") from e
    except Exception as e:
        logger.exception("Erreur inattendue lors de l'upload pour user_id=%s", user_id)
        raise CloudinaryError(f"Erreur interne lors de l'upload : {str(e)}") from e


def delete_profile_image(public_id: str) -> bool:
    """
    Supprime une image de profil sur Cloudinary.

    Args:
        public_id: Identifiant public de l'image sur Cloudinary

    Returns:
        bool: True si suppression réussie ou image déjà absente, False en cas d'erreur

    Note:
        Ne lève pas d'exception en cas d'échec pour ne pas bloquer la vue.
        Les erreurs sont loggées.
    """
    if not public_id:
        logger.warning("Tentative de suppression avec public_id vide")
        return True

    try:
        result = cloudinary.uploader.destroy(public_id, resource_type="image")
        # Cloudinary retourne {"result": "ok"} ou {"result": "not found"}
        success = result.get("result") in ("ok", "not found")
        if success:
            logger.info("Image Cloudinary supprimée : %s", public_id)
        else:
            logger.warning("Résultat inattendu suppression Cloudinary : %s", result)
        return success

    except cloudinary.exceptions.Error as e:
        logger.exception("Erreur Cloudinary lors de la suppression de %s", public_id)
        return False
    except Exception as e:
        logger.exception("Erreur inattendue lors de la suppression de %s", public_id)
        return False


def extract_public_id_from_url(url: str) -> Optional[str]:
    """
    Extrait le public_id Cloudinary depuis une URL sécurisée.

    Exemple d'URL : https://res.cloudinary.com/cloud_name/image/upload/v123456/jefly/profiles/profile_1_1234567890.jpg
    public_id extrait : jefly/profiles/profile_1_1234567890

    Args:
        url: URL sécurisée Cloudinary

    Returns:
        str ou None: public_id sans extension, ou None si extraction impossible
    """
    if not url:
        return None

    try:
        # Format typique : .../upload/v<version>/<public_id>.<ext>
        # ou : .../upload/<public_id>.<ext>
        parts = url.split("/upload/")
        if len(parts) != 2:
            return None

        path_after_upload = parts[1]
        # Retirer la version si présente (v123456/)
        if path_after_upload.startswith("v") and "/" in path_after_upload:
            path_after_upload = path_after_upload.split("/", 1)[1]

        # Retirer l'extension
        public_id = path_after_upload.rsplit(".", 1)[0]
        return public_id

    except Exception:
        logger.exception("Impossible d'extraire public_id depuis l'URL : %s", url)
        return None
