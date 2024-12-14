import logging
from django.test import TestCase
from django.contrib.auth.models import User
from django.db import IntegrityError

from backend.app.models.models import Profile

logger = logging.getLogger(__name__)

class ProfileTestCase(TestCase):
    def test_create_profile_default(self):
        """Test creating a profile with default values"""
        user = User.objects.create_user(username='profiletest_default', password='12345')
        profile = Profile.objects.get(user=user)
        profile.bio = 'This is a test bio'
        
        self.assertEqual(profile.user, user)
        self.assertEqual(profile.bio, 'This is a test bio')
        self.assertEqual(str(profile), profile.user.username)
        self.assertEqual(profile.avatar, 'avatars/default.svg')
        self.assertEqual(Profile.objects.count(), 1)
    
    def test_create_profile_no_user(self):
        """Test creating a profile without a user"""
        
        with self.assertRaises(IntegrityError):
            profile = Profile.objects.create(
            bio='This is a test bio')
    
    def test_create_profile_no_bio(self):
        """Test creating a profile without a bio"""

        user = User.objects.create_user(username='profiletest_no_bio', password='12345')
        profile = Profile.objects.get(user=user)
        
        self.assertEqual(profile.bio, f"We don't know much about them, but we're sure {user.username} is great.")
        self.assertEqual(profile.avatar, 'avatars/default.svg')