# Eureka Server - Service de Découverte

## Description
Serveur Eureka pour l'enregistrement et la découverte des microservices.

## Démarrage

```bash
mvn spring-boot:run
```

## Accès au Dashboard
- URL: http://localhost:8761
- Le dashboard Eureka affiche tous les services enregistrés

## Configuration
- Port: 8761 (par défaut)
- Mode: Standalone (ne s'enregistre pas lui-même)

## Services qui vont s'enregistrer
1. gestionAbsenceSpringBoot (port 8081)
2. gestionNotesSpringBoot (port 8082)
3. API Gateway (port 8080)

