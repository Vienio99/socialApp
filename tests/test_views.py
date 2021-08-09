from django.contrib.auth import get_user_model
from django.test import TestCase

from social.models import Comment, Post

# Czy to jest potrzebne w ogóle?

# class HomePageTest(TestCase):
#
#     def test_home_page_status_code(self):
#         response = self.client.get('/')
#         self.assertEqual(response.status_code, 200)
#
#         url = reverse('home')
#         self.assertEqual(url, '/')


User = get_user_model()


class PostListApiViewTest(TestCase):

    def test_comment_list_api_view_status_code(self):
        response = self.client.get('/api/v1/post/')
        self.assertEqual(response.status_code, 200)


class CommentListApiViewTest(TestCase):

    def test_comment_list_api_view_status_code(self):
        response = self.client.get('/api/v1/comment/')
        self.assertEqual(response.status_code, 200)

    # def test_comment_list_api_view_new_user(self):
    # response = self.client.post('/api/v1/user/')
    # self.assertEqual(response.status_code, 200)


class CommentDetailApiViewTest(TestCase):

    def setUp(self):
        user = User.objects.create(username='user1')
        post = Post.objects.create(title='Fancy title for my post',
                                   author=user,
                                   text='Hello guys',
                                   )
        Comment.objects.create(author=user, text='Hello', post=post)

    def test_comment_detail_api_view_status_code(self):
        response = self.client.get('/api/v1/comment/1')
        self.assertEqual(response.status_code, 200)
