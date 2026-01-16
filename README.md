# Gestion Notes & Absences – Architecture Microservices

Ce dépôt contient un projet complet de gestion des notes et des absences basé sur une architecture microservices avec backends Spring Boot et frontends React.


## Contenu du projet

- **gestionNotesSpringBoot/** : service Spring Boot pour la gestion des notes des étudiants.
- **gestionAbsenceSpringBoot/** : service Spring Boot pour la gestion des absences.
- **api-gateway/** : API Gateway (Spring Cloud Gateway) pour exposer les microservices via un point d’entrée unique.
- **eureka-server/** : serveur Eureka pour la découverte des services.
- **gestionNotesReact/** : frontend React pour la gestion des notes.
- **gestionAbsenceReact/** : frontend React pour la gestion des absences.
- **FrontEndReactForMicroServices/** : frontend React global (portail) pour accéder aux différents services.

## Objectif du projet

- Centraliser la gestion des **notes** et des **absences** des étudiants.
- Illustrer une architecture **microservices** avec :
  - découverte de services (Eureka),
  - routage via une API Gateway,
  - frontends indépendants pour chaque domaine fonctionnel.

## Comment lancer le projet (vue simplifiée)

1. Démarrer le serveur de découverte :

   - Dans `eureka-server/`, exécuter le script :
     - Windows : `start-eureka.bat`

2. Démarrer les microservices backend :

   - Dans `gestionNotesSpringBoot/`, exécuter :
     - Windows : `start-notes.bat` ou `start.bat`
   - Dans `gestionAbsenceSpringBoot/`, exécuter :
     - Windows : `start-absence.bat`

3. Démarrer l’API Gateway :

   - Dans `api-gateway/`, exécuter :
     - Windows : `start-gateway.bat`

4. Démarrer les frontends React (exemple) :
   - Dans `gestionNotesReact/` : `npm install` puis `npm run dev`
   - Dans `gestionAbsenceReact/` : `npm install` puis `npm run dev`
   - Dans `FrontEndReactForMicroServices/` : `npm install` puis `npm run dev`

Les ports exacts et les détails supplémentaires sont décrits dans les README propres à chaque sous-projet (lorsqu’ils existent).

## Technologies principales

- **Backends** : Java, Spring Boot, Spring Cloud, Eureka, API Gateway.
- **Frontends** : React, TypeScript, Vite, Tailwind CSS.
- **Autres** : Maven, npm.
