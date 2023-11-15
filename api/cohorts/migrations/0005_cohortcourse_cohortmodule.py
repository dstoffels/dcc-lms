# Generated by Django 4.2.6 on 2023-11-14 00:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("programs", "0005_studentcourse"),
        ("courses", "0005_delete_coursemoduledrip"),
        ("cohorts", "0004_rename_track_cohort_program"),
    ]

    operations = [
        migrations.CreateModel(
            name="CohortCourse",
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
                ("date", models.DateField(blank=True, null=True)),
                ("override", models.BooleanField(default=False)),
                (
                    "cohort",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="cohorts.cohort"
                    ),
                ),
                (
                    "program_course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="programs.programcourse",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CohortModule",
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
                ("date", models.DateField(blank=True, null=True)),
                ("override", models.BooleanField(default=False)),
                (
                    "cohort_course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="cohorts.cohortcourse",
                    ),
                ),
                (
                    "course_module",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="courses.coursemodule",
                    ),
                ),
            ],
        ),
    ]
