from rest_framework import serializers
from .models import Service


class ServiceSerialiser(serializers.ModelSerializer):
    """Expose une catégorie de service en lecture ou pour gestion admin."""

    class Meta:
        model = Service
        fields = ["id", "name", "description", "created_at", "updated_at"]
