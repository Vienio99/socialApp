from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework.utils import json

from api.v1.comment.serializer import CommentSerializer
from social.models import Comment, Post

User = get_user_model()


class CommentListApiViewTest(APITestCase):
    post = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.notAuthor = User.objects.create_user(username='notAuthor', password='123')
        Comment.objects.create(author=cls.user, text='Hello', post=cls.post)
        Comment.objects.create(author=cls.user, text='Not world', post=cls.post)

    def test_can_browse_all_comments(self):
        response = self.client.get('/api/v1/comment/')
        comments = Comment.objects.all()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(comments), len(response.data))

        for comment in comments:
            self.assertIn(
                CommentSerializer(instance=comment).data,
                response.data
            )


class CommentDetailApiViewTest(APITestCase):
    post = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.notAuthor = User.objects.create_user(username='notAuthor', password='secret')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.comment = Comment.objects.create(author=cls.user, text='Hello', post=cls.post)

        cls.data = {
            'author': cls.user.pk,
            'text': 'Definitely not hello world',
            'post': cls.post.pk
        }

        cls.data2 = {
            'author': cls.user.pk,
            'text': 'My new comment',
            'post': cls.post.pk,
        }

    def test_can_read_a_specific_comment(self):
        response = self.client.get(f'/api/v1/comment/{self.comment.pk}')
        self.assertEqual(response.status_code, 200)

        self.assertEquals(
            CommentSerializer(instance=self.comment).data,
            response.data
        )

    def test_cant_read_comment_that_doesnt_exist(self):
        response = self.client.get('/api/v1/comment/10')
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_his_comment(self):
        response = self.client.post('/api/v1/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.put(f'/api/v1/comment/{self.comment.pk}', {'text': 'Definitely not hello world'}, **headers)
        self.assertEqual(response.status_code, 200)
        # Additional check if the comment is really updated
        updatedComment = Comment.objects.get(text='Definitely not hello world')
        self.assertEqual(updatedComment.text, 'Definitely not hello world')

    def test_only_author_can_update_his_comment(self):
        response = self.client.post('/api/v1/token/', {'username': 'notAuthor', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.put(f'/api/v1/comment/{self.comment.pk}', {'text': 'whatever'}, **headers)
        self.assertEqual(response.status_code, 403)

    def test_user_can_delete_his_comment(self):
        response = self.client.post('/api/v1/token/', {'username': 'user1', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.delete(f'/api/v1/comment/{self.comment.pk}', **headers)
        self.assertEqual(response.status_code, 204)

    def test_only_author_can_delete_his_comment(self):
        response = self.client.post('/api/v1/token/', {'username': 'notAuthor', 'password': 'secret'})
        tokens = json.loads(response.content)
        headers = {
            "HTTP_AUTHORIZATION": "JWT " + tokens['access']
        }
        response = self.client.delete(f'/api/v1/comment/{self.comment.pk}', **headers)
        self.assertEqual(response.status_code, 403)

    def test_can_create_new_comment(self):
        response = self.client.post('/api/v1/comment/', self.data2)
        self.assertEqual(response.status_code, 201)

    def test_created_comment_has_proper_data(self):
        response = self.client.post('/api/v1/comment/', self.data2)
        self.assertEqual(response.data['author'], self.user.username)
        self.assertEqual(response.data['text'], 'My new comment')
        self.assertEqual(response.data['post'], self.post.pk)
