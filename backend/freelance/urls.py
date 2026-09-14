from rest_framework.routers import DefaultRouter

from .views import (
    EducationViewSet,
    ExperienceViewSet,
    FreelanceViewSet,
    RealisationViewSet,
)

router = DefaultRouter()
router.register(r"freelance", FreelanceViewSet, basename="freelance")
router.register(r"experiences", ExperienceViewSet, basename="freelance-experience")
router.register(r"educations", EducationViewSet, basename="freelance-education")
router.register(r"realisations", RealisationViewSet, basename="freelance-realisation")

urlpatterns = router.urls
