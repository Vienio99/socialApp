# Generated by Django 3.2.5 on 2021-10-05 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_customuser_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]