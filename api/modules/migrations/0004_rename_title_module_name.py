# Generated by Django 4.2.6 on 2023-10-29 21:00

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("modules", "0003_module_is_published"),
    ]

    operations = [
        migrations.RenameField(
            model_name="module",
            old_name="title",
            new_name="name",
        ),
    ]
