from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils import timezone

from ..models.client_models import Client
from ..models.client_models import HelpRequest

class ClientModelSerializer(serializers.ModelSerializer):
    """Model serializer for the Client model"""

    class Meta:
        model = Client
        fields = ['id', 'name', 'phone', 'access_token']
        read_only_fields = ['access_token']

    def create(self, validated_data):
        """Method to create a new client"""

        # Validate phone number
        if not validated_data['phone']:
            raise ValidationError({'detail': 'Phone number is required.'})

        client = Client.objects.create_user(**validated_data)
        client.save()
        
        return client

class HelpRequestSerializer(serializers.ModelSerializer):
    """Model serializer for the HelpRequest model"""

    class Meta:
        model = HelpRequest
        fields = ['id', 'author', 'description', 'latitude', 'longitude', 'created', 'expiration']
        read_only_fields = ['author', 'created_at']

    def _default_expiration():
        return timezone.now() + timezone.timedelta(hours=3)   

    def create(self, validated_data):
        """Method to create a new help request"""

        client = validated_data['author']
        if not client:
            raise ValidationError({'detail': 'Author is required.'})
        if not Client.objects.filter(id=client.id).exists():
            raise ValidationError({'detail': 'Author does not exist.'})

        if not validated_data['expiration']:
            validated_data['expiration'] = self._default_expiration()
        if validated_data['expiration'] < timezone.now():
            raise ValidationError({'detail': 'Expiration date cannot be in the past.'})
        if validated_data['expiration'] < validated_data['created']:
            raise ValidationError({'detail': 'Expiration date cannot be before the creation date.'})

        help_request = HelpRequest.objects.create(**validated_data)
        help_request.save()

        return help_request