# Generated by Django 3.2.5 on 2021-11-20 22:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0014_auto_20211120_2204'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='like_count',
            new_name='likes_count',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='like_count',
            new_name='likes_count',
        ),
    ]
