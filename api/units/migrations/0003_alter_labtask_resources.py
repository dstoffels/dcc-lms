# Generated by Django 4.2.6 on 2023-10-26 04:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("units", "0002_alter_lab_due_date_alter_unit_module"),
    ]

    operations = [
        migrations.AlterField(
            model_name="labtask",
            name="resources",
            field=models.TextField(blank=True, default=""),
        ),
    ]
