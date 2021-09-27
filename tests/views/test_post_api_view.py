from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from api.v1.post.serializer import PostSerializer
from social.models import Post

User = get_user_model()


class PostListApiViewTest(APITestCase):
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.notAuthor = User.objects.create_user(username='notAuthor', password='123')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.post2 = Post.objects.create(author=cls.user, text='Hello girls',)

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

    def __init__(self, methodName: str = ...):
        super().__init__(methodName)
        self.post2 = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')

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
        self.client.login(username='user1', password='secret')
        response = self.client.put(f'/api/v1/post/{self.post.pk}', {'author': self.user.pk,
                                                                    'text': 'New fancy text'})
        self.assertEqual(response.status_code, 200)
        # Additional check if the post is really updated
        updatedPost = Post.objects.get(text='New fancy text')
        self.assertEqual(updatedPost.text, 'New fancy text')

    def test_only_author_can_update_his_post(self):
        self.client.login(username='notAuthor', password='123')
        response = self.client.put(f'/api/v1/post/{self.post.pk}', {'author': self.user.pk,
                                                                    'text': 'Not hello'})
        self.assertEqual(response.status_code, 403)

    def test_user_can_delete_his_post(self):
        self.client.login(username='user1', password='secret')
        response = self.client.delete(f'/api/v1/post/{self.post.pk}')
        self.assertEqual(response.status_code, 204)

    def test_can_create_new_post(self):
        data = {
            'author': self.user.pk,
            'text': 'Hello boys'
        }
        self.client.post('/api/v1/post/', data)
        newPost = Post.objects.get(text='Hello boys')
        response = self.client.get(f'/api/v1/post/{newPost.pk}')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['text'], 'Hello boys')

    def test_created_post_has_proper_data(self):
        data = {
            'author': self.user.pk,
            'text': 'Hello boys'
        }
        self.client.post('/api/v1/post/', data)
        newPost = Post.objects.get(text='Hello boys')
        response = self.client.get(f'/api/v1/post/{newPost.pk}')

        self.assertEqual(response.data['text'], 'Hello boys')
