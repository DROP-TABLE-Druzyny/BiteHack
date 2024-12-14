from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models.models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a new profile object when a new user is created"""

    if created:
        Profile.objects.create(user=instance)
