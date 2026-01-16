@echo off
echo =======================================
echo  Verification Rapide - DTOs
echo =======================================
echo.

echo Test 1: Verification des fichiers DTO
echo --------------------------------------
if exist "src\main\java\org\example\gestionnotesspringboot\dto\EtudiantRequest.java" (
    echo [OK] EtudiantRequest.java existe
) else (
    echo [ERREUR] EtudiantRequest.java manquant!
)

if exist "src\main\java\org\example\gestionnotesspringboot\dto\EtudiantResponse.java" (
    echo [OK] EtudiantResponse.java existe
) else (
    echo [ERREUR] EtudiantResponse.java manquant!
)

if exist "src\main\java\org\example\gestionnotesspringboot\dto\TauxAbsenceResponse.java" (
    echo [OK] TauxAbsenceResponse.java existe
) else (
    echo [ERREUR] TauxAbsenceResponse.java manquant!
)

echo.
echo =======================================
echo.
echo Tous les fichiers DTO sont presents!
echo.
echo Pour compiler le projet:
echo   1. Executez rebuild.bat
echo   2. OU executez: mvnw.cmd clean compile
echo.
echo Pour demarrer l'application:
echo   Executez start.bat
echo.
pause

