from django.test import TestCase
from api.v1.post.serializer import PostSerializer
from social.models import Post, Tag
from django.contrib.auth import get_user_model

User = get_user_model()


class PostSerializerTest(TestCase):
    tag = None
    user = None
    post = None
    post_attributes = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.post_attributes = {
            'author': cls.user,
            'text': 'Hello boys'
        }

        cls.serializer_data = {
            'author': cls.user,
            'text': 'Hello girls',
            'tags': [{'name': '#running'}, {'name': '#hockey'}]
        }

        cls.post = Post.objects.create(**cls.post_attributes)
        cls.tag = Tag.objects.create(name='#walking')
        cls.post.tags.set([cls.tag])
        cls.serializer = PostSerializer(instance=cls.post)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['id', 'pub_date', 'likes', 'likes_count',
                                            'comments_count', 'author', 'text', 'tags', 'author_img'])

    def test_author_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['author'], self.post_attributes['author'].username)

    def test_text_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['text'], self.post_attributes['text'])

    def test_tags_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['tags'][0]['name'], self.tag.name)
