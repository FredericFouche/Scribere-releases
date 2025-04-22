# Scribere

![CI Frontend](https://github.com/FredericFouche/Scribere/actions/workflows/frontend.yml/badge.svg)
![CI Backend](https://github.com/FredericFouche/Scribere/actions/workflows/backend.yml/badge.svg)

Ce dépôt contient le backend et le frontend de l’application Scribere.

## Prérequis

Avant de compiler et de lancer le projet, assurez-vous d’avoir installé les outils suivants :
	•	Node.js v22.14 ou supérieur
	•	Java JDK 21
	•	Docker v24 ou supérieur

Vous pouvez vérifier les versions installées avec :

node -v   # doit renvoyer v20.x.x ou plus
java -version  # doit indiquer "21"
docker -v  # doit indiquer v24.x.x ou plus

## Installation et build

Backend (Spring Boot)
	1.	Placez-vous dans le dossier backend :
cd backend
	2.	Compilez et packagez l’application :
mvn clean package
	3.	Pour lancer l’application en mode développement :
mvn spring-boot:run



Frontend (Angular / Next.js / autre)
	1.	Placez-vous dans le dossier frontend :
cd frontend
	2.	Installez les dépendances :
npm install
	3.	Compilez l’application :
npm run build
	4.	Pour lancer en mode développement :
npm start


Lancement avec Docker

Si vous souhaitez lancer l’ensemble via Docker :
	1.	À la racine du projet, construisez et démarrez les conteneurs :
docker-compose up --build
	2.	Pour reconstruire uniquement une image spécifique :
docker build -t scribere-backend:latest backend
docker build -t scribere-frontend:latest frontend

# Architecture en couches de l'application Scribere API

## Vue d'ensemble

L'application Scribere suit une architecture en couches classique inspirée du modèle MVC (Modèle-Vue-Contrôleur), avec une séparation claire des responsabilités entre les différents composants.

## Couches principales

### 1. Contrôleurs (Controllers)
- **Responsabilité**: Gestion des requêtes HTTP et routage
- **Exemple**: `ArticleController`
- **Rôle**: Points d'entrée de l'API REST, validation des entrées, définition des endpoints

### 2. Services (Services)
- **Responsabilité**: Logique métier
- **Exemple**: `ArticleService`
- **Rôle**: Orchestration des opérations, règles métier, transactions

### 3. Dépôts (Repositories)
- **Responsabilité**: Accès aux données
- **Exemple**: `ArticleRepository`
- **Rôle**: Persistance et récupération des données, abstraction de la couche de stockage

### 4. Modèles (Models)
- **Responsabilité**: Représentation des entités métier
- **Exemple**: `Article`
- **Rôle**: Entités JPA mappées vers la base de données

### 5. DTOs (Data Transfer Objects)
- **Responsabilité**: Objets de transfert de données
- **Exemple**: `ArticleDto`
- **Rôle**: Structures dédiées à l'exposition des données via l'API

### 6. Mappers (Mappers)
- **Responsabilité**: Conversion entre entités et DTOs
- **Exemple**: `ArticleMapper`
- **Rôle**: Transformation des modèles en DTOs et vice-versa

## Mécanismes transversaux

### Communication par événements
- **Mécanisme**: Utilisation du système d'événements de Spring
- **Exemple**: `ArticleSavedEvent`
- **Avantage**: Découplage entre les composants, extensibilité facile

### Injection de dépendances
- **Approche**: Injection par constructeur (moins de code, plus testable)
- **Avantage**: Code plus testable, couplage faible entre composants

### Configuration déclarative
- **Structure**: pom.xml bien organisé avec des sections commentées
- **Avantage**: Maintenance facilitée, lisibilité accrue

## Résumé

Cette architecture en couches permet:
- Une **séparation claire des responsabilités**
- Une **meilleure testabilité** de chaque composant isolément
- Une **maintenance facilitée** grâce au découplage
- Une **évolutivité améliorée** par l'utilisation des événements
