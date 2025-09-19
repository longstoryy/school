"""
Custom Django management command to wait for the database to be available.
"""
import time
from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError
import psycopg2
from psycopg2 import OperationalError as Psycopg2OpError


class Command(BaseCommand):
    """Django command to pause execution until database is available"""

    def handle(self, *args, **options):
        """Handle the command"""
        self.stdout.write('Waiting for database...')
        db_conn = None
        max_retries = 30
        retry_delay = 2  # seconds

        for _ in range(max_retries):
            try:
                # Try to connect to the database
                db_conn = connections['default']
                db_conn.ensure_connection()
                self.stdout.write(self.style.SUCCESS('Database is available!'))
                return
            except (OperationalError, Psycopg2OpError) as e:
                self.stdout.write(f'Database is not ready yet. Waiting {retry_delay} seconds...')
                time.sleep(retry_delay)

        self.stdout.write(
            self.style.ERROR('Could not connect to the database after multiple retries.')
        )
        raise Exception('Database connection failed')
