from django.contrib import admin
from .models import Track, TrackCourse


class TrackCourseInline(admin.TabularInline):
    model = TrackCourse
    extra = 1


class TrackAdmin(admin.ModelAdmin):
    inlines = [TrackCourseInline]


admin.site.register(Track, TrackAdmin)
