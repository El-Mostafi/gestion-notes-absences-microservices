@echo off
echo ========================================
echo TEST DE L'API GATEWAY
echo ========================================
echo.
echo Ce script va tester les endpoints du Gateway
echo.

echo [1] Test de la page d'accueil du Gateway...
curl -s http://localhost:8080/
echo.
echo.

echo [2] Test de la liste des services...
curl -s http://localhost:8080/services
echo.
echo.

echo [3] Test du health check...
curl -s http://localhost:8080/actuator/health
echo.
echo.

echo [4] Test des routes configurees...
curl -s http://localhost:8080/actuator/gateway/routes
echo.
echo.

echo ========================================
echo Tests termines!
echo ========================================
echo.
echo Si vous voyez des donnees JSON ci-dessus, le Gateway fonctionne!
echo.
pause

