from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

User = get_user_model()


class UserListApiViewTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username='goofy', password='secret')

    def test_can_create_user(self):
        data = {
            'username': 'user',
            'password': 'secret'
        }
        response = self.client.post('/api/v1/user/', data)
        self.assertEqual(response.status_code, 201)


class CommentDetailApiViewTest(APITestCase):

    def test_can_get_created_user(self):
        data = {
            'username': 'user2',
            'password': 'secret2'
        }
        self.client.post('/api/v1/user/', data)
        newUser = User.objects.get(username='user2')
        response = self.client.get(f'/api/v1/user/{newUser.pk}')
        self.assertEqual(response.status_code, 200)

    def test_user_has_proper_username_and_password(self):
        data = {
            'username': 'user1',
            'password': 'secret1'
        }
        self.client.post('/api/v1/user/', data)
        newUser = User.objects.get(username='user1')
        response = self.client.get(f'/api/v1/user/{newUser.pk}')
        self.assertEqual(response.data['username'], 'user1')
        self.assertEqual(response.data['password'], 'secret1')


