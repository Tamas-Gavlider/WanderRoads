# Generated by Django 5.1.5 on 2025-01-28 13:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel_buddy', '0004_alter_travelbuddy_options_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='travelbuddy',
            options={'ordering': ['-created_at']},
        ),
        migrations.RenameField(
            model_name='travelbuddy',
            old_name='requested_at',
            new_name='created_at',
        ),
        migrations.RemoveField(
            model_name='travelbuddy',
            name='confirmed_at',
        ),
        migrations.RemoveField(
            model_name='travelbuddy',
            name='status',
        ),
        migrations.AlterField(
            model_name='travelbuddy',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='travel_buddies_initiated', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='travelbuddy',
            name='travel_buddy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='travel_buddies_received', to=settings.AUTH_USER_MODEL),
        ),
    ]
