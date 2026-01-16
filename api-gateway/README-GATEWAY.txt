# API GATEWAY - Guide d'utilisation

## Description

L'API Gateway est le point d'entrée unique pour tous les microservices. Il route les requêtes vers les services appropriés en utilisant la découverte de services via Eureka.

## Architecture

```
Client → API Gateway (8080) → Eureka Discovery → Services (8081, 8082)
```

## Routes configurées

| Route | Service cible | Port | Description |
|-------|---------------|------|-------------|
| `/absence/**` | gestion-absence-service | 8081 | Gestion des absences |
| `/notes/**` | gestion-notes-service | 8082 | Gestion des notes |

## Exemples d'utilisation

### Via API Gateway (RECOMMANDÉ)
```bash
# Accès au service Absence via Gateway
http://localhost:8080/absence/api/...

# Accès au service Notes via Gateway
http://localhost:8080/notes/api/...
```

### Accès direct aux services (pour développement)
```bash
# Service Absence direct
http://localhost:8081/api/...

# Service Notes direct
http://localhost:8082/api/...
```

## Endpoints du Gateway

### Page d'accueil
```
GET http://localhost:8080/
```
Retourne les informations du Gateway et la liste des routes.

### Liste des services
```
GET http://localhost:8080/services
```
Retourne tous les services enregistrés dans Eureka.

### Actuator
```
GET http://localhost:8080/actuator/health
GET http://localhost:8080/actuator/gateway/routes
```

## Fonctionnalités

### 1. Routage intelligent
Le Gateway route automatiquement les requêtes vers le bon service basé sur le path.

### 2. Load Balancing
Si plusieurs instances d'un service sont disponibles, le Gateway fait automatiquement du load balancing.

### 3. Découverte de services
Le Gateway utilise Eureka pour découvrir dynamiquement les services disponibles.

### 4. Filtres
Un filtre de logging est configuré pour tracer toutes les requêtes.

### 5. CORS
Configuration CORS globale pour permettre les requêtes cross-origin.

## Configuration

### application.properties
Les routes sont configurées dans `src/main/resources/application.properties`.

### GatewayConfig.java
Configuration programmatique des routes (alternative).

## Démarrage

### Démarrage automatique (avec tous les services)
```bash
start-all-with-gateway.bat
```

### Démarrage manuel
```bash
cd api-gateway
mvnw.cmd spring-boot:run
```

### Ordre de démarrage
1. Eureka Server (8761) - EN PREMIER
2. Services (8081, 8082)
3. API Gateway (8080) - EN DERNIER

## Vérification

### Vérifier que le Gateway fonctionne
```bash
curl http://localhost:8080/
```

### Vérifier les routes configurées
```bash
curl http://localhost:8080/actuator/gateway/routes
```

### Vérifier les services découverts
```bash
curl http://localhost:8080/services
```

## Logs

Le Gateway affiche dans la console :
- Toutes les requêtes reçues (méthode, path, timestamp)
- Le status des réponses
- Les services découverts

## Avantages de l'API Gateway

✅ **Point d'entrée unique** - Une seule URL pour tous les services
✅ **Load Balancing automatique** - Distribution des requêtes
✅ **Découverte dynamique** - Pas besoin de hardcoder les URLs
✅ **Filtres centralisés** - Logging, authentification, etc.
✅ **CORS géré centralement** - Configuration unique
✅ **Monitoring** - Endpoints Actuator

## Dépannage

### Le Gateway ne démarre pas
- Vérifier que Eureka est démarré en premier
- Vérifier que le port 8080 est libre

### Les routes ne fonctionnent pas
- Vérifier que les services sont enregistrés dans Eureka
- Consulter http://localhost:8761
- Vérifier les logs du Gateway

### Erreur 503 Service Unavailable
- Le service cible n'est pas disponible
- Vérifier que le service est démarré et enregistré dans Eureka

