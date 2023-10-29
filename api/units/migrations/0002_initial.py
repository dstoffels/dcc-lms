# Generated by Django 4.2.6 on 2023-10-29 04:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("units", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="completedlabtask",
            name="student",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="completedlabtask",
            name="task",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="units.labtask"
            ),
        ),
        migrations.AddField(
            model_name="labtask",
            name="lab",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="tasks",
                to="units.lab",
            ),
        ),
    ]
