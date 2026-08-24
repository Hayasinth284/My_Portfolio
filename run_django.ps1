# PowerShell Runner for Django Developer Portfolio
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Launching Hayasinth M Portfolio (Python + Django 5)" -ForegroundColor Cyan
Write-Host "  College: Jeppiaar Engineering College (BE CSE 4th Year)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

Set-Location -Path $PSScriptRoot

Write-Host "`n[1/3] Running database migrations..." -ForegroundColor Yellow
python manage.py makemigrations
python manage.py migrate

Write-Host "`n[2/3] Seeding projects, skills, and profile to SQLite..." -ForegroundColor Yellow
python populate_db.py

Write-Host "`n[3/3] Starting Django Server at http://127.0.0.1:8000" -ForegroundColor Green
python manage.py runserver 127.0.0.1:8000
