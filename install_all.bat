@echo off
set NODE_PATH=%~dp0\.tools\node-v20.18.0-win-x64
set PATH=%NODE_PATH%;%PATH%
echo Installing root packages...
cd /d "%~dp0"
call "%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npm-cli.js" install

echo Installing client packages...
cd /d "%~dp0client"
call "%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npm-cli.js" install

echo All packages installed successfully!
