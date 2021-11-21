from django.contrib.auth import get_user_model
from django.db import models
from social_project import settings


# Create your models here.

# TO-DO - make slugs for post field and use them as a link in react
# TO-DO - make tags field optional
# TO-DO - make minimum length of text field of 150 characters


class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='post_like',
        default=None,
        blank=True
    )
    likes_count = models.IntegerField(default=0)
    tags = models.ManyToManyField(
        'Tag',
        blank=True
    )
    comments_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-pub_date']

    def __str__(self):
        return self.text[:10]


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='comment_like',
        default=None,
        blank=True
    )
    likes_count = models.IntegerField(default=0)

    def __str__(self):
        return self.text[:10]


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
