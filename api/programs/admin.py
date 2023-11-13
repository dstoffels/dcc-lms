from django.contrib import admin
from .models import Program, ProgramCourse


class TrackCourseInline(admin.TabularInline):
    model = ProgramCourse
    extra = 1


class TrackAdmin(admin.ModelAdmin):
    inlines = [TrackCourseInline]


admin.site.register(Program, TrackAdmin)
