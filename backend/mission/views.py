from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission, IsAuthenticated

from User.models import UserRole
from announcer.models import Announcer

from .models import Mission
from .serializer import MissionSerializer


class IsAnnonceur(BasePermission):
    """Réserve les mutations de missions aux annonceurs."""

    message = "Seul un annonceur peut gérer une mission."

    def has_permission(self, request, view):
        return request.user.role == UserRole.ANNONCEUR


class MissionViewSet(viewsets.ModelViewSet):
    """Permet à un annonceur de gérer uniquement ses propres missions."""

    serializer_class = MissionSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsAnnonceur()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = Mission.objects.select_related("service", "annonceur")
        if self.request.user.role == UserRole.FREELANCE:
            return queryset
        if self.request.user.role != UserRole.ANNONCEUR:
            return Mission.objects.none()
        return queryset.filter(annonceur__user=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.role != UserRole.ANNONCEUR:
            raise PermissionDenied(
                "Seul un utilisateur ayant le rôle annonceur peut créer une mission."
            )
        annonceur = Announcer.objects.filter(user=self.request.user).first()
        if annonceur is None:
            raise PermissionDenied(
                "Vous devez créer votre profil annonceur auparavant."
            )
        serializer.save(annonceur=annonceur)
