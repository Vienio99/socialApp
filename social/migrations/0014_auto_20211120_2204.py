# Generated by Django 3.2.5 on 2021-11-20 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0013_auto_20211120_2154'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='followers',
        ),
        migrations.RemoveField(
            model_name='tag',
            name='followers_count',
        ),
        migrations.AddField(
            model_name='post',
            name='comment_count',
            field=models.IntegerField(default='0'),
        ),
    ]
