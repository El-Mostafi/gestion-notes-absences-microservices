@echo off
echo ========================================
echo  Tests des Endpoints - TP3
echo ========================================
echo.

echo Assurez-vous que l'application est demarree sur http://localhost:8080
echo.
pause

echo.
echo [TEST 1] GET - Tous les etudiants
echo ========================================
curl -X GET http://localhost:8080/api/etudiants
echo.
echo.
pause

echo.
echo [TEST 2] GET - Taux d'absence de l'etudiant 1
echo ========================================
curl -X GET http://localhost:8080/api/etudiants/1/taux-absence
echo.
echo.
pause

echo.
echo [TEST 3] GET - Blacklist (taux >= 50%%)
echo ========================================
curl -X GET "http://localhost:8080/api/etudiants/blacklist?tauxSeuil=50"
echo.
echo.
pause

echo.
echo [TEST 4] POST - Ajouter un nouvel etudiant
echo ========================================
curl -X POST http://localhost:8080/api/etudiants ^
  -H "Content-Type: application/json" ^
  -d "{\"nom\":\"Nouveau\",\"prenom\":\"Etudiant\",\"cne\":\"CNE999\",\"niveau\":\"L1\",\"heuresAbsence\":400}"
echo.
echo.
pause

echo.
echo [TEST 5] GET - Verifier l'etudiant ajoute
echo ========================================
curl -X GET http://localhost:8080/api/etudiants
echo.
echo.
pause

echo.
echo [TEST 6] PUT - Mettre a jour l'etudiant 1
echo ========================================
curl -X PUT http://localhost:8080/api/etudiants/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"nom\":\"Alami\",\"prenom\":\"Ahmed\",\"cne\":\"CNE001\",\"niveau\":\"M1\",\"heuresAbsence\":300}"
echo.
echo.
pause

echo.
echo [TEST 7] GET - Verifier la mise a jour
echo ========================================
curl -X GET http://localhost:8080/api/etudiants/1
echo.
echo.
pause

echo.
echo [TEST 8] DELETE - Supprimer l'etudiant 9 (celui ajoute)
echo ========================================
curl -X DELETE http://localhost:8080/api/etudiants/9
echo.
echo.
pause

echo.
echo [TEST 9] GET - Verifier la suppression
echo ========================================
curl -X GET http://localhost:8080/api/etudiants
echo.
echo.

echo.
echo ========================================
echo  Tous les tests sont termines !
echo ========================================
pause

