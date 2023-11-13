from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth", include("users.urls")),
    path("programs", include("programs.urls")),
    path("courses", include("courses.urls")),
    path("modules", include("modules.urls")),
    path("units", include("units.urls")),
    path("labs", include("labs.urls")),
]
