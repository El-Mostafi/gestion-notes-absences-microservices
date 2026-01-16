# Système de Gestion d'Absentéisme des Étudiants

Application Spring Boot REST API pour gérer l'absentéisme des étudiants indisciplinés et créer des listes noires basées sur les taux d'absence.

## 📋 Prérequis

- Java 21+
- MySQL 8.0+
- Maven 3.6+

## 🗄️ Configuration de la Base de Données

1. Créer une base de données MySQL (ou elle sera créée automatiquement) :
```sql
CREATE DATABASE gestion_notes_db;
```

2. Configurer les identifiants MySQL dans `src/main/resources/application.properties` :
```properties
spring.datasource.username=root
spring.datasource.password=votre_mot_de_passe
```

## 🚀 Démarrage de l'Application

```bash
mvnw spring-boot:run
```

L'application démarrera sur `http://localhost:8080`

## 📡 API Endpoints

### 1. ADD - Ajouter un étudiant
**POST** `/api/etudiants`

**Body (JSON):**
```json
{
  "nom": "Alami",
  "prenom": "Ahmed",
  "cne": "CNE001",
  "niveau": "L3",
  "heuresAbsence": 250
}
```

**Réponse:**
```json
{
  "id": 1,
  "nom": "Alami",
  "prenom": "Ahmed",
  "cne": "CNE001",
  "niveau": "L3",
  "heuresAbsence": 250,
  "tauxAbsence": 50.0
}
```

---

### 2. READ - Obtenir le taux d'absence d'un étudiant
**GET** `/api/etudiants/{id}/taux-absence`

**Exemple:** `GET /api/etudiants/1/taux-absence`

**Réponse:**
```json
{
  "id": 1,
  "nom": "Alami",
  "prenom": "Ahmed",
  "cne": "CNE001",
  "heuresAbsence": 250,
  "tauxAbsence": 50.0
}
```

---

### 3. READ - Obtenir un étudiant par ID
**GET** `/api/etudiants/{id}`

**Exemple:** `GET /api/etudiants/1`

---

### 4. READ - Obtenir tous les étudiants
**GET** `/api/etudiants`

**Réponse:**
```json
[
  {
    "id": 1,
    "nom": "Alami",
    "prenom": "Ahmed",
    "cne": "CNE001",
    "niveau": "L3",
    "heuresAbsence": 250,
    "tauxAbsence": 50.0
  },
  ...
]
```

---

### 5. UPDATE - Mettre à jour un étudiant
**PUT** `/api/etudiants/{id}`

**Body (JSON):**
```json
{
  "nom": "Alami",
  "prenom": "Ahmed",
  "cne": "CNE001",
  "niveau": "M1",
  "heuresAbsence": 300
}
```

---

### 6. DELETE - Supprimer un étudiant
**DELETE** `/api/etudiants/{id}`

**Exemple:** `DELETE /api/etudiants/1`

**Réponse:** 204 No Content

---

### 7. BLACKLIST CREATE - Créer une liste noire
**GET** `/api/etudiants/blacklist?tauxSeuil=50.0`

Cette opération retourne tous les étudiants ayant un taux d'absentéisme supérieur ou égal au seuil donné.
La liste est triée par :
1. Nombre d'heures d'absence (décroissant)
2. Nom (ordre alphabétique) en cas d'égalité

**Paramètres:**
- `tauxSeuil` (optionnel, défaut: 50.0) : Le taux d'absence minimum en pourcentage

**Exemple:** `GET /api/etudiants/blacklist?tauxSeuil=50`

**Réponse:**
```json
[
  {
    "id": 4,
    "nom": "Darif",
    "prenom": "Sara",
    "cne": "CNE004",
    "niveau": "L3",
    "heuresAbsence": 450,
    "tauxAbsence": 90.0
  },
  {
    "id": 7,
    "nom": "Ghali",
    "prenom": "Hassan",
    "cne": "CNE007",
    "niveau": "L3",
    "heuresAbsence": 350,
    "tauxAbsence": 70.0
  }
]
```

---

## 📊 Calcul du Taux d'Absence

Le taux d'absence est calculé selon la formule :
```
Taux d'absence (%) = (Heures d'absence / 500) × 100
```

Où 500 représente le nombre total d'heures dans une année académique.

---

## 🧪 Tests avec cURL

### Ajouter un étudiant
```bash
curl -X POST http://localhost:8080/api/etudiants \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Test\",\"prenom\":\"Etudiant\",\"cne\":\"CNE999\",\"niveau\":\"L1\",\"heuresAbsence\":100}"
```

### Obtenir le taux d'absence
```bash
curl http://localhost:8080/api/etudiants/1/taux-absence
```

### Créer une blacklist
```bash
curl http://localhost:8080/api/etudiants/blacklist?tauxSeuil=50
```

### Mettre à jour un étudiant
```bash
curl -X PUT http://localhost:8080/api/etudiants/1 \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Alami\",\"prenom\":\"Ahmed\",\"cne\":\"CNE001\",\"niveau\":\"M1\",\"heuresAbsence\":300}"
```

### Supprimer un étudiant
```bash
curl -X DELETE http://localhost:8080/api/etudiants/1
```

---

## 🧪 Tests avec Postman

Importez la collection Postman en créant des requêtes pour chaque endpoint ci-dessus.

---

## 📁 Structure du Projet

```
src/main/java/org/example/gestionnotesspringboot/
├── config/
│   └── DataInitializer.java         # Initialisation des données de test
├── controller/
│   └── EtudiantController.java      # Contrôleur REST
├── dto/
│   ├── EtudiantRequest.java         # DTO pour les requêtes
│   ├── EtudiantResponse.java        # DTO pour les réponses
│   └── TauxAbsenceResponse.java     # DTO pour le taux d'absence
├── entities/
│   └── Etudiant.java                # Entité JPA
├── exception/
│   └── GlobalExceptionHandler.java  # Gestion globale des exceptions
├── repositories/
│   └── EtudiantRepository.java      # Repository JPA
└── service/
    └── EtudiantService.java         # Logique métier
```

---

## 📝 Données de Test

L'application initialise automatiquement 8 étudiants de test au démarrage :

| ID | Nom | Prénom | CNE | Niveau | Heures Absence | Taux |
|----|-----|--------|-----|--------|----------------|------|
| 1 | Alami | Ahmed | CNE001 | L3 | 50 | 10% |
| 2 | Benjelloun | Fatima | CNE002 | M1 | 120 | 24% |
| 3 | Chakir | Omar | CNE003 | L2 | 300 | 60% |
| 4 | Darif | Sara | CNE004 | L3 | 450 | 90% |
| 5 | El Amrani | Karim | CNE005 | M2 | 80 | 16% |
| 6 | Fassi | Leila | CNE006 | L1 | 250 | 50% |
| 7 | Ghali | Hassan | CNE007 | L3 | 350 | 70% |
| 8 | Hamidi | Nadia | CNE008 | M1 | 150 | 30% |

---

## 🛠️ Technologies Utilisées

- **Spring Boot 4.0.0**
- **Spring Data JPA**
- **MySQL 8.0**
- **Lombok**
- **Maven**

---

## 📌 Remarques

- Le CNE (Code National Étudiant) est unique pour chaque étudiant
- Le taux d'absence est calculé automatiquement
- La blacklist est triée selon le TP : par heures d'absence décroissantes, puis par nom alphabétique
- Toutes les exceptions sont gérées globalement avec des messages d'erreur appropriés

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre du TP3 - Gestion d'Absentéisme des Étudiants

