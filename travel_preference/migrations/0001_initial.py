# Generated by Django 5.1.5 on 2025-01-31 21:56

import django.db.models.deletion
import django_countries.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TravelPreference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('preferred_continents', models.CharField(choices=[('ANY', 'Any Continent'), ('AF', 'Africa'), ('NA', 'North America'), ('OC', 'Oceania'), ('AN', 'Antarctica'), ('AS', 'Asia'), ('EU', 'Europe'), ('SA', 'South America')], default='ANY', max_length=55)),
                ('preferred_countries', django_countries.fields.CountryField(default='Any Country', max_length=55)),
                ('climate', models.CharField(choices=[('ANY', 'Any'), ('HOT', 'Hot'), ('COLD', 'Cold'), ('TROPICAL', 'Tropical'), ('MILD', 'Mild')], default='ANY', max_length=50)),
                ('activity', models.CharField(choices=[('ANY', 'Any'), ('CULTURE', 'Culture & History'), ('NATURE', 'Nature & Wildlife'), ('BEACH', 'Beaches & Islands'), ('ADVENTURE', 'Adventure & Hiking'), ('CITY', 'City & Nightlife'), ('FOOD', 'Food & Culinary')], default='ANY', max_length=255)),
                ('budget', models.CharField(choices=[('ANY', 'Any'), ('LOW', 'Budget-Friendly'), ('MEDIUM', 'Mid-Range'), ('HIGH', 'Luxury')], default='ANY', max_length=55)),
                ('travel_style', models.CharField(choices=[('ANY', 'Any'), ('SOLO', 'Solo Travel'), ('FAMILY', 'Family'), ('BACKPACKING', 'Backpacking'), ('LUXURY', 'Luxury Travel')], default='ANY', max_length=55)),
                ('duration', models.CharField(choices=[('ANY', 'Any'), ('WEEKEND', 'Weekend'), ('ONE_WEEK', '1 Week'), ('TWO_WEEKS', '2 Weeks'), ('MONTH', '1 Month')], default='ANY', max_length=55)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
