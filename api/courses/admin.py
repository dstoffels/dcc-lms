from django.contrib import admin
from .models import Course, Tag

admin.site.register(Course)
admin.site.register(Tag)
# admin.site.register(CourseModule)