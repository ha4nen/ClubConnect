# Generated by Django 5.0 on 2024-05-05 17:14

import datetime
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0026_rejections_edit_event'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EditPost',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('eventtitle', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='post_images')),
                ('postdescription', models.TextField()),
                ('created_at', models.DateTimeField(default=datetime.datetime.now)),
                ('approved', models.BooleanField(default=False, verbose_name='Approved')),
                ('rejected', models.BooleanField(default=False, verbose_name='Rejected')),
                ('clubmanager', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='posts_managed_edit', to=settings.AUTH_USER_MODEL)),
                ('clubname', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts_edit', to='pages.createclub')),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='edit_post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='original_post', to='pages.editpost'),
        ),
    ]