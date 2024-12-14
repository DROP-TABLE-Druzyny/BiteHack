from rest_framework import serializers
from django.core.exceptions import ValidationError

from ..models.client_models import Client

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