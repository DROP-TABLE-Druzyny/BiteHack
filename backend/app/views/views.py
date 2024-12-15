# misc imports
import logging
from geopy.distance import great_circle

# django + rest framework imports
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes as pc, authentication_classes as ac
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# api documentation imports
from drf_spectacular.utils import extend_schema

# models and serializers
from django.contrib.auth import models as auth_models
from ..serializers.serializers import UserSerializer

from ..models.models import LocalEvent
from ..serializers.serializers import LocalEventSerializer

logger = logging.getLogger(__name__)

@extend_schema(tags=['User'])
class UserViewSet(
    mixins.ListModelMixin, 
    mixins.RetrieveModelMixin, 
    viewsets.GenericViewSet):
    """View for listing and creating users"""

    queryset = auth_models.User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

    @extend_schema(
        summary="Register a new user",
    )
    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[])
    def register(self, request):
        """Register a new user"""

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

    @extend_schema(
        summary="Login a user",
    )
    @action(detail=False, methods=['post'])
    @ac([IsAuthenticated])
    def logout(self, request):
        """Logout the current user"""

        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Get the current user's information based on the auth token",
    )
    @ac([IsAuthenticated])
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

    @extend_schema(
        summary="Get a user by ID",
    )
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

@extend_schema(tags=['LocalEvent'])
class LocalEventViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    #mixins.CreateModelMixin,
    viewsets.GenericViewSet):
    """View for listing and creating local events"""
    queryset = LocalEvent.objects.all()
    serializer_class = LocalEventSerializer
    lookup_field = 'id'
    authentication_classes = []

    def get_queryset(self):
        """Method to get the queryset for the LocalEvent model"""

        queryset = self.queryset


        # sort by distance if longitude and latitude are provided
        longitude = self.request.query_params.get('longitude', None)
        latitude = self.request.query_params.get('latitude', None)

        if longitude is not None and latitude is not None:
            if not (-90 <= float(latitude) <= 90) or not (-180 <= float(longitude) <= 180):
                return queryset
            user_location = (float(longitude), float(latitude))
            queryset = list(queryset)
            for event in queryset:
                event.distance = great_circle(user_location, (event.longitude, event.latitude)).meters

            queryset.sort(key=lambda event: event.distance)

        # TODO: filter by type if provided

        return queryset

    @extend_schema(
        summary="List all local events and sort them by distance if longitude and latitude are provided",
    )
    @ac([])
    def list(self, request):
        """Method to list all local events"""

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Add the extra field 'distance' to the response data if it exists
        for event, data_event in zip(queryset, data):
            if hasattr(event, 'distance'):
                data_event['distance'] = event.distance

        return Response(data)

    @extend_schema(
        summary="Get a local event by ID",
    )
    @ac([])
    def retrieve(self, request, id=None):
        """Method to get a local event by ID"""

        local_event = self.get_object()
        serializer = self.get_serializer(local_event)
        return Response(serializer.data)
