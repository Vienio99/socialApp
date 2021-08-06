from django.db import models
from users.models import CustomUser
from django.utils import timezone


# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=30)
    text = models.TextField()
    pub_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
    )
    pub_date = models.DateTimeField(default=timezone.now)
