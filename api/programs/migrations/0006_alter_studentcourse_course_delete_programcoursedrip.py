# Generated by Django 4.2.6 on 2023-11-14 00:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("cohorts", "0005_cohortcourse_cohortmodule"),
        ("programs", "0005_studentcourse"),
    ]

    operations = [
        migrations.AlterField(
            model_name="studentcourse",
            name="course",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="cohorts.cohortcourse"
            ),
        ),
        migrations.DeleteModel(
            name="ProgramCourseDrip",
        ),
    ]
