# Generated by Django 4.2.19 on 2025-03-21 14:47

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_alter_profile_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=cloudinary.models.CloudinaryField(default='profile_ozflyd', max_length=255, verbose_name='image'),
        ),
    ]
