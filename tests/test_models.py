from django.test import TestCase
from django.contrib.auth import get_user_model
from social.models import Post, Comment
from django.utils import timezone

User = get_user_model()


class PostModelTest(TestCase):
    # Added because otherwise Pycharm identifies user as an unresolved reference
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1')
        cls.post = Post.objects.create(title='Fancy title for my post', author=cls.user, text='Hello guys', )

    def test_post_has_proper_title(self):
        self.assertEqual(self.post.title, 'Fancy title for my post')

    def test_post_has_proper_author(self):
        self.assertEqual(self.post.author.username, 'user1')

    def test_post_has_proper_pub_date(self):
        self.assertEqual(self.post.pub_date.strftime('%d-%m-%Y %H:%M:%S'), timezone.now().strftime('%d-%m-%Y %H:%M:%S'))

    def test_post_has_not_proper_text(self):
        self.assertNotEqual(self.post.text, 'Hello girls')


class CommentModelTest(TestCase):
    # Added because otherwise Pycharm identifies user as an unresolved reference
    post = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1')
        cls.post = Post.objects.create(title='Fancy title for my post',
                                       author=cls.user,
                                       text='Hello guys',
                                       )
        cls.comment = Comment.objects.create(author=cls.user, text='Hello', post=cls.post)

    def test_comment_has_proper_text(self):
        self.assertEqual(self.comment.text, 'Hello')

    def test_comment_has_proper_author(self):
        self.assertEqual(self.comment.author, self.user)

    def test_comment_has_proper_post(self):
        self.assertEqual(self.comment.post, self.post)

    def test_comment_has_proper_pub_date(self):
        self.assertEqual(self.comment.pub_date.strftime('%d-%m-%Y %H:%M:%S'),
                         timezone.now().strftime('%d-%m-%Y %H:%M:%S'))


class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1', age=10, hobby='tennis')

    def test_user_has_proper_age(self):
        self.assertEqual(self.user.age, 10)

    def test_user_has_proper_hobby(self):
        self.assertEqual(self.user.hobby, 'tennis')
