# misc imports
import uuid
from phone_field import PhoneField

# django imports
from django.contrib.auth import models as auth_models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class VolounteerAccountManager(BaseUserManager):
    def create_user(self, phone, password, name, **extra_fields):
        """Method to create a volounteer user"""

        if not phone:
            raise ValueError('Phone number is required')
        if not password:
            raise ValueError('Password is required')
        if not name:
            raise ValueError('Name is required')

        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.set_name('name-{}'.format(str(uuid.uuid4())))
        user.save(using=self._db)

        return user
    
    def create_superuser(self, phone, password=None, **extra_fields):
        """Method to create a superuser"""

        raise NotImplementedError('Superuser creation for volounteer model is disabled')

class Volounteer(AbstractBaseUser):
    """Model used to store volounteer information"""
    name = models.CharField(max_length=64, blank=True, null=False, default='Użytkownik')
    phone = PhoneField(blank=True, null=False, help_text='Numer telefonu w formacie +48 123 456 789', unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = VolounteerAccountManager()

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['phone', 'password', 'name']

    access_token = models.CharField(max_length=256, blank=True, null=False, unique=True)

    def __str__(self):
        """String representation of the Volounteer model"""

        return str(self.name)
    
    def generate_access_token(self):
        """Method to generate an access token"""