from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

# TO-DO - delete hobby field and add tags instead
class CustomUser(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)
    hobby = models.CharField(blank=True, max_length=50)
