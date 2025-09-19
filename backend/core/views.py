"""
Views for the core app.
"""
import os
from django.http import JsonResponse
from django.views import View
from django.conf import settings
from django.db import connection
import redis

class HealthCheckView(View):
    """
    Health check endpoint for monitoring the service status.
    """
    def get(self, request, *args, **kwargs):
        """
        Check the health of the service and its dependencies.
        """
        # Default response
        status = 200
        checks = {
            'database': self._check_database(),
            'redis': self._check_redis(),
        }

        # If any check failed, set status to 503
        if not all(checks.values()):
            status = 503

        return JsonResponse(
            {
                'status': 'ok' if status == 200 else 'error',
                'checks': checks,
            },
            status=status
        )

    def _check_database(self):
        """Check if the database is available."""
        try:
            connection.ensure_connection()
            return True
        except Exception:
            return False

    def _check_redis(self):
        """Check if Redis is available."""
        try:
            redis_conn = redis.Redis(
                host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                db=settings.REDIS_DB,
                password=settings.REDIS_PASSWORD,
                socket_connect_timeout=1,
                socket_keepalive=True,
                retry_on_timeout=True
            )
            return redis_conn.ping()
        except Exception as e:
            print(f"Redis connection error: {str(e)}")
            return False
