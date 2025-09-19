from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.core.cache import cache

@api_view(['GET'])
def health_check(request):
    """
    Simple health check endpoint to verify API is working
    """
    try:
        # Check database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_status = True
    except Exception:
        db_status = False
    
    # Check Redis connection
    try:
        cache.set('health_check', 'ok', 10)
        redis_status = cache.get('health_check') == 'ok'
    except Exception:
        redis_status = False
    
    return Response({
        'status': 'ok',
        'checks': {
            'database': db_status,
            'redis': redis_status
        }
    }, status=status.HTTP_200_OK)
