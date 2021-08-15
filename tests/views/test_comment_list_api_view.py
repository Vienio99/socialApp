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
        cls.user = User.objects.create(username='user1')
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

    def test_can_create_new_comment(self):
        response = self.client.post('/api/v1/comment/', {'author': 1,
                                                         'text': 'My new comment',
                                                         'post': 1,
                                                         })
        self.assertEqual(response.status_code, 201)

    def test_created_comment_has_proper_data(self):
        response = self.client.post('/api/v1/comment/', {'author': 1,
                                                         'text': 'Fancy text',
                                                         'post': 1,
                                                         })
        self.assertEqual(response.data['author'], 1)
        self.assertEqual(response.data['text'], 'Fancy text')
        self.assertEqual(response.data['post'], 1)

