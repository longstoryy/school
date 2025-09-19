#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import time
import psycopg2
from psycopg2 import OperationalError as Psycopg2OpError
from django.db.utils import OperationalError


def wait_for_db():
    """Wait for the database to be available."""
    max_retries = 30
    retry_delay = 2  # seconds
    
    print("Waiting for database...")
    for _ in range(max_retries):
        try:
            conn = psycopg2.connect(
                dbname=os.getenv('POSTGRES_DB', 'school_db'),
                user=os.getenv('POSTGRES_USER', 'school_user'),
                password=os.getenv('POSTGRES_PASSWORD', 'school_password'),
                host=os.getenv('POSTGRES_HOST', 'db'),
                port=os.getenv('POSTGRES_PORT', '5432')
            )
            conn.close()
            print("Database is available!")
            return True
        except (Psycopg2OpError, OperationalError) as e:
            print(f"Database is not ready yet. Waiting {retry_delay} seconds...")
            time.sleep(retry_delay)
    
    print("Error: Could not connect to the database after multiple retries.")
    return False


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    try:
        from core import local_settings  # noqa
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.local_settings')
    except ImportError:
        pass
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # If the command is 'runserver' or 'migrate', wait for the database first
    if len(sys.argv) > 1 and sys.argv[1] in ['runserver', 'migrate']:
        if not wait_for_db():
            sys.exit(1)
    
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
