# misc imports
import logging

# django + rest framework imports
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes as pc, authentication_classes as ac
from rest_framework.permissions import IsAuthenticated

# api documentation imports
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiRequest

# models and serializers
from ..models.client_models import Client
from ..serializers.client_serializers import ClientModelSerializer

from ..models.client_models import HelpRequest
from ..serializers.client_serializers import HelpRequestSerializer

logger = logging.getLogger(__name__)

def check_auth(request):
    """Check if the given token links to a valid client account"""

    try:
        token = request.headers['Authorization'].split()[1]
    except (KeyError, IndexError):
        return False

    client = Client.objects.filter(access_token=token).first()
    return client

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
        return '123456'
    
    def _check_random_code(self, code):
        # temporary code
        return code == '123456'
    
        #TODO: Check if the code is valid and if it's linked to the given phone number

    @extend_schema(
        summary='Send a random authorization code to the given phone number',
        responses={200: {'type': 'object', 'properties': {'code': {'type': 'string'}}}},
    )
    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[])
    def code(self, request):
        """Send a random authorization code to the given phone number"""

        client = check_auth(request)
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

    @extend_schema(
        summary='Retrieve the client information',
    )
    def list(self, request, *args, **kwargs):
        """Retrieve a client"""

        client = check_auth(request)
        if not client:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(
            ClientModelSerializer(client).data,
            status=status.HTTP_200_OK
        )
    
    @extend_schema(
        summary='Create a new client model',
    )
    def create(self, request):
        """Create a new client"""

        random_code = request.data.get('code', None)
        if not random_code:
            return Response(
                {'detail': 'Code is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # TODO: Check if the code is valid and if it's linked to the given phone number

        # Temporary code
        if not self._check_random_code(random_code):
            return Response(
                {'detail': 'Invalid code.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        phone_number = request.data.get('phone', None)
        if not phone_number:
            return Response(
                {'detail': 'Phone number is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if Client.objects.filter(phone=phone_number).exists():
            return Response(
                {'detail': 'Phone number is already in use.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ClientModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error("Validation error's occured when creating a new client: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        summary='Update the client information',
    )
    def update(self, request, *args, **kwargs):
        """Update the client's information"""

        client = check_auth(request)
        if not client:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        super().update(request, *args, **kwargs)

        return Response({'detail': 'Client information updated.'}, status=status.HTTP_200_OK)

    @extend_schema(
        responses={200: {'type': 'object', 'properties': {'access_token': {'type': 'string'}}}},
        summary='Login the client'
    )
    @action(detail=True, methods=['post'])
    def login(self, request, phone=None):
        """Login the client"""

        client = check_auth(request)
        if client:
            return Response(
                {'detail': 'Already authenticated.'},
                status=status.HTTP_403_FORBIDDEN
            )

        random_code = request.data.get('code', None)

        if not random_code:
            return Response(
                {'detail': 'Code is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not self._check_random_code(random_code):
            return Response(
                {'detail': 'Invalid code.'},
                status=status.HTTP_400_BAD_REQUEST
            ) 

        try:
            user = Client.objects.get(phone=phone)
            serializer = ClientModelSerializer(user)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        except Client.DoesNotExist:
            request.data['phone'] = phone
            return self.create(request)
    
    @extend_schema(
        summary='Check if the user is authenticated',
    )
    @action(detail=False, methods=['get'], authentication_classes=[], permission_classes=[])
    def authenticated(self, request):
        """Check if the user is authenticated"""

        client = check_auth(request)
        if client:
            return Response(
                {'detail': 'Authenticated.'},
                status=status.HTTP_200_OK
            )

        return Response(
            {'detail': 'Not authenticated.'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[])
    def pins(self, request, phone=None):
        """Update the client's custom_pins"""

        client = check_auth(request)
        if not client:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        client.custom_pins = request.data.get('custom_pins', [])
        client.save()

        return Response({'detail': 'Pins updated.'}, status=status.HTTP_200_OK)

@extend_schema(tags=['HelpRequest'])
class HelpRequestViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
    ):
    """View for creating / listing help requests"""

    queryset = HelpRequest.objects.all()
    serializer_class = HelpRequestSerializer
    lookup_field = 'id'
    authentication_classes = []

    def get_queryset(self):
        """Return the queryset for the view"""

        queryset = self.queryset

        completed = self.request.query_params.get('completed', False)
        queryset = queryset.filter(completed=completed)

        accepted_by = self.request.query_params.get('accepted_by', None)
        if accepted_by:
            queryset = queryset.filter(accepted_by=accepted_by)

        accepted = self.request.query_params.get('accepted', False)
        if accepted:
            queryset = queryset.filter(accepted_by__isnull=False)

        author_token = self.request.query_params.get('author', None)
        if author_token:
            author = Client.objects.filter(access_token=author_token).first()
            if author:
                queryset = queryset.filter(author=author)

        return queryset

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='completed',
                type=bool,
                location=OpenApiParameter.QUERY,
                required=False,
                description='Filter by completion status',
                default=False
            ),
            OpenApiParameter(
                name='accepted',
                type=bool,
                location=OpenApiParameter.QUERY,
                required=False,
                description='Filter by accepted status',
                default=False
            ),
            OpenApiParameter(
                name='accepted_by',
                type=int,
                location=OpenApiParameter.QUERY,
                required=False,
                description='Filter by the user who accepted the request',
                default=None
            ),
        ],
        summary='List all help requests',
    )
    def list(self, request):
        """List all help requests"""

        queryset = self.get_queryset()
        queryset.filter(completed=False)
        queryset.order_by('created')

        helprequests = queryset

        return Response(
            HelpRequestSerializer(helprequests, many=True).data,
            status=status.HTTP_200_OK
        )

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='id',
                type=int,
                location=OpenApiParameter.QUERY,
                required=True,
                description='The ID of the help request',
            ),
        ],
        summary='Retrieve a help request',
    )
    def retrieve(self, request, *args, **kwargs):
        """Retrieve a help request"""

        if not request.data.get('id', None):
            return Response(
                {'detail': 'ID is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            helprequest = self.get_object()
        except HelpRequest.DoesNotExist:
            return Response(
                {'detail': 'Help request does not exist.'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = HelpRequestSerializer(helprequest)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    
    @extend_schema(
        summary='Create a new help request'
    )
    def create(self, request):
        """Create a new help request"""

        client = check_auth(request)
        if not client:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = request.data.copy()
        data['author'] = client.id
        serializer = HelpRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error("Validation error's occured when creating a new help request: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary='Update a help request'
    )
    def update(self, request, *args, **kwargs):
        """Update the help request"""

        client = check_auth(request)
        if not client:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        helprequest = self.get_object()
        if helprequest.author != client:
            return Response(
                {'detail': 'You are not the author of this request.'},
                status=status.HTTP_403_FORBIDDEN
            )

        helprequest.update(request.data, partial=True)
        return Response({'detail': 'Help request updated.'}, status=status.HTTP_200_OK)

    @extend_schema(
        summary='Accept the help request'
    )
    @action(detail=True, methods=['post'])
    def complete(self, request, id=None):
        """Complete the help request"""

        client = check_auth(request)
        if not client:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        helprequest = self.get_object()
        if helprequest.author != client:
            return Response(
                {'detail': 'You are not the author of this request.'},
                status=status.HTTP_403_FORBIDDEN
            )

        helprequest.completed = True
        helprequest.save()

        return Response({'detail': 'Help request completed.'}, status=status.HTTP_200_OK)