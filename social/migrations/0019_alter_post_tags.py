# Generated by Django 3.2.5 on 2021-12-02 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0018_remove_post_comments_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(to='social.Tag'),
        ),
    ]
