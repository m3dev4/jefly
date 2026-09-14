from django.db import models


class TypeAnnouncer(models.TextChoices):
    ENTREPRISE = "Entreprise"
    PARTICULIER = "Particulier"


class Announcer(models.Model):
    user = models.OneToOneField(
        "User.User", on_delete=models.CASCADE, related_name="announcer"
    )
    typeAnnonceur = models.CharField(max_length=100, choices=TypeAnnouncer.choices)
    company_name = models.CharField(max_length=100)
    company_address = models.CharField(max_length=100)
    company_phone = models.CharField(max_length=15)
    company_website = models.URLField(max_length=200, blank=True)
    company_secteur = models.CharField(max_length=100)
    description = models.TextField(max_length=5000)
    company_size = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.company_name} ({self.typeAnnonceur})"

