from django.db import models
from users.models import CustomUser
from django.utils import timezone, dateformat


# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=30)
    author = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    pub_date = models.DateField(timezone.now())


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
    pub_date = models.DateField(timezone.now())
