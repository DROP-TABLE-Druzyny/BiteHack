# misc imports
import uuid
from phone_field import PhoneField
# django imports
from django.contrib.auth import models as auth_models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class ClientAccountManager(BaseUserManager):
    def create_user(self, phone, password=None, **extra_fields):
        """Method to create a client user"""

        if not phone:
            raise ValueError('Phone number is required')

        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, phone, password=None, **extra_fields):
        """Method to create a superuser"""

        raise NotImplementedError('Superuser creation for client model is disabled')
    
class Client(AbstractBaseUser):
    """Model used to store client information"""
    name = models.CharField(max_length=64, blank=True, null=False, default='Użytkownik')
    phone = PhoneField(blank=True, null=False, help_text='Numer telefonu w formacie +48 123 456 789', unique=True)
    # TODO: Pozniej dodac jak zrobicie front
    custom_pins = models.JSONField(blank=True, null=False, default=dict)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = ClientAccountManager()

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['phone']

    access_token = models.CharField(max_length=256, blank=True, null=False, unique=True)

    def __str__(self):
        """String representation of the Client model"""

        return str(self.name)
    
    def generate_access_token(self):
        """Method to generate an access token"""

        # TODO: Encrypt the token before sending it to the user
        return str(uuid.uuid4())

    def save(self, *args, **kwargs):
        """Method to save the Client model"""

        if not self.access_token:
            self.access_token = self.generate_access_token()

        super(Client, self).save(*args, **kwargs)

class HelpRequest(models.Model): 
    TYPE_CHOICES = [
        ("SHOPPING", "Zakupy"),
        ("MEDICAL", "Pomoc medyczna"),
        ("TRANSPORT", "Transport"),
        ("CARE", "Opieka"),
        ("WALK", "Spacer"),
        ("OTHER", "Inne")
    ]

    author = models.ForeignKey(Client, on_delete=models.CASCADE)
    description = models.TextField(blank=True, default="Brak dodatkowych informacji o prośbie o pomoc.")
    created = models.DateTimeField(auto_now=True)
    expiration = models.DateTimeField(blank=False, null=False)
    latitude = models.FloatField(blank=False, null=False)
    longitude = models.FloatField(blank=False, null=False)
    type = models.CharField(max_length=64, choices=TYPE_CHOICES, default="OTHER", blank=False)
    accepted_by = models.ForeignKey(auth_models.User, on_delete=models.CASCADE, blank=True, null=True, related_name='accepted_by')
    completed = models.BooleanField(default=False)