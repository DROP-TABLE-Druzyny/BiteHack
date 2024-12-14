# django imports
from django.db import models
from django.contrib.auth import models as auth_models

class Profile(models.Model):
    """Model used to store user profile information"""

    user = models.OneToOneField(auth_models.User, on_delete=models.CASCADE)
    avatar = models.ImageField(
        upload_to='avatars/',
        null=True, blank=True,
        default='avatars/default.svg'
    )
    bio = models.TextField(max_length=500, blank=True)
    joined = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()

    def __str__(self):
        """String representation of the Profile model"""

        return str(self.user.username) if self.user else ''

    def get_default_bio(self):
        """Method to generate a default bio if none is provided"""

        return f"We don't know much about them, but we're sure {self.user.username} is great."

    def save(self, *args, **kwargs):
        """Method to save the Profile model"""

        if not self.bio:
            self.bio = self.get_default_bio()

        super(Profile, self).save(*args, **kwargs)

class LocalEvent(models.Model):
    TYPE_CHOICES = [
        ("PARTY", "Impreza"),
        ("MEETING", "Spotkanie"),
        ("MUSIC", "Muzyka"),
        ("OTHER", "Inne")
    ]

    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True, default="Brak dodatkowych informacji o wydarzeniu.")
    data_start = models.DateTimeField(blank=False, null=False)
    data_end = models.DateTimeField(blank=False, null=False)
    latitude = models.FloatField(blank=False, null=False)
    longitude = models.FloatField(blank=False, null=False)
    type = models.CharField(max_length=64, choices=TYPE_CHOICES, default="OTHER", blank=False)

    # TODO:
    # liczba zainteresowanych
    # informacje o dostępności wydarzenia

    def __str__(self):
        """String representation of the LocalEvent model"""

        return str(self.name)