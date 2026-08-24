@echo off
echo ========================================================
echo   Launching Hayasinth M Developer Portfolio
echo   College: Jeppiaar Engineering College (BE CSE 4th Year)
echo ========================================================
cd /d "%~dp0"

echo Opening browser at http://localhost:5000 ...
start "" http://localhost:5000

echo Starting Portfolio Server on http://localhost:5000 ...
".tools\node-v20.18.0-win-x64\node.exe" server/server.js
pause

