from django.db import models
from django.conf import settings


class Course(models.Model):
    title = models.CharField(max_length=255, unique=True)
    code = models.CharField(max_length=150, unique=True)
    description = models.TextField(blank=True, default="")
    # image = models.ImageField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    start_date = models.DateField(blank=True)
    end_date = models.DateField(blank=True)
    prerequisites = models.ManyToManyField("self", symmetrical=False, blank=True)
    modules = models.ManyToManyField("modules.Module", through="CourseModule", blank=True, related_name="courses")
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="courses")
    tags = models.ManyToManyField("Tag", blank=True, related_name="courses")
    is_template = models.BooleanField(default=False)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=55)


class CourseModule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    module = models.ForeignKey("modules.Module", on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
