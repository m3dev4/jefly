from rest_framework.routers import DefaultRouter

from .views import AnnouncerViewSet

router = DefaultRouter()
router.register(r"announcer", AnnouncerViewSet, basename="announcer")

urlpatterns = router.urls
