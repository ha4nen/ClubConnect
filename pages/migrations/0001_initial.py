# Generated by Django 5.0 on 2024-04-20 10:36

import datetime
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EventActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clubmanager', models.CharField(max_length=100)),
                ('clubvicemanager', models.CharField(max_length=100)),
                ('clubname', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('eventtitle', models.CharField(max_length=100)),
                ('categories', models.CharField(max_length=100)),
                ('event_image', models.ImageField(upload_to='event_images')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('location', models.CharField(max_length=100)),
                ('phonenumber', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('clubmanager', models.CharField(max_length=100)),
                ('clubvicemanager', models.CharField(max_length=100)),
                ('clubname', models.CharField(max_length=100)),
                ('phonenumber1', models.IntegerField()),
                ('eventtitle', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='post_images')),
                ('postdescription', models.TextField()),
                ('created_at', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='clubProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profileimg', models.ImageField(default='blank-profile-picture.png', upload_to='profile_images')),
                ('profileimg2', models.ImageField(default='blank-profile-picture.png', upload_to='profile_images2')),
                ('id_user', models.IntegerField()),
                ('headline', models.CharField(max_length=300)),
                ('location', models.CharField(blank=True, max_length=100)),
                ('clubmanager', models.CharField(max_length=100)),
                ('clubvicemanager', models.CharField(max_length=100)),
                ('phonenumber1', models.IntegerField()),
                ('phonenumber2', models.IntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('category', models.CharField(max_length=100)),
                ('clubvision', models.TextField()),
                ('clubdescription', models.TextField()),
                ('clubname', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_as_clubname', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
