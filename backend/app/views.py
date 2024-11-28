import logging

# django + rest framework imports
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

# api documentation imports
from drf_spectacular.utils import extend_schema

# models and serializers
from django.contrib.auth import models as auth_models
from .serializers import UserSerializer

from .models import Profile
from .serializers import ProfileSerializer

logger = logging.getLogger(__name__)

@extend_schema(tags=['User'])
class UserViewSet(
    mixins.CreateModelMixin, 
    mixins.ListModelMixin, 
    mixins.RetrieveModelMixin, 
    viewsets.GenericViewSet):
    """View for listing and creating users"""

    queryset = auth_models.User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    authentication_classes = []

    def create(self, request):
        """Method to create a new user"""

        # Authenticated users cannot register
        if request.user.is_authenticated:
            return Response(
                {'detail': 'You are already authenticated.'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error("Validation error's occured when creating a new user: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def list(self, request):
        """Method to get the current user's information"""
        
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = request.user
        serializer = self.get_serializer(user)

        return Response({
            'id': serializer.data['id'],
            'username': serializer.data['username'],
            'email': serializer.data['email'],
        })

    def retrieve(self, request, id=None):
        """Method to get a user by ID"""
        
        user = self.get_object()
        serializer = self.get_serializer(user)

        if not serializer.data:
            return Response(
                {'detail': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(serializer.data)

@extend_schema(tags=['Profile'])
class ProfileViewSet(mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet):
    """View for retrieving and updating user profiles"""

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'
    authentication_classes = []

    @permission_classes([IsAuthenticated])
    def list(self, request):
        """Method to get the currently authenticated user's profile"""

        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Get the user's profile
        profile = self.get_queryset().get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def retrieve(self, request, id=None):
        """Method to get a user's profile by ID"""

        # Get the user's profile
        profile = self.get_object()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    def update(self, request, id=None):
        """Method to update a user's profile"""

        # Get the user's profile
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
