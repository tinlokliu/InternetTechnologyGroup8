from django.test import TestCase

from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class RangoAppTests(TestCase):

    def test_homepage_view_status_code(self):
        response = self.client.get(reverse('rango:homepage'))
        self.assertEqual(response.status_code, 200)

    def test_about_view_status_code(self):
        response = self.client.get(reverse('rango:about'))
        self.assertEqual(response.status_code, 200)

    def test_profile_view_status_code(self):
        response = self.client.get(reverse('rango:profile'))
        self.assertEqual(response.status_code, 200)

    def test_catalogue_view_status_code(self):
        response = self.client.get(reverse('rango:catalogue'))
        self.assertEqual(response.status_code, 200)

    def test_detail_view_status_code(self):
        response = self.client.get(reverse('rango:detail'))
        self.assertEqual(response.status_code, 200)

    def test_login_view_get(self):
        response = self.client.get(reverse('rango:login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'rango/login.html')

    def test_signup_view_status_code(self):
        response = self.client.get(reverse('rango:signup'))
        self.assertEqual(response.status_code, 200)

    def test_register_view_post_success(self):
        response = self.client.post(reverse('rango:register'), {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123',
            'confirm': 'password123'
        })
        # Adjust the redirect check based on your view logic
        self.assertRedirects(response, reverse('rango:login'))

    def create_user_and_login(self):
        user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')
        return user

    def test_protected_view_access_with_login(self):
        self.create_user_and_login()
        response = self.client.get(reverse('rango:profile'))
        self.assertEqual(response.status_code, 200)
