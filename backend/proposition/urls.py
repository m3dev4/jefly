from rest_framework.routers import DefaultRouter

from .views import PropositionViewSet, ProjectMeetingViewSet

router = DefaultRouter()
router.register(r"propositions", PropositionViewSet, basename="proposition")
router.register(r"meetings", ProjectMeetingViewSet, basename="meeting")

urlpatterns = router.urls
