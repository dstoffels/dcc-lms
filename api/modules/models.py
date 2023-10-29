from django.db import models


class Module(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    course_hours = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return f"{self.title}"
