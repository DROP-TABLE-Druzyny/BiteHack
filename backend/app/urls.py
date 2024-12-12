from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from .views import UserViewSet
from .views import ProfileViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='users')
router.register(r'profile', ProfileViewSet, basename='profile')


urlpatterns = [
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]