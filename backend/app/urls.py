from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from .views.views import UserViewSet
from .views.views import ProfileViewSet
from .views.views import LocalEventViewSet
from .views.client_views import ClientViewSet
from .views.client_views import HelpRequestViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='users')
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'event', LocalEventViewSet, basename='event')
router.register(r'client', ClientViewSet, basename='client')
router.register(r'help-request', HelpRequestViewSet, basename='help-request')

urlpatterns = [
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]