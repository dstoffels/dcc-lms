from django.contrib import admin
from .models import ExternalURL, Unit


admin.site.register(Unit)
admin.site.register(ExternalURL)
