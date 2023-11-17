# Generated by Django 4.2.6 on 2023-11-15 20:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("cohorts", "0005_cohortcourse_cohortmodule"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cohort",
            name="students",
            field=models.ManyToManyField(
                blank=True, related_name="cohorts", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]