# Generated by Django 3.2.5 on 2021-12-06 13:25

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_rename_pic_customuser_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='img',
            field=models.ImageField(blank=True, default='/avatars/default.jpg', null=True, upload_to=users.models.upload_path),
        ),
    ]
