# django imports
from django.db import models
from django.contrib.auth import models as auth_models

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