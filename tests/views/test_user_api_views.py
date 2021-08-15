from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

User = get_user_model()


class UserListApiViewTest(APITestCase):

    def test_can_create_user(self):
        response = self.client.post('/api/v1/user/', {'username': 'user',
                                                      'password': 'secret'})
        self.assertEqual(response.status_code, 201)


class CommentDetailApiViewTest(APITestCase):

    def test_can_get_created_user(self):
        self.client.post('/api/v1/user/', {'username': 'user',
                                           'password': 'secret'})

        response = self.client.get('/api/v1/user/1')
        self.assertEqual(response.status_code, 200)

    def test_user_has_proper_username_and_password(self):
        self.client.post('/api/v1/user/', {'username': 'user',
                                           'password': 'secret'})

        response = self.client.get('/api/v1/user/2')
        self.assertEqual(response.data['username'], 'user')
        self.assertEqual(response.data['password'], 'secret')

    # def test_user_can_login(self):
