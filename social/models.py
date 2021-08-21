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
<<<<<<< HEAD
=======
    slug = models.SlugField(null=False, unique=True)
>>>>>>> parent of c869722... useless commit

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
    )
    pub_date = models.DateTimeField(default=timezone.now)
<<<<<<< HEAD
=======

>>>>>>> parent of c869722... useless commit
