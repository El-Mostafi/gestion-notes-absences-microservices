# Guide de Test du Service Web REST - Gestion des Notes d'Étudiants

## Configuration
- Base de données: H2 (en mémoire)
- URL de l'application: http://localhost:8080
- Console H2: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:etudiantsdb`
  - Username: `sa`
  - Password: (vide)

## Données initiales
L'application initialise automatiquement 7 étudiants:
1. Dupont Jean (15.0, 13.0)
2. Martin Marie (11.0, 14.0)
3. Bernard Pierre (16.0, 15.5)
4. Dubois Sophie (9.0, 10.5)
5. Thomas Luc (13.5, 12.0)
6. Robert Julie (16.0, 17.0)
7. Petit Paul (8.0, 11.0)

---

## Opérations REST disponibles

### 1. **ajouterEtudiant** - Ajouter un nouvel étudiant
**Endpoint:** `POST /api/etudiants/ajouter`

**Description:** Permet d'ajouter un nouvel étudiant. Retourne `true` si réussi, `false` si le nom existe déjà.

**Commande curl:**
```bash
curl -X POST http://localhost:8080/api/etudiants/ajouter ^
  -H "Content-Type: application/json" ^
  -d "{\"nom\":\"Leroy\",\"prenom\":\"Alice\",\"note1\":14.5,\"note2\":15.0}"
```

**Réponse attendue:**
```json
true
```

---

### 2. **getNote** - Obtenir les notes d'un étudiant
**Endpoint:** `GET /api/etudiants/note/{nom}`

**Description:** Fournit les notes associées à un nom d'étudiant.

**Commande curl:**
```bash
curl http://localhost:8080/api/etudiants/note/Dupont
```

**Réponse attendue:**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "note1": 15.0,
  "note2": 13.0
}
```

---

### 3. **getEtudiantsValidant** - Obtenir les étudiants qui ont validé
**Endpoint:** `GET /api/etudiants/validant`

**Description:** Retourne tous les étudiants qui ont validé le module (note1 > 12).

**Commande curl:**
```bash
curl http://localhost:8080/api/etudiants/validant
```

**Réponse attendue:**
```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "note1": 15.0,
    "note2": 13.0
  },
  {
    "id": 3,
    "nom": "Bernard",
    "prenom": "Pierre",
    "note1": 16.0,
    "note2": 15.5
  },
  {
    "id": 5,
    "nom": "Thomas",
    "prenom": "Luc",
    "note1": 13.5,
    "note2": 12.0
  },
  {
    "id": 6,
    "nom": "Robert",
    "prenom": "Julie",
    "note1": 16.0,
    "note2": 17.0
  }
]
```

---

### 4. **getMajorant** - Obtenir les étudiants avec la meilleure première note
**Endpoint:** `GET /api/etudiants/majorant`

**Description:** Retourne les étudiants qui ont obtenu la première note (note1) maximale.

**Commande curl:**
```bash
curl http://localhost:8080/api/etudiants/majorant
```

**Réponse attendue:**
```json
[
  {
    "id": 3,
    "nom": "Bernard",
    "prenom": "Pierre",
    "note1": 16.0,
    "note2": 15.5
  },
  {
    "id": 6,
    "nom": "Robert",
    "prenom": "Julie",
    "note1": 16.0,
    "note2": 17.0
  }
]
```

---

### 5. **getEtudiantTries** - Obtenir les étudiants triés par note
**Endpoint:** `GET /api/etudiants/tries`

**Description:** Retourne tous les étudiants triés selon leur meilleure note (décroissant).
Le premier élément a obtenu la meilleure note, le dernier a obtenu la note la plus faible.

**Commande curl:**
```bash
curl http://localhost:8080/api/etudiants/tries
```

**Réponse attendue:**
```json
[
  {
    "id": 6,
    "nom": "Robert",
    "prenom": "Julie",
    "note1": 16.0,
    "note2": 17.0,
    "meilleureNote": 17.0
  },
  {
    "id": 3,
    "nom": "Bernard",
    "prenom": "Pierre",
    "note1": 16.0,
    "note2": 15.5,
    "meilleureNote": 16.0
  },
  {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "note1": 15.0,
    "note2": 13.0,
    "meilleureNote": 15.0
  },
  {
    "id": 2,
    "nom": "Martin",
    "prenom": "Marie",
    "note1": 11.0,
    "note2": 14.0,
    "meilleureNote": 14.0
  },
  {
    "id": 5,
    "nom": "Thomas",
    "prenom": "Luc",
    "note1": 13.5,
    "note2": 12.0,
    "meilleureNote": 13.5
  },
  {
    "id": 7,
    "nom": "Petit",
    "prenom": "Paul",
    "note1": 8.0,
    "note2": 11.0,
    "meilleureNote": 11.0
  },
  {
    "id": 4,
    "nom": "Dubois",
    "prenom": "Sophie",
    "note1": 9.0,
    "note2": 10.5,
    "meilleureNote": 10.5
  }
]
```

---

## Opérations supplémentaires

### Obtenir tous les étudiants
**Endpoint:** `GET /api/etudiants`

**Commande curl:**
```bash
curl http://localhost:8080/api/etudiants
```

---

### Obtenir un étudiant par ID
**Endpoint:** `GET /api/etudiants/{id}`

**Commande curl:**
```bash
curl http://localhost:8080/api/etudiants/1
```

---

## Test avec Postman

Vous pouvez également utiliser Postman pour tester les endpoints:

1. **POST /api/etudiants/ajouter**
   - Method: POST
   - URL: http://localhost:8080/api/etudiants/ajouter
   - Body (raw JSON):
     ```json
     {
       "nom": "Leroy",
       "prenom": "Alice",
       "note1": 14.5,
       "note2": 15.0
     }
     ```

2. **GET /api/etudiants/note/Dupont**
   - Method: GET
   - URL: http://localhost:8080/api/etudiants/note/Dupont

3. **GET /api/etudiants/validant**
   - Method: GET
   - URL: http://localhost:8080/api/etudiants/validant

4. **GET /api/etudiants/majorant**
   - Method: GET
   - URL: http://localhost:8080/api/etudiants/majorant

5. **GET /api/etudiants/tries**
   - Method: GET
   - URL: http://localhost:8080/api/etudiants/tries

---

## Comment démarrer l'application

1. **Avec Maven:**
   ```bash
   mvnw clean spring-boot:run
   ```

2. **Avec votre IDE:**
   - Exécuter la classe `GestionAbsenceSpringBootApplication`

3. **Vérifier que l'application est démarrée:**
   - L'application démarre sur le port 8080
   - Vous devriez voir dans les logs: "✅ Base de données initialisée avec 7 étudiants"

---

## Test avec navigateur

Pour les endpoints GET, vous pouvez également utiliser votre navigateur:

- http://localhost:8080/api/etudiants
- http://localhost:8080/api/etudiants/note/Dupont
- http://localhost:8080/api/etudiants/validant
- http://localhost:8080/api/etudiants/majorant
- http://localhost:8080/api/etudiants/tries
- http://localhost:8080/h2-console (Console H2)

