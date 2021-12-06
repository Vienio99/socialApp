from django.db import models
from django.contrib.auth.models import AbstractUser
from social.models import Tag


def upload_path(instance, filename):
    return '/'.join(['avatars', filename])


# TO-DO - make images work
class CustomUser(AbstractUser):
    # default is set anyway in serializer but it is here just to be sure
    img = models.ImageField(null=True, blank=True, upload_to=upload_path, default='avatars/default.jpg')
    age = models.PositiveIntegerField(null=True, blank=True)
    tags = models.ManyToManyField(
        Tag,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
