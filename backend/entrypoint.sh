#!/bin/bash

set -x  # Print commands and their arguments as they are executed
set -e  # Exit immediately if a command exits with a non-zero status

# Debug information
echo "=== Starting entrypoint.sh ==="
echo "Current directory: $(pwd)"
echo "Python version: $(python --version)"
echo "Django version: $(python -m django --version)"

# Wait for the database to be ready
echo "=== Waiting for database... ==="
until python manage.py wait_for_db; do
    echo "Database is unavailable - sleeping"
    sleep 2
done

echo "=== Database is available ==="

# Run migrations
echo "=== Running migrations... ==="
python manage.py migrate

# Collect static files
echo "=== Collecting static files... ==="
python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "=== Checking for superuser... ==="
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='admin@example.com').exists():
    User.objects.create_superuser(email='admin@example.com', password='admin')
    print('Superuser created')
else:
    print('Superuser already exists')
"

# Start the server in the foreground
echo "=== Starting server... ==="
# Use exec to replace the current process with the Django server
exec python manage.py runserver 0.0.0.0:8000
