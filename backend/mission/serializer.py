from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Mission


class MissionSerializer(ModelSerializer):
    """Sérialise une mission créée et gérée par son annonceur."""

    class Meta:
        model = Mission
        fields = [
            "id",
            "title",
            "description",
            "date_deadline",
            "operateurMobileMoney",
            "budget",
            "service",
            "annonceur",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "annonceur", "created_at", "updated_at"]

    def validate_title(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Le titre est obligatoire.")
        return value

    def validate_description(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("La description est obligatoire.")
        return value

    def validate_budget(self, value):
        if value <= 0:
            raise serializers.ValidationError("Le budget doit être supérieur à zéro.")
        return value
