# Generated by Django 4.2.6 on 2023-10-29 04:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("tracks", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="cohort",
            name="students",
            field=models.ManyToManyField(
                blank=True,
                limit_choices_to=models.Q(("role__name", "Student")),
                related_name="courses",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="cohort",
            name="track",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="cohorts",
                to="tracks.track",
            ),
        ),
    ]