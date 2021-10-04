from django.db import models
from django.contrib.auth.models import AbstractUser
from social.models import Tag


# TO-DO - make images work
class CustomUser(AbstractUser):
    img = models.ImageField(null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    tags = models.ManyToManyField(
        Tag,
        blank=True
    )
