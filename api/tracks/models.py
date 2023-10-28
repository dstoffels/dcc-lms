from django.db import models


class Track(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    courses = models.ManyToManyField("courses.Course", blank=True, related_name="tracks")
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["last_updated"]
