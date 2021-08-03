from django.db import models
from users.models import CustomUser

# Create your models here.

class Post(models.Model):
  title = models.CharField(max_length=30)
  author = models.ForeignKey(
    CustomUser,
    on_delete=models.CASCADE,
  )
  text = models.TextField()
  pub_date = models.DateField()
