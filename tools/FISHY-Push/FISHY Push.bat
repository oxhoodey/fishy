@echo off
rem Double-click to open the FISHY PUSH window.
start "" powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0fishy-push.ps1"
