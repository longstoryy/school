#!/usr/bin/env python
import os
import sys
import django

# Add the backend directory to the Python path
sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User
from django.contrib.auth.hashers import make_password

# Create test users for each role
users_data = [
    {'email': 'student@test.com', 'user_type': 'STUDENT', 'first_name': 'John', 'last_name': 'Student'},
    {'email': 'teacher@test.com', 'user_type': 'TEACHER', 'first_name': 'Jane', 'last_name': 'Teacher'},
    {'email': 'admin@test.com', 'user_type': 'ADMIN', 'first_name': 'Bob', 'last_name': 'Admin'},
    {'email': 'parent@test.com', 'user_type': 'PARENT', 'first_name': 'Mary', 'last_name': 'Parent'}
]

print("Creating test users...")

for user_data in users_data:
    user, created = User.objects.get_or_create(
        email=user_data['email'],
        defaults={
            'user_type': user_data['user_type'],
            'first_name': user_data['first_name'],
            'last_name': user_data['last_name'],
            'is_active': True,
            'is_verified': True,
            'password': make_password('test123')
        }
    )
    if created:
        print(f'✅ Created {user_data["user_type"]}: {user_data["email"]} / test123')
    else:
        # Update existing user
        user.user_type = user_data['user_type']
        user.first_name = user_data['first_name']
        user.last_name = user_data['last_name']
        user.set_password('test123')
        user.save()
        print(f'🔄 Updated {user_data["user_type"]}: {user_data["email"]} / test123')

print("\nTest users ready! Password for all: test123")
