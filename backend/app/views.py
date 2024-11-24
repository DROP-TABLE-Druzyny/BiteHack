import logging

# django + rest framework imports
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# models and serializers
from django.contrib.auth import models as auth_models
from .serializers import UserSerializer

from .models import Profile
from .serializers import ProfileSerializer

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    """View for listing and creating users"""

    queryset = auth_models.User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

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

    @action(detail=True, methods=['get'])
    def get_user(self, request, id=None):
        """Method to get the provided user's information"""

        user = self.get_object()
        serializer = self.get_serializer(user)

        return Response({
            'id': serializer.data['id'],
            'username': serializer.data['username'],
            'email': serializer.data['email'],
        })

class ProfileViewSet(viewsets.ModelViewSet):
    """View for retrieving and updating user profiles"""

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'

    def list(self, request):
        """Method to get the user's profile"""

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

    @action(detail=True, methods=['get'])
    def get_profile_by_id(self, request, id=None):
        """Method to get a user's profile by ID"""

        # Get the user's profile
        profile = self.get_object()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)
