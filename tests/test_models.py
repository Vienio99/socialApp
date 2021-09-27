from django.test import TestCase
from django.contrib.auth import get_user_model
from social.models import Post, Comment, Tag
from django.utils import timezone

User = get_user_model()


class PostModelTest(TestCase):
    # Added because otherwise Pycharm identifies user as an unresolved reference
    tag = None
    post = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys', likes=4)
        cls.tag = Tag.objects.create(name='#hiking')
        cls.post.tags.set([cls.tag])

    def test_post_has_proper_amount_of_likes(self):
        self.assertEqual(self.post.likes, 4)

    def test_post_has_proper_author(self):
        self.assertEqual(self.post.author.username, 'user1')

    def test_post_has_proper_pub_date(self):
        self.assertEqual(self.post.pub_date.strftime('%d-%m-%Y %H:%M:%S'), timezone.now().strftime('%d-%m-%Y %H:%M:%S'))

    def test_post_has_not_invalid_text(self):
        self.assertNotEqual(self.post.text, 'Hello girls')

    def test_has_proper_tag(self):
        self.assertEqual(self.post.tags.get(pk=self.tag.pk).name, '#hiking')


class CommentModelTest(TestCase):
    # Added because otherwise Pycharm identifies user as an unresolved reference
    post = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.comment = Comment.objects.create(author=cls.user, text='Hello', post=cls.post)

    def test_comment_has_proper_text(self):
        self.assertEqual(self.comment.text, 'Hello')

    def test_comment_has_proper_author(self):
        self.assertEqual(self.comment.author, self.user)

    def test_comment_has_proper_post(self):
        self.assertEqual(self.comment.post, self.post)

    # TO-D0 - make tests for how much time has passed since post was created
    def test_comment_has_proper_pub_date(self):
        self.assertEqual(self.comment.pub_date.strftime('%d-%m-%Y %H:%M:%S'),
                         timezone.now().strftime('%d-%m-%Y %H:%M:%S'))


class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1', age=10)

    def test_user_has_proper_age(self):
        self.assertEqual(self.user.age, 10)

    # TO-DO - make tests for tags
    # def test_user_has_proper_tags(self):
    #     self.assertEqual(, 'tennis')


class TagModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.tag = Tag.objects.create(name='#hiking')

    def test_tag_has_proper_name(self):
        self.assertEqual(self.tag.name, '#hiking')
