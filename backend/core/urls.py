"""
URL configuration for core project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from accounts.health_views import health_check
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenRefreshView
from .views import HealthCheckView

def home(request):
    return JsonResponse({
        'message': 'Welcome to the School Management System API',
        'endpoints': {
            'health_check': '/health/',
            'admin': '/admin/',
            'api_docs': '/api/docs/',
            'auth': {
                'register': '/api/auth/register/',
                'login': '/api/auth/token/',
                'refresh_token': '/api/auth/token/refresh/',
                'change_password': '/api/auth/change-password/',
                'reset_password': '/api/auth/reset-password/request/'
            },
            'user': {
                'profile': '/api/users/me/',
                'profile_update': '/api/users/profile/'
            }
        },
        'status': 'operational'
    })

# API URL patterns
api_patterns = [
    # Authentication
    path('auth/', include('accounts.urls')),
    # Add other app URLs here
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('health/', health_check, name='health_check'),
    path('api/auth/', include('accounts.urls')),
    path('api/', include(api_patterns)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
