from django.contrib import admin
from .models import Mission


class MissionAdmin(admin.ModelAdmin):
    list_display = ["title", "description", "date_deadline", "operateurMobileMoney", "budget", "service", "annonceur"]
    list_filter = ["date_deadline", "operateurMobileMoney", "service", "annonceur"]
    search_fields = ["title", "description", "budget", "service", "annonceur"]
    ordering = ["date_deadline", "budget", "service", "annonceur"]
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related("service", "annonceur")


admin.site.register(Mission, MissionAdmin)