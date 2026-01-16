@echo off
echo ========================================
echo  Nettoyage et Recompilation du Projet
echo ========================================
echo.

echo [1/2] Nettoyage complet...
call mvnw.cmd clean
if errorlevel 1 (
    echo ERREUR: Le nettoyage a echoue
    pause
    exit /b 1
)
echo.

echo [2/2] Compilation...
call mvnw.cmd compile
if errorlevel 1 (
    echo ERREUR: La compilation a echoue
    pause
    exit /b 1
)
echo.

echo ========================================
echo  Compilation reussie !
echo ========================================
echo.
echo Le projet est pret a etre demarre.
echo Executez start.bat pour lancer l'application.
echo.
pause

