@echo off
echo Starting Django Backend...
cd backend
python manage.py migrate
python manage.py runserver 8000
pause
