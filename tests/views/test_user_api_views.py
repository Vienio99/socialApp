from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

User = get_user_model()


class UserListApiViewTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username='goofy', password='secret')

        cls.data = {
            'username': 'user',
            'password': 'secret'
        }

    def test_can_create_user(self):
        response = self.client.post('/api/v1/user/', self.data)
        self.assertEqual(response.status_code, 201)


class UserDetailApiViewTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.data = {
            'username': 'user',
            'password': 'secret'
        }

    def test_can_get_created_user(self):
        self.client.post('/api/v1/user/', self.data)
        newUser = User.objects.get(username='user')
        response = self.client.get(f'/api/v1/user/{newUser.username}')
        self.assertEqual(response.status_code, 200)

    def test_user_has_proper_username_and_password(self):
        self.client.post('/api/v1/user/', self.data)
        newUser = User.objects.get(username='user')
        response = self.client.get(f'/api/v1/user/{newUser.username}')
        self.assertEqual(response.data['username'], 'user')
        self.assertEqual(newUser.check_password("secret"), True)


class LoginTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.data = {
            'username': 'goofy',
            'password': 'secret'
        }

        cls.fakeData = {
            'username': 'fake',
            'password': 'secret'
        }

    def test_can_get_token(self):
        self.client.post('/api/v1/user/', self.data)
        response = self.client.post('/api/v1/user/token/', self.data)
        self.assertEqual(response.status_code, 200)

    def test_can_not_get_token_if_there_is_no_user_with_given_credentials(self):
        response = self.client.post('/api/v1/user/token/', self.fakeData)
        self.assertEqual(response.status_code, 401)

    # def test_blacklist_token
