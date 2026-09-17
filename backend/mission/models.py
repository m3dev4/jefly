from random import choices
from django.db import models


class OperateurMobileMoneyType(models.TextChoices):
    OM = ("OM", "Orange Money")
    WAVE = ("WAVE", "Wave")


class Mission(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    date_deadline = models.DateField(null=True, blank=True)
    operateurMobileMoney = models.CharField(max_length=50, choices=OperateurMobileMoneyType.choices)
    budget = models.IntegerField()
    service = models.ForeignKey("Service.Service", on_delete=models.CASCADE)
    annonceur = models.ForeignKey("announcer.Announcer", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.description} - {self.budget} - {self.service} - {self.annonceur}"
