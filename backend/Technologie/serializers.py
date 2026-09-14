from rest_framework import serializers

from .models import Technologie


class TechnologieSerializer(serializers.ModelSerializer):
    """Sérialise une technologie du catalogue global."""

    imgUrl = serializers.URLField(read_only=True)

    class Meta:
        model = Technologie
        fields = ["id", "name", "imgUrl", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_name(self, value: str) -> str:
        """Normalise le nom et refuse une valeur vide."""
        value = value.strip()
        if not value:
            raise serializers.ValidationError(
                "Le nom de la technologie est obligatoire."
            )
        return value
