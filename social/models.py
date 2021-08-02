from django.db import models
from users.models import CustomUser

# Create your models here.

class Post(models.Model):
  author = models.ForeignKey(
    CustomUser,
    on_delete=models.CASCADE,
  )
  pub_date = models.DateField()
  title = models.CharField(max_length=30)
  text = models.TextField()