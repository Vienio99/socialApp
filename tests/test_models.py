from django.test import TestCase
from django.contrib.auth import get_user_model
from social.models import Post
from django.utils import timezone, dateformat

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
