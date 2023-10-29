from django.db import models


class Module(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    course_hours = models.IntegerField(default=0, blank=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"
