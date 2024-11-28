from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet
from .views import ProfileViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='users')
router.register(r'profile', ProfileViewSet, basename='profile')


urlpatterns = [
    path('', include(router.urls)),
]