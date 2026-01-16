@echo off
echo ========================================
echo  Gestion Absenteisme - Spring Boot App
echo ========================================
echo.

echo [1/3] Verification de Java...
java -version
if errorlevel 1 (
    echo ERREUR: Java n'est pas installe ou pas dans le PATH
    pause
    exit /b 1
)
echo.

echo [2/3] Compilation du projet...
call mvnw.cmd clean package -DskipTests
if errorlevel 1 (
    echo ERREUR: La compilation a echoue
    pause
    exit /b 1
)
echo.

echo [3/3] Demarrage de l'application...
echo.
echo L'application va demarrer sur http://localhost:8080
echo.
echo Endpoints disponibles:
echo - GET  http://localhost:8080/api/etudiants
echo - POST http://localhost:8080/api/etudiants
echo - GET  http://localhost:8080/api/etudiants/blacklist?tauxSeuil=50
echo.
echo Appuyez sur Ctrl+C pour arreter l'application
echo.

call mvnw.cmd spring-boot:run

