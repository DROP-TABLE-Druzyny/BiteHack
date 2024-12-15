# misc imports
import logging

# django + rest framework imports
from django.contrib.auth import models as auth_models
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes as pc, authentication_classes as ac
from rest_framework.permissions import IsAuthenticated

# api documentation imports
from drf_spectacular.utils import extend_schema

# models and serializers imports
from ..models.vlntr_models import Volounteer
from ..serializers.vlntr_serializers import VolounteerModelSerializer

from ..models.vlntr_models import ReferalCodes

logger = logging.getLogger(__name__)

@extend_schema(tags=['Volounteer'])
class VolounteerViewSet(
    mixins.CreateModelMixin, 
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet):
    """Volounteer viewset"""
    queryset = Volounteer.objects.all()
    serializer_class = VolounteerModelSerializer
    lookup_field = 'id'
    authentication_classes = []

    @extend_schema(summary='Create a new volounteer')
    def create(self, request, *args, **kwargs):
        """Method to create a new volounteer"""

        if not request.data.get('phone', None):
            return Response({'detail': 'Phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not request.data.get('name', None):
            return Response({'detail': 'Name is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not request.data.get('password', None):
            return Response({'detail': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not request.data.get('referal_code', None):
            return Response({'detail': 'Referal code is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            request.data['referal_code'] = ReferalCodes.objects.get(code=request.data['referal_code'])
        except ReferalCodes.DoesNotExist:
            return Response({'detail': 'Referal code does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        return super().create(request, *args, **kwargs)
    
    @extend_schema(summary='Retrieve a volounteer with a given id')
    def retrieve(self, request, *args, **kwargs):
        """Method to retrieve a volounteer"""

        if not request.data.get('id', None):
            return Response({'detail': 'ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            volounteer = Volounteer.objects.get(id=request.data['id'])
        except Volounteer.DoesNotExist:
            return Response({'detail': 'Volounteer does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = VolounteerModelSerializer(volounteer)
        return Response(serializer.data, status=status.HTTP_200_OK)