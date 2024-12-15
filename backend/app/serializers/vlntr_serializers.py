from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils import timezone

from ..models.vlntr_models import Volounteer
from ..models.vlntr_models import ReferalCodes

class ReferalCodesSerializer(serializers.ModelSerializer):
    """Model serializer for the ReferalCodes model"""

    class Meta:
        model = ReferalCodes
        fields = ['id','name', 'code', 'details']
    
    def create(self, validated_data):
        """Method to create a new referal code"""

        if not validated_data['name']:
            raise ValidationError({'detail': 'Name is required.'})
        
        referal_code = ReferalCodes.objects.create(**validated_data)
        referal_code.save()
        
        return referal_code

class VolounteerModelSerializer(serializers.ModelSerializer):
    """Model serializer for the Volounteer model"""

    class Meta:
        model = Volounteer
        fields = ['id', 'name', 'phone']
    
    def create(self, validated_data):
        """Method to create a new client"""

        if not validated_data['phone']:
            raise ValidationError({'detail': 'Phone number is required.'})

        volounteer = Volounteer.objects.create_user(**validated_data)
        volounteer.save()
        
        return volounteer