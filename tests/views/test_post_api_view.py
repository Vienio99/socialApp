from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework.utils import json

from api.v1.post.serializer import PostSerializer
from social.models import Post, Tag

User = get_user_model()


# TO-DO - divide tests
# TO-DO - move data to setUp
# TO-DO - use dummy data


class PostListApiViewTest(APITestCase):
    post = None
    tag = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.notAuthor = User.objects.create_user(username='notAuthor', password='123')
        cls.tag = Tag.objects.create(name='#running')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.post.tags.set([cls.tag])
        cls.post2 = Post.objects.create(author=cls.user, text='Hello girls')

    def test_can_browse_all_posts(self):
        response = self.client.get('/api/v1/post/')
        posts = Post.objects.all()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(posts), len(response.data))

        for post in posts:
            self.assertIn(
                PostSerializer(instance=post).data,
                response.data
            )


class PostDetailApiViewTest(APITestCase):
    user = None
    post2 = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.notAuthor = User.objects.create_user(username='notAuthor', password='secret')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.tag = Tag.objects.create(name='#hiking')

        cls.data = {
            'author': cls.user.pk,
            'text': 'Hello boys',
            'tags': [{'name': '#walking'}, {'name': '#football'}]
        }

        cls.data2 = {
            'author': cls.user.pk,
            'text': 'New fancy text',
            'tags': [{'name': '#hiking'}, {'name': '#driving'}]
        }

    def test_can_read_a_specific_post(self):
        response = self.client.get(f'/api/v1/post/{self.post.pk}')
        self.assertEqual(response.status_code, 200)

        self.assertEquals(
            PostSerializer(instance=self.post).data,
            response.data
        )

    def test_cant_read_post_that_doesnt_exist(self):
        response = self.client.get('/api/v1/post/2')
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_his_post(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.patch(f'/api/v1/post/{self.post.pk}', {'text': 'Hello'}, **headers)
        # Additional check if post got updated
        updatedPost = Post.objects.get(text='Hello')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(updatedPost.text, 'Hello')

    def test_updated_post_has_proper_data(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        self.client.patch(f'/api/v1/post/{self.post.pk}',
                          {'text': 'New fancy text', 'tags': [{'name': '#hiking'}, {'name': '#driving'}]},
                          **headers)
        updatedPost = Post.objects.get(text='New fancy text')
        response = self.client.get(f'/api/v1/post/{updatedPost.pk}')
        self.assertEqual(response.data['text'], 'New fancy text')
        self.assertEqual(response.data['tags'][0]['name'], '#hiking')
        self.assertEqual(response.data['tags'][1]['name'], '#driving')

    def test_only_author_can_update_his_post(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'notAuthor', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.patch(f'/api/v1/post/{self.post.pk}',
                                     {'text': 'Not hello'},
                                     **headers)
        self.assertEqual(response.status_code, 403)

    def test_user_can_delete_his_post(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.delete(f'/api/v1/post/{self.post.pk}',
                                      **headers)
        self.assertEqual(response.status_code, 204)

    def test_only_author_can_delete_his_post(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'notAuthor', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.put(f'/api/v1/post/{self.post.pk}', **headers)
        self.assertEqual(response.status_code, 403)

    def test_authenticated_user_can_create_new_post(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        self.client.post('/api/v1/post/', self.data, **headers)
        newPost = Post.objects.get(text='Hello boys')
        response = self.client.get(f'/api/v1/post/{newPost.pk}')
        self.assertEqual(response.status_code, 200)

    def test_non_authenticated_user_can_not_create_new_post(self):
        response = self.client.post('/api/v1/post/', self.data)
        self.assertEqual(response.status_code, 401)

    def test_created_post_has_proper_data(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        self.client.post('/api/v1/post/', self.data, **headers)
        newPost = Post.objects.get(text='Hello boys')
        response = self.client.get(f'/api/v1/post/{newPost.pk}')
        self.assertEqual(response.data['text'], 'Hello boys')
        self.assertEqual(response.data['likes'], 0)
        self.assertEqual(response.data['tags'][0]['name'], '#walking')
        self.assertEqual(response.data['tags'][1]['name'], '#football')
        self.assertEqual(response.data['pub_date'], 'now')

    def test_post_does_not_require_tags(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        data = {
            'author': self.user.pk,
            'text': 'Hello boys',
            'tags': []
        }
        response = self.client.post('/api/v1/post/', data, **headers)
        self.assertEqual(response.status_code, 201)

    def test_can_create_post_with_username_instead_of_user_id(self):
        response = self.client.post('/api/v1/user/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        data = {
            'author': 'user1',
            'text': 'Hello boys',
            'tags': []
        }

        response = self.client.post('/api/v1/post/', data, **headers)
        print(response.content)
        self.assertEqual(response.status_code, 201)

    # def test_authenticated_users_can_like_post(self):
