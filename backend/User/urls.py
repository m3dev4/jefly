from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, ProfileViewSet, UserProfileView

router = DefaultRouter()

router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"profile", ProfileViewSet, basename="profile")

urlpatterns = router.urls + [
    path("profile/photo/", UserProfileView.as_view(), name="profile-photo"),
]
