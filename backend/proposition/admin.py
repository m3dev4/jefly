from django.contrib import admin
from .models import Proposition

class PropositionAdmin(admin.ModelAdmin):
    list_display = ("freelance", "mission", "proposition_status", "created_at")
    list_filter = ("proposition_status", "created_at")
    search_fields = ("freelance", "mission", "proposition_status", "created_at")
    ordering = ("-created_at",)


admin.site.register(Proposition, PropositionAdmin)
    