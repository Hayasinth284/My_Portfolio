@echo off
echo ========================================================
echo   Launching Hayasinth M Portfolio (Python + Django 5)
echo   College: Jeppiaar Engineering College (BE CSE 4th Year)
echo ========================================================
cd /d "%~dp0"

echo [1/3] Applying SQLite database migrations...
python manage.py makemigrations
python manage.py migrate

echo [2/3] Seeding initial projects and skills into SQLite...
python populate_db.py

echo [3/3] Starting Django Development Server on http://127.0.0.1:8000 ...
python manage.py runserver 127.0.0.1:8000
pause
