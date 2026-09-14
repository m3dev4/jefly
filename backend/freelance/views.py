from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Education, Experience, Freelancee, Realisation
from .serializers import (
    EducationSerializer,
    ExperienceSerializer,
    FreelanceeSerializer,
    RealisationSerializer,
)


class FreelanceOwnershipMixin:
    """Restreint les ressources au profil freelance connecté."""

    def get_freelance(self) -> Freelancee:
        return get_object_or_404(Freelancee, user=self.request.user)


class FreelanceViewSet(viewsets.GenericViewSet):
    """Création unique et gestion du profil freelance de l'utilisateur connecté."""

    permission_classes = [IsAuthenticated]
    serializer_class = FreelanceeSerializer

    @action(detail=False, methods=["get", "post", "patch"], url_path="me")
    def me(self, request):
        """Lit, crée une seule fois ou modifie le profil freelance connecté."""
        profile = Freelancee.objects.filter(user=request.user).first()

        if request.method == "GET":
            if profile is None:
                return Response(
                    {"detail": "Profil freelance introuvable."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            return Response(self.get_serializer(profile).data)

        if request.method == "POST":
            if profile is not None:
                return Response(
                    {"detail": "Vous possédez déjà un profil freelance."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            profile = serializer.save()
            return Response(
                self.get_serializer(profile).data,
                status=status.HTTP_201_CREATED,
            )

        if profile is None:
            return Response(
                {"detail": "Profil freelance introuvable."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class OwnedResourceViewSet(FreelanceOwnershipMixin, viewsets.ModelViewSet):
    """CRUD d'une ressource appartenant au seul freelance connecté."""

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.model.objects.filter(freelance=self.get_freelance())

    def perform_create(self, serializer):
        serializer.save(freelance=self.get_freelance())


class ExperienceViewSet(OwnedResourceViewSet):
    model = Experience
    serializer_class = ExperienceSerializer


class EducationViewSet(OwnedResourceViewSet):
    model = Education
    serializer_class = EducationSerializer


class RealisationViewSet(OwnedResourceViewSet):
    model = Realisation
    serializer_class = RealisationSerializer


# Create your views here.
