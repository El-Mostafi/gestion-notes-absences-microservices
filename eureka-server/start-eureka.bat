@echo off
echo ========================================
echo Demarrage du Serveur Eureka
echo ========================================
cd /d D:\Documents\MicroServices\eureka-server
call mvnw.cmd spring-boot:run
pause

