@echo off
echo ========================================
echo Demarrage du Service Gestion Notes
echo Port: 8082
echo ========================================
cd /d D:\Documents\MicroServices\gestionNotesSpringBoot
call mvnw.cmd spring-boot:run
pause
@echo off
echo ========================================
echo Demarrage du Service Gestion Absence
echo Port: 8081
echo ========================================
cd /d D:\Documents\MicroServices\gestionAbsenceSpringBoot
call mvnw.cmd spring-boot:run
pause

