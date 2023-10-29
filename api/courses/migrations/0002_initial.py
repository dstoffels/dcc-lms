# Generated by Django 4.2.6 on 2023-10-29 04:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("courses", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="owner",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="course",
            name="prerequisites",
            field=models.ManyToManyField(blank=True, to="courses.course"),
        ),
        migrations.AddField(
            model_name="course",
            name="tags",
            field=models.ManyToManyField(
                blank=True, related_name="courses", to="courses.tag"
            ),
        ),
    ]
