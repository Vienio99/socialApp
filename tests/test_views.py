from django.test import TestCase
from users.models import CustomUser
from django.urls import reverse
from django.contrib.auth import get_user_model

class HomePageTest(TestCase):
  
  def test_home_page_status_code(self):
    response = self.client.get('/')
    self.assertEqual(response.status_code, 200)

    url = reverse('home')
    self.assertEqual(url, '/')