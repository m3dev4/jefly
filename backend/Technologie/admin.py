from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError

from User.utils import (
    CloudinaryError,
    InvalidImageError,
    upload_image,
    validate_image_file,
)

from .models import Technologie


class TechnologieAdminForm(forms.ModelForm):
    """Formulaire admin : l'image est uploadée, l'URL est générée par Cloudinary."""

    uploaded_image_url = None

    image = forms.ImageField(
        label="Image",
        required=False,
        help_text="JPEG, PNG ou WebP, 5 Mo maximum.",
    )

    class Meta:
        model = Technologie
        fields = ["name", "image"]

    def clean_image(self):
        image = self.cleaned_data.get("image")
        if image is not None:
            try:
                validate_image_file(image)
                self.uploaded_image_url = upload_image(
                    image,
                    folder="jefly/technologies",
                    public_id_prefix="technology",
                )
            except InvalidImageError as exc:
                raise ValidationError(str(exc)) from exc
            except CloudinaryError as exc:
                raise ValidationError(
                    f"Impossible d'envoyer l'image vers Cloudinary : {exc}"
                ) from exc
        elif not self.instance.pk:
            raise ValidationError(
                "L'image est obligatoire pour une nouvelle technologie."
            )
        return image


@admin.register(Technologie)
class TechnologieAdmin(admin.ModelAdmin):
    form = TechnologieAdminForm
    list_display = ["name", "imgUrl", "created_at", "updated_at"]
    readonly_fields = ["imgUrl", "created_at", "updated_at"]

    def save_model(self, request, obj, form, change):
        if form.uploaded_image_url:
            obj.imgUrl = form.uploaded_image_url
        super().save_model(request, obj, form, change)
