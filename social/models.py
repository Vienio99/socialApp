from django.db import models
from social_project import settings


# Create your models here.

# TO-DO: make slugs for post field and use them as a link in react

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0, blank=True, null=True)
    tags = models.ManyToManyField(
        'Tag',
        blank=True
    )

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
    likes = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return self.text[:10]


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
