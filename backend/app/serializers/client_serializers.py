from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils import timezone

from ..models.client_models import Client
from ..models.client_models import HelpRequest

class ClientModelSerializer(serializers.ModelSerializer):
    """Model serializer for the Client model"""

    class Meta:
        model = Client
        fields = ['id', 'name', 'phone', 'access_token', 'pins']
        read_only_fields = ['access_token']

    def create(self, validated_data):
        """Method to create a new client"""

        # Validate phone number
        if not validated_data['phone']:
            raise ValidationError({'detail': 'Phone number is required.'})

        client = Client.objects.create_user(**validated_data)
        client.save()
        
        return client

    def update(self, instance, validated_data):
        """Method to create a new client"""

        # Validate phone number
        if not validated_data['pins']:
            raise ValidationError({'detail': 'New pin list is required.'})

        instance['pins'] = validated_data['pins']
        instance.save()
        
        return instance

class HelpRequestSerializer(serializers.ModelSerializer):
    """Model serializer for the HelpRequest model"""

    class Meta:
        model = HelpRequest
        fields = ['id', 'author', 'description', 'latitude', 'longitude', 'created', 'expiration', 'type']
        read_only_fields = ['created_at']

    def _default_expiration():
        return timezone.now() + timezone.timedelta(hours=3)   

    def create(self, validated_data):
        """Method to create a new help request"""
        validated_data['created'] = timezone.now()

        author = validated_data.get('author', None)
        if not author:
            raise ValidationError({'detail': 'Author is required.'})
        if not Client.objects.filter(id=author.id).exists():
            raise ValidationError({'detail': 'Author does not exist.'})
        validated_data['author'] = Client.objects.get(id=author.id)

        if not validated_data['expiration']:
            validated_data['expiration'] = self._default_expiration()
        if validated_data['expiration'] < timezone.now():
            raise ValidationError({'detail': 'Expiration date cannot be in the past.'})
        if validated_data['expiration'] < validated_data['created']:
            raise ValidationError({'detail': 'Expiration date cannot be before the creation date.'})

        help_request = HelpRequest.objects.create(**validated_data)
        help_request.save()

        return help_request
    
    def update(self, instance, validated_data):
        """Method to update a help request"""

        if 'author' in validated_data:
            raise ValidationError({'detail': 'Author cannot be changed.'})
        if 'created' in validated_data:
            raise ValidationError({'detail': 'Creation date cannot be changed.'})
        if 'expiration' in validated_data:
            if validated_data['expiration'] < timezone.now():
                raise ValidationError({'detail': 'Expiration date cannot be in the past.'})
            if validated_data['expiration'] < instance.created:
                raise ValidationError({'detail': 'Expiration date cannot be before the creation date.'})

        if 'type' in validated_data:
            if validated_data['type'] not in HelpRequest.TYPE_CHOICES:
                raise ValidationError({'detail': 'Invalid type.'})
        
        instance.author = validated_data.get('author', instance.author)
        instance.type = validated_data.get('type', instance.type)
        instance.description = validated_data.get('description', instance.description)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.expiration = validated_data.get('expiration', instance.expiration)
        instance.save()

        return instance