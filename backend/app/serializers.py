import logging
from rest_framework import serializers
from django.contrib.auth import models as auth_models
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from .models import Profile
from .models import LocalEvent

logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
    """Model serializer for User model"""
    email = serializers.EmailField(max_length=256)
    username = serializers.CharField(min_length=3, max_length=30)
    password = serializers.CharField(min_length=3, max_length=256, write_only=True)

    class Meta:
        model = auth_models.User
        fields = ['id', 'email', 'username', 'password']

    def create(self, validated_data):
        """Method to create a new user"""

        # Validate email
        try:
            validate_email(validated_data['email'])
        except ValidationError as exc:
            raise serializers.ValidationError({'detail': 'Invalid email address.'}) from exc

        user = auth_models.User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user

class ProfileSerializer(serializers.ModelSerializer):
    """Model serializer for Profile model"""

    username = serializers.CharField(source='user.username', read_only=True)
    avatar = serializers.ImageField(allow_null=True, required=False)
    bio = serializers.CharField(max_length=500, allow_blank=True, required=False)
    joined = serializers.DateTimeField(read_only=True, required=False)

    class Meta:
        model = Profile
        fields = ['id', 'username', 'avatar', 'bio', 'joined']
        read_only_fields = ['id', 'username', 'joined']

class LocalEventSerializer(serializers.ModelSerializer):
    """Model serializer for LocalEvent model"""

    name = serializers.CharField(max_length=100)
    description = serializers.CharField(required=True)
    data_start = serializers.DateTimeField()
    data_end = serializers.DateTimeField(required=True)
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

    class Meta:
        model = LocalEvent
        fields = '__all__'

    def create(self, validated_data):
        """Method to create a new LocalEvent"""

        # Validate data start and data end
        if validated_data.get('data_start') > validated_data.get('data_end'):
            raise serializers.ValidationError({'detail': 'Data start must be before data end.'})

        # Validate latitude and longitude
        if not (-90 <= validated_data.get('latitude') <= 90):
            raise serializers.ValidationError({'detail': 'Invalid latitude. Must be between -90 and 90.'})
        if not (-180 <= validated_data.get('longitude') <= 180):
            raise serializers.ValidationError({'detail': 'Invalid longitude. Must be between -180 and 180.'})
        
        # Validate event type
        if validated_data.get('type') not in dict(LocalEvent.TYPE_CHOICES).keys():
            raise serializers.ValidationError({'detail': f'Invalid event type - {validated_data.get("type")}. Must be one of: ' + ', '.join(dict(LocalEvent.TYPE_CHOICES).keys())})
        
        local_event = LocalEvent.objects.create(**validated_data)
        local_event.save()

        return local_event