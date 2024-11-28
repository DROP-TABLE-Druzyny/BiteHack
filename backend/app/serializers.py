from rest_framework import serializers
from django.contrib.auth import models as auth_models
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from .models import Profile

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
