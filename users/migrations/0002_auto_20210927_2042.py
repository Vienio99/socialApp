# Generated by Django 3.2.5 on 2021-09-27 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0002_auto_20210925_2014'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='hobby',
        ),
        migrations.AddField(
            model_name='customuser',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='customuser',
            name='tags',
            field=models.ManyToManyField(blank=True, to='social.Tag'),
        ),
    ]