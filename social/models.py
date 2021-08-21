from django.db import models
from django.utils import timezone
from social_project import settings
from users.models import CustomUser


# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=30)
    text = models.TextField()
    pub_date = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(null=False, unique=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    text = models.TextField(max_length=5000)
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
    )
    pub_date = models.DateTimeField(default=timezone.now)

