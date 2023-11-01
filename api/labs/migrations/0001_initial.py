# Generated by Django 4.2.6 on 2023-10-31 01:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("units", "0008_remove_lab_unittype_ptr_remove_labtask_lab_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Lab",
            fields=[
                (
                    "unittype_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="units.unittype",
                    ),
                ),
                ("due_date", models.DateField(blank=True, null=True)),
                ("points", models.PositiveIntegerField(default=0)),
            ],
            bases=("units.unittype",),
        ),
        migrations.CreateModel(
            name="LabTask",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("order", models.PositiveIntegerField(blank=True)),
                ("description", models.TextField()),
                ("resources", models.TextField(blank=True, default="")),
                ("language", models.CharField(max_length=255)),
                ("required", models.BooleanField(default=True)),
                (
                    "lab",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tasks",
                        to="labs.lab",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="LabTaskAttempt",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("code", models.TextField()),
                ("assistant_msgs", models.JSONField(default=list)),
                ("submitted_at", models.DateTimeField(auto_now_add=True)),
                ("is_complete", models.BooleanField(default=False)),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="lab_task_attempts",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "task",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="labs.labtask"
                    ),
                ),
            ],
        ),
    ]