# Generated by Django 4.2.6 on 2023-11-15 20:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0005_delete_coursemoduledrip"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="tags",
            field=models.ManyToManyField(blank=True, to="courses.tag"),
        ),
    ]
