"""
Simple URL configuration for core project.
"""
from django.contrib import admin
from django.urls import path

from .views import HealthCheckView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('admin/', admin.site.urls),
]
