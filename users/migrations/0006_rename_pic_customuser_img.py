# Generated by Django 3.2.5 on 2021-12-06 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_rename_img_customuser_pic'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='pic',
            new_name='img',
        ),
    ]
