# Local development settings
from .settings import *

# Use SQLite for local development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Disable debug in production
DEBUG = True

# Allow all hosts for local development
ALLOWED_HOSTS = ['*']

# Disable SSL for local development
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
