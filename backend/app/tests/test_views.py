import logging
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from django.contrib.auth.models import User
from app.models import Profile

logger = logging.getLogger(__name__)

class TestUserViewSet(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/user/'

    def test_create_user(self):
        """Test creating a proper user"""

        response = self.client.post(self.url, {
            'username': 'testuser1',
            'email': 'testuser@testmail.com',
            'password': '12345',
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_already_authenticated(self):
        """Test creating a user while authenticated"""

        user = User.objects.create_user(username='testuser', password='12345', email="test@gmail.com")

        self.client.force_authenticate(user=user)

        response = self.client.post(self.url, {
            'username': 'testuser2',
            'email': 'testuser@testmail.com',
            'password': '12345',
        })

        self.assertEqual(response.status_code, 403)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_missing_fields(self):
        """Test creating a user with missing fields"""
        
        response = self.client.post(self.url, {
            'username': 'testuser3',
            'password': '12345',
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 0)

    def test_create_user_invalid_email(self):
        """Test creating a user with an invalid email"""

        response = self.client.post(self.url, {
            'username': 'testuser4',
            'email': 'invalidemail',
            'password': '12345',
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 0)

    def test_create_user_short_values(self):
        """Test creating a user with short values"""
        
        response = self.client.post(self.url, {
            'username': 'a',
            'email': 'foo@bar.com',
            'password': '12345',
        })
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.url, {
            'username': 'abcdef',
            'email': 'foo@bar.com',
            'password': '1',
        })
        self.assertEqual(response.status_code, 400)
        
        self.assertEqual(User.objects.count(), 0)

    def test_create_user_long_values(self):
        """Test creating a user with long values"""

        response = self.client.post(self.url, {
            'username': 'a'*31,
            'email': 'foo@bar.com',
            'password': '12345',
        })
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.url, {
            'username': 'abcdef5',
            'email': 'foo@bar.com',
            'password': '1'*300,
        })
        self.assertEqual(response.status_code, 400)

        self.assertEqual(User.objects.count(), 0)

    def test_get_user_anon(self):
        user = User.objects.create_user(username='testuser', password='12345', email='test@gmail.com')

        response = self.client.get(f'{self.url}{user.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'testuser')

    def test_get_user_self_authenticated(self):
        user = User.objects.create_user(username='testuser', password='12345')

        self.client.force_authenticate(user=user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'testuser')

    def test_get_user_self_unauthenticated(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)

class TestProfileDetail(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/profile/'

    def test_get_profile_anon(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)

    def test_get_profile_authenticated(self):
        user = User.objects.create_user(username='testuser', password='12345')

        self.client.force_authenticate(user=user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'testuser')

    def test_get_profile_authenticated_no_profile(self):
        user = User.objects.create_user(username='testuser', password='12345')

        self.client.force_authenticate(user=user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'testuser')

    def test_get_profile_authenticated_profile(self):
        user = User.objects.create_user(username='testuser', password='12345')
        profile = user.profile
        profile.bio = 'This is a test bio'
        profile.save()

        self.client.force_authenticate(user=user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['bio'], 'This is a test bio')

    def test_get_profile_by_id_anon(self):
        user = User.objects.create_user(username='testuser', password='12345')
        profile = user.profile
        profile.bio = 'This is a test bio'
        profile.save()

        response = self.client.get(f'{self.url}{user.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['bio'], 'This is a test bio')
    