from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from api.v1.comment.serializer import CommentSerializer
from social.models import Comment, Post

User = get_user_model()


class CommentListApiViewTest(APITestCase):
    post = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1')
        cls.post = Post.objects.create(title='Fancy title for my post',
                                       author=cls.user,
                                       text='Hello guys',
                                       )
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

    def test_can_create_new_comment(self):
        data = {
            'author': 1,
            'text': 'My new comment',
            'post': 1,
        }
        response = self.client.post('/api/v1/comment/', data)
        self.assertEqual(response.status_code, 201)

    def test_created_comment_has_proper_data(self):
        data = {
            'author': 1,
            'text': 'Fancy text',
            'post': 1,
        }
        response = self.client.post('/api/v1/comment/', data)
        self.assertEqual(response.data['author'], 1)
        self.assertEqual(response.data['text'], 'Fancy text')
        self.assertEqual(response.data['post'], 1)