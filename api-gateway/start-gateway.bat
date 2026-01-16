@echo off
echo ========================================
echo Demarrage de l'API Gateway
echo Port: 8080
echo ========================================
cd /d D:\Documents\MicroServices\api-gateway
call mvnw.cmd spring-boot:run
pause

