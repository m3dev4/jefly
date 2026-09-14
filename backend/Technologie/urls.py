from rest_framework.routers import DefaultRouter

from .views import TechnologieViewSet

router = DefaultRouter()
router.register(r"technologies", TechnologieViewSet, basename="technologie")

urlpatterns = router.urls
