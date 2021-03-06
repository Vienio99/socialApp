# Generated by Django 3.2.5 on 2021-11-20 21:54

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social', '0012_auto_20211006_2113'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='like_count',
            field=models.IntegerField(default='0'),
        ),
        migrations.AddField(
            model_name='post',
            name='like_count',
            field=models.IntegerField(default='0'),
        ),
        migrations.AddField(
            model_name='tag',
            name='followers',
            field=models.ManyToManyField(blank=True, default=None, related_name='tag_followers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='tag',
            name='followers_count',
            field=models.IntegerField(default='0'),
        ),
        migrations.RemoveField(
            model_name='comment',
            name='likes',
        ),
        migrations.AddField(
            model_name='comment',
            name='likes',
            field=models.ManyToManyField(blank=True, default=None, related_name='comment_like', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.ManyToManyField(blank=True, default=None, related_name='post_like', to=settings.AUTH_USER_MODEL),
        ),
    ]
