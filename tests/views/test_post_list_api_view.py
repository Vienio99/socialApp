from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from api.v1.post.serializer import PostSerializer
from social.models import Post

User = get_user_model()


class PostListApiViewTest(APITestCase):
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1')
        cls.post = Post.objects.create(title='Fancy title for my post',
                                       author=cls.user,
                                       text='Hello guys',
                                       )
        Post.objects.create(title='No title',
                            author=cls.user,
                            text='Hello girls',
                            )

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

    def test_can_create_new_post(self):
        data = {
            'title': 'Hello not world',
            'author': 1,
            'text': 'Hello boys'
        }
        self.client.post('/api/v1/post/', data)
        response = self.client.get('/api/v1/post/3')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'Hello not world')

    def test_created_post_has_proper_data(self):
        data = {
            'title': 'Hello not world',
            'author': 1,
            'text': 'Hello boys'
        }
        self.client.post('/api/v1/post/', data)

        response = self.client.get('/api/v1/post/3')

        self.assertEqual(response.data['title'], 'Hello not world')
