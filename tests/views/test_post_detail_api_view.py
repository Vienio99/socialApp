from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from api.v1.post.serializer import PostSerializer
from social.models import Post

User = get_user_model()


class PostDetailApiViewTest(APITestCase):
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1')
        cls.post = Post.objects.create(title='Fancy title for my post',
                                       author=cls.user,
                                       text='Hello guys',
                                       )

    def test_can_read_a_specific_post(self):
        response = self.client.get('/api/v1/post/1')
        self.assertEqual(response.status_code, 200)

        self.assertEquals(
            PostSerializer(instance=self.post).data,
            response.data
        )

    def test_post_that_doesnt_exist(self):
        response = self.client.get('/api/v1/post/2')
        self.assertEqual(response.status_code, 404)
