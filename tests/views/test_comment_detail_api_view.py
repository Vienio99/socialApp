from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from api.v1.comment.serializer import CommentSerializer
from social.models import Comment, Post

User = get_user_model()


class CommentDetailApiViewTest(APITestCase):
    post = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.post = Post.objects.create(title='Fancy title for my post',
                                       author=cls.user,
                                       text='Hello guys',
                                       )
        cls.comment = Comment.objects.create(author=cls.user, text='Hello', post=cls.post)

    def test_can_read_a_specific_comment(self):
        response = self.client.get('/api/v1/comment/1')
        self.assertEqual(response.status_code, 200)

        self.assertEquals(
            CommentSerializer(instance=self.comment).data,
            response.data
        )

    def test_cant_read_comment_that_doesnt_exist(self):
        response = self.client.get('/api/v1/comment/2')
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_his_comment(self):
        self.client.login(username='user1', password='secret')
        response = self.client.put('/api/v1/comment/1', {'author': 1,
                                                         'text': 'Definitely not hello world',
                                                         'post': 1})
        self.assertEqual(response.status_code, 200)
        # Additional check if the comment is really updated
        updatedComment = Comment.objects.get(text='Definitely not hello world')
        self.assertEqual(updatedComment.text, 'Definitely not hello world')

    def test_only_author_can_update_his_comment(self):
        User.objects.create_user(username='notAuthor', password='123')
        self.client.login(username='notAuthor', password='123')
        response = self.client.put('/api/v1/comment/1', {'author': 1,
                                                         'text': 'Definitely not hello world',
                                                         'post': 1})
        self.assertEqual(response.status_code, 403)

    def test_user_can_delete_his_comment(self):
        self.client.login(username='user1', password='secret')
        response = self.client.delete('/api/v1/comment/1')
        self.assertEqual(response.status_code, 204)
