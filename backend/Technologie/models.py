from django.db import models


class Technologie(models.Model):
    """Technologie du catalogue global, créée et gérée par les administrateurs."""

    name = models.CharField(max_length=80, unique=True)
    imgUrl = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "technologie"
        verbose_name_plural = "technologies"

    def __str__(self) -> str:
        return self.name
