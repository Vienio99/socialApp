from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework.utils import json
from api.v1.post.serializer import PostSerializer
from social.models import Post, Tag

User = get_user_model()


class PostValidationTest(APITestCase):
    user = None
    post2 = None

    def __init__(self, methodName: str = ...):
        super().__init__(methodName)

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.notAuthor = User.objects.create_user(username='notAuthor', password='secret')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.tag = Tag.objects.create(name='#hiking')

        cls.data = {
            'author': cls.user.username,
            'text': 'Hello boys',
            'tags': [{'name': '#walking'}, {'name': '#football'}]
        }

        cls.data2 = {
            'author': cls.user.username,
            'text': 'New fancy text',
            'tags': [{'name': '#hiking'}, {'name': '#driving'}]
        }

    def setUp(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        self.headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }

        response = self.client.post('/api/v1/user/token/', {'username': 'notAuthor', 'password': 'secret'})
        tokens = json.loads(response.content)
        self.headersNotAuthor = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }

    def test_no_text_field_validation(self):
        data = {
            'author': self.user.username,
            'tags': [{'name': '#hiking'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['text'][0], 'This field is required.')

    def test_no_text_validation(self):
        data = {
            'author': self.user.username,
            'text': '',
            'tags': [{'name': '#hiking'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['text'][0], 'This field may not be blank.')

    def test_minimum_text_length_validation(self):
        data = {
            'author': self.user.username,
            'text': 'Heww',
            'tags': [{'name': '#hiking'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['text'][0], 'Text must be at least 5 characters long.')

    def test_maximum_text_length_validation(self):
        data = {
            'author': self.user.username,
            'text': """lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text
                    lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text
                    lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text
                    lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text
                    lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text
                    lenghty text lenghty text lenghty text lenghty text lenghty text lenghty text""",
            'tags': [{'name': '#hiking'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['text'][0], 'Text must not exceed 500 characters.')

    def test_no_tags_field_validation(self):
        data = {
            'author': self.user.username,
            'text': 'Hello'
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['non_field_errors'][0], 'Tags are required.')

    def test_no_tags_validation(self):
        data = {
            'author': self.user.username,
            'text': 'Hello',
            'tags': []
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['tags'][0], 'No tags were provided.')

    def test_minimum_tags_length_validation(self):
        data = {
            'author': self.user.username,
            'text': 'working text',
            'tags': [{'name': '#'}, {'name': '#a'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['tags'][0], 'Invalid tag format.')

    def test_maximum_single_tag_length_validation(self):
        data = {
            'author': self.user.username,
            'text': 'working text',
            'tags': [{'name': '#wrongdsafdsfasdfsdafdsafdsafadsfadsghfjghfkhjglkjhdfgsfdgdfsgfdsgfdsgfdsgf'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['tags'][0], 'Tag must not exceed 20 characters.')

    def test_maximum_amount_of_tags_validation(self):
        data = {
            'author': self.user.username,
            'text': 'working text',
            'tags': [{'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'},
                     {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'},
                     {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'},
                     {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'},
                     {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'}, {'name': '#hiking'},
                     {'name': '#hiking'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['tags'][0], 'Too much tags provided (maximum 20 tags).')

    def test_tag_not_matching_regex_validation(self):
        data = {
            'author': self.user.username,
            'text': 'working text',
            'tags': [{'name': 'invalid'}]
        }
        response = self.client.post('/api/v1/post/', data, **self.headers)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['tags'][0], 'Invalid tag format.')


class UserValidationTest(APITestCase):

    def test_username_minimum_length_validation(self):
        data = {
            'username': 'use',
            'password': 'secret'
        }
        response = self.client.post('/api/v1/user/', data)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['username'][0], 'Username must be at least 4 characters long.')

    def test_username_maximum_length_validation(self):
        data = {
            'username': 'useruseruseruseruseruser',
            'password': 'secret'
        }
        response = self.client.post('/api/v1/user/', data)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['username'][0], 'Username must not exceed 20 characters.')

    def test_username_format_validation(self):
        data = {
            'username': '#!wrongusername',
            'password': 'secret'
        }
        response = self.client.post('/api/v1/user/', data)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['username'][0], 'Enter a valid username. This value may contain only letters, '
                                                 'numbers, and @/./+/-/_ characters.')

    def test_username_already_exists_in_database(self):
        data = {
            'username': 'user',
            'password': 'secret'
        }
        response = self.client.post('/api/v1/user/', data)
        self.assertEqual(response.status_code, 201)

        data2 = {
            'username': 'user',
            'password': 'secret2'
        }
        response = self.client.post('/api/v1/user/', data2)
        self.assertEqual(response.status_code, 400)
        content = json.loads(response.content)
        self.assertEqual(content['username'][0], 'A user with that username already exists.')

