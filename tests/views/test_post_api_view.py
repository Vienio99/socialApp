from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from api.v1.post.serializer import PostSerializer
from social.models import Post, Tag

User = get_user_model()

# TO-DO - divide tests


class PostListApiViewTest(APITestCase):
    post = None
    tag = None
    user = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.notAuthor = User.objects.create_user(username='notAuthor', password='123')
        cls.tag = Tag.objects.create(name='#running')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.post.tags.set([cls.tag])
        cls.post2 = Post.objects.create(author=cls.user, text='Hello girls')

    def test_can_browse_all_posts(self):
        response = self.client.get('/api/v1/post/')
        posts = Post.objects.all()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(posts), len(response.data))

        for post in posts:
            self.assertIn(
                PostSerializer(instance=post).data,
                response.data
            )


class PostDetailApiViewTest(APITestCase):
    user = None
    post2 = None

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1', password='secret')
        cls.post = Post.objects.create(author=cls.user, text='Hello guys')
        cls.tag = Tag.objects.create(name='#hiking')

    def test_can_read_a_specific_post(self):
        response = self.client.get(f'/api/v1/post/{self.post.pk}')
        self.assertEqual(response.status_code, 200)

        self.assertEquals(
            PostSerializer(instance=self.post).data,
            response.data
        )

    def test_cant_read_post_that_doesnt_exist(self):
        response = self.client.get('/api/v1/post/2')
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_his_post(self):
        self.client.login(username='user1', password='secret')

        response = self.client.put(f'/api/v1/post/{self.post.pk}', {'author': self.user.pk,
                                                                    'text': 'New fancy text',
                                                                    'tags': [{'name': '#hiking'}, {'name': '#driving'}]
                                                                    })
        self.assertEqual(response.status_code, 200)
        # Additional check if the post is really updated
        updatedPost = Post.objects.get(text='New fancy text')
        updatedPostGetRequest = self.client.get(f'/api/v1/post/{updatedPost.pk}')
        self.assertEqual(updatedPostGetRequest.data['text'], 'New fancy text')
        self.assertEqual(updatedPostGetRequest.data['tags'][0]['name'], '#hiking')
        self.assertEqual(updatedPostGetRequest.data['tags'][1]['name'], '#driving')

    def test_only_author_can_update_his_post(self):
        self.client.login(username='notAuthor', password='123')
        response = self.client.put(f'/api/v1/post/{self.post.pk}', {'author': self.user.pk,
                                                                    'text': 'Not hello'})
        self.assertEqual(response.status_code, 403)

    def test_user_can_delete_his_post(self):
        self.client.login(username='user1', password='secret')
        response = self.client.delete(f'/api/v1/post/{self.post.pk}')
        self.assertEqual(response.status_code, 204)

    def test_can_create_new_post(self):
        data = {
            'author': self.user.pk,
            'text': 'Hello boys',
            'tags': [{'name': '#walking'}, {'name': '#football'}]
        }
        response = self.client.post('/api/v1/post/', data)
        print(response.content)
        newPost = Post.objects.get(text='Hello boys')
        newPostGetResponse = self.client.get(f'/api/v1/post/{newPost.pk}')

        self.assertEqual(newPostGetResponse.status_code, 200)
        self.assertEqual(newPostGetResponse.data['text'], 'Hello boys')
        self.assertEqual(newPostGetResponse.data['likes'], 0)
        self.assertEqual(newPostGetResponse.data['tags'][0]['name'], '#walking')
        self.assertEqual(newPostGetResponse.data['tags'][1]['name'], '#football')

    def test_created_post_has_proper_pub_date(self):
        response = self.client.get(f'/api/v1/post/{self.post.pk}')
        self.assertEqual(response.data['pub_date'], 'now')

    def test_post_does_not_require_tags(self):
        data = {
            'author': self.user.pk,
            'text': 'Hello boys',
            'tags': []
        }
        response = self.client.post('/api/v1/post/', data)
        self.assertEqual(response.status_code, 201)
    #
    # def test_authenticated_users_can_like_post(self):


