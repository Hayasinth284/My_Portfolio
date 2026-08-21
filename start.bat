@echo off
echo Starting Hayasinth M Portfolio Server...
cd /d %~dp0
.tools\node-v20.18.0-win-x64\node.exe server/server.js
pause
