from django.test import TestCase
from django.contrib.auth import get_user_model
from social.models import Post, Comment
from django.utils import timezone

User = get_user_model()


class PostModelTest(TestCase):

    def setUp(self):
        user = User.objects.create(username='user1')
        Post.objects.create(title='Fancy title for my post', author=user, text='Hello guys', pub_date=timezone.now())

    def test_post_has_proper_title(self):
        post = Post.objects.get(title='Fancy title for my post')
        self.assertEqual(post.title, 'Fancy title for my post')

    def test_post_has_proper_author(self):
        user = User.objects.get(username='user1')
        post = Post.objects.get(author=user)
        self.assertEqual(post.author.username, 'user1')

    def test_post_has_proper_pub_date(self):
        post = Post.objects.get(title='Fancy title for my post')
        self.assertEqual(post.pub_date.strftime('%d-%m-%Y %H:%M:%S'), timezone.now().strftime('%d-%m-%Y %H:%M:%S'))

    def test_post_has_proper_text(self):
        post = Post.objects.get(title='Fancy title for my post')
        self.assertEqual(post.text, 'Hello guys')


class CommentModelTest(TestCase):

    def setUp(self):
        user = User.objects.create(username='user1')
        post = Post.objects.create(title='Fancy title for my post',
                                   author=user,
                                   text='Hello guys',
                                   pub_date=timezone.now())
        Comment.objects.create(author=user, text='Hello', post=post)

    def test_comment_has_proper_text(self):
        comment = Comment.objects.get(text='Hello')
        self.assertEqual(comment.text, 'Hello')

    def test_comment_has_proper_author(self):
        user = User.objects.get(username='user1')
        comment = Comment.objects.get(text='Hello')
        self.assertEqual(comment.author, user)

    def test_comment_has_proper_post(self):
        post = Post.objects.get(title='Fancy title for my post')
        comment = Comment.objects.get(text='Hello')
        self.assertEqual(comment.post, post)

    def test_comment_has_proper_pub_date(self):
        comment = Comment.objects.get(text='Hello')
        self.assertEqual(comment.pub_date.strftime('%d-%m-%Y %H:%M:%S'), timezone.now().strftime('%d-%m-%Y %H:%M:%S'))

class UserModelTest(TestCase):

    def setUp(self):
        User.objects.create(username='user1', age=10, hobby='tennis')

    def test_user_has_proper_age(self):
        user = User.objects.get(username='user1')
        self.assertEqual(user.age, 10)

    def test_user_has_proper_hobby(self):
        user = User.objects.get(username='user1')
        self.assertEqual(user.hobby, 'tennis')
