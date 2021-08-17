from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from api.v1.post.serializer import PostSerializer
from social.models import Post

User = get_user_model()


class PostDetailApiViewTest(APITestCase):
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
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

    def test_cant_read_post_that_doesnt_exist(self):
        response = self.client.get('/api/v1/post/2')
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_his_post(self):
        self.client.login(username='user1', password='secret')
        response = self.client.put('/api/v1/post/1', {'title': 'New fancy title',
                                                      'author': 1,
                                                      'text': 'Not hello'})
        self.assertEqual(response.status_code, 200)
        # Additional check if the post is really updated
        updatedPost = Post.objects.get(title='New fancy title')
        self.assertEqual(updatedPost.text, 'Not hello')

    def test_only_author_can_update_his_post(self):
        User.objects.create_user(username='notAuthor', password='123')
        self.client.login(username='notAuthor', password='123')
        response = self.client.put('/api/v1/post/1', {'title': 'New fancy title',
                                                      'author': 1,
                                                      'text': 'Not hello'})
        self.assertEqual(response.status_code, 403)

    def test_user_can_delete_his_post(self):
        self.client.login(username='user1', password='secret')
        response = self.client.delete('/api/v1/post/1')
        self.assertEqual(response.status_code, 204)
