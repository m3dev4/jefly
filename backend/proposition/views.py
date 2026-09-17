from django.db import IntegrityError
from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission, IsAuthenticated

from User.models import UserRole
from freelance.models import Freelancee

from mission.models import MissionStatus
from .models import Proposition, PropositionStatus
from .serializer import PropositionSerializer


class IsFreelance(BasePermission):
    """Réserve la création d'une proposition au profil freelance."""

    message = "Seul un freelance peut proposer sur une mission."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == UserRole.FREELANCE


class PropositionViewSet(viewsets.ModelViewSet):
    """Permet à un freelance de proposer sur une mission, avec validation métier."""

    serializer_class = PropositionSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated(), IsFreelance()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = Proposition.objects.select_related(
            "freelance", "mission", "freelance__user", "mission__annonceur__user"
        )
        if self.request.user.role == UserRole.FREELANCE:
            queryset = queryset.filter(freelance__user=self.request.user)
            mission_id = self.request.query_params.get("mission")
            if mission_id:
                queryset = queryset.filter(mission_id=mission_id)
            return queryset
        if self.request.user.role == UserRole.ANNONCEUR:
            return queryset.filter(mission__annonceur__user=self.request.user)
        return Proposition.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role != UserRole.FREELANCE:
            raise PermissionDenied(
                "Seul un freelance peut créer une proposition pour une mission."
            )

        freelance = Freelancee.objects.filter(user=self.request.user).first()
        if freelance is None:
            raise PermissionDenied(
                "Vous devez créer votre profil freelance avant de pouvoir postuler."
            )

        try:
            serializer.save(freelance=freelance)
        except IntegrityError:
            raise PermissionDenied(
                "Vous avez déjà déposé une proposition pour cette mission."
            )

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.proposition_status == PropositionStatus.ACCEPTED:
            mission = instance.mission
            mission.status = MissionStatus.IN_PROGRESS
            mission.save()


import time
import jwt
from decouple import config
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ProjectMeeting
from .serializer import ProjectMeetingSerializer


def generate_livekit_token(room_name: str, identity: str, name: str = ""):
    api_key = config("LIVEKIT_API_KEY", default="")
    api_secret = config("LIVEKIT_API_SECRET", default="")
    livekit_url = config("LIVEKIT_URL", default="wss://jokko-r5p3aqzp.livekit.cloud")

    if not api_key or not api_secret:
        return None, livekit_url

    now = int(time.time())
    payload = {
        "iss": api_key,
        "sub": identity,
        "nbf": now - 5,
        "exp": now + (24 * 3600),
        "identity": identity,
        "name": name,
        "video": {
            "roomJoin": True,
            "room": room_name,
            "canPublish": True,
            "canSubscribe": True,
            "canPublishData": True,
        },
    }

    token = jwt.encode(payload, api_secret, algorithm="HS256")
    return token, livekit_url


class ProjectMeetingViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectMeetingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = ProjectMeeting.objects.select_related("mission", "created_by")

        mission_id = self.request.query_params.get("mission")
        if mission_id:
            queryset = queryset.filter(mission_id=mission_id)

        if user.role == UserRole.FREELANCE:
            return queryset.filter(
                mission__propositions__freelance__user=user,
                mission__propositions__proposition_status=PropositionStatus.ACCEPTED,
            ).distinct()
        elif user.role == UserRole.ANNONCEUR:
            return queryset.filter(mission__annonceur__user=user).distinct()

        return queryset

    @action(detail=True, methods=["get"])
    def token(self, request, pk=None):
        meeting = self.get_object()
        user = request.user
        identity = str(user.id)
        name = f"{user.first_name} {user.last_name}".strip() or user.username

        token, url = generate_livekit_token(
            meeting.room_name, identity=identity, name=name
        )
        return Response(
            {
                "token": token,
                "url": url,
                "room_name": meeting.room_name,
                "title": meeting.title,
            }
        )



