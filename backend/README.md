# School Management System - Backend

## Setup

1. **Environment Variables**
   Copy `.env.example` to `.env` and update the values as needed.

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Database Migrations**
   ```bash
   python manage.py migrate
   ```

4. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

5. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

## API Documentation

- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/

## Development

- **Linting**: `pylint **/*.py`
- **Formatting**: `black .`
- **Sort Imports**: `isort .`

## Deployment

For production, use Gunicorn with Nginx as a reverse proxy.
