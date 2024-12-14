# misc imports
import logging
import random
import string

# django + rest framework imports
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes as pc, authentication_classes as ac
from rest_framework.permissions import IsAuthenticated

# api documentation imports
from drf_spectacular.utils import extend_schema

# models and serializers
from ..models.client_models import Client
from ..serializers.client_serializers import ClientModelSerializer

logger = logging.getLogger(__name__)

@extend_schema(tags=['Client'])
class ClientViewSet(
    viewsets.GenericViewSet
    ):
    """View for listing and creating clients"""

    queryset = Client.objects.all()
    serializer_class = ClientModelSerializer
    lookup_field = 'phone'
    authentication_classes = []

    def _generate_random_code(length=6):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

    def _check_auth(self, request):
        """Check if the given token links to a valid client account"""

        try:
            token = request.headers['Authorization'].split()[1]
        except (KeyError, IndexError):
            return False

        client = Client.objects.filter(access_token=token).first()
        return client

    @extend_schema(
        responses={200: {'type': 'object', 'properties': {'code': {'type': 'string'}}}},
    )
    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[])
    def new(self, request):
        """Begin the registration process for a new client"""

        client = self._check_auth(request)
        if client:
            return Response(
                {'detail': 'Already authenticated.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        phone_number = request.data.get('phone', None)
        if not phone_number:
            return Response(
                {'detail': 'Phone number is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        random_code = self._generate_random_code()
        # TODO: Create a new session and send the code + phone number to the temporal database
        # TODO: Send the code through sms

        # Temporary code
        random_code = '123456'
        return Response(
            {'code': random_code},
            status=status.HTTP_200_OK
        )

    def create(self, request):
        """Create a new client"""

        random_code = request.data.get('code', None)
        if not random_code:
            return Response(
                {'detail': 'Code is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        phone_number = request.data.get('phone', None)
        if not phone_number:
            return Response(
                {'detail': 'Phone number is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ClientModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error("Validation error's occured when creating a new client: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        """Update the client's information"""

        client = self._check_auth(request)
        if not client:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return super().update(request, *args, **kwargs)