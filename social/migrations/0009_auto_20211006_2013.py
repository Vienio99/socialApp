# Generated by Django 3.2.5 on 2021-10-06 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0008_auto_20211006_2010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='likes',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='likes',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]