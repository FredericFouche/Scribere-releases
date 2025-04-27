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
- **Caractéristiques**: 
  - Implémente les interfaces métier
  - Gère les transactions (@Transactional)
  - Contient la logique de validation avancée

### 3. Dépôts (Repositories)
- **Responsabilité**: Accès aux données et opérations CRUD
- **Exemple**: `ArticleRepository extends JpaRepository<Article, UUID>`
- **Rôle**: 
  - Persistance et récupération des données
  - Abstraction de la couche de stockage
  - Définition de requêtes personnalisées avec @Query

### 4. Modèles (Models)
- **Responsabilité**: Représentation des entités métier
- **Exemple**: `@Entity public class Article { ... }`
- **Rôle**: 
  - Entités JPA mappées vers les tables de la base de données
  - Définition des relations (@OneToMany, @ManyToOne, etc.)
  - Intégration de validations (Bean Validation)

### 5. DTOs (Data Transfer Objects)
- **Responsabilité**: Objets de transfert de données
- **Exemple**: `public record ArticleDto(UUID id, String title, String content) { ... }`
- **Rôle**: 
  - Structures dédiées à l'exposition des données via l'API
  - Séparation des préoccupations entre modèle interne et externe
  - Masquage des détails d'implémentation au client

### 6. Mappers (Mappers)
- **Responsabilité**: Conversion entre entités et DTOs
- **Exemple**: `@Mapper(componentModel = "spring") public interface ArticleMapper { ... }`

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

# Architecture Frontend

## Vue d'ensemble

Le frontend de Scribere est développé avec Angular 17 et utilise une architecture modulaire et orientée composants, avec un système de gestion d'état implicite et une approche fonctionnelle pour la gestion des effets secondaires.

## Structure du frontend

### 1. Composants Angular (Components)
- **Responsabilité**: Interfaces utilisateur réutilisables
- **Exemples**: `SearchBarComponent`, `NavbarComponent`
- **Caractéristiques**:
  - Autonomes et hautement cohésifs
  - Utilisation des décorateurs @Component, @Input, @Output
  - Logique métier minimale

### 2. Services (Services)
- **Responsabilité**: Communication avec l'API et logique métier partagée
- **Exemples**: `ArticleService`, `SearchService`
- **Caractéristiques**:
  - Injectables via le système d'injection de dépendances d'Angular
  - Utilisation de RxJS pour les flux de données réactifs
  - Abstraction des appels HTTP et manipulation de données

### 3. Modèles de données (Models)
- **Responsabilité**: Représentation des entités côté client
- **Exemples**: Interfaces `Article`, `User`
- **Caractéristiques**:
  - Types TypeScript pour vérification statique
  - Alignement avec les DTOs du backend
  - Utilisation d'interfaces plutôt que de classes pour favoriser l'immutabilité

### 4. Modules partagés (Shared Modules)
- **Responsabilité**: Regroupement de fonctionnalités réutilisables
- **Exemples**: Components UI communs, pipes, directives
- **Caractéristiques**:
  - Exportés et importés selon les besoins
  - Suivent le principe de responsabilité unique

### 5. Design System
- **Responsabilité**: Système de design cohérent
- **Implémentation**: TailwindCSS avec thème personnalisé
- **Caractéristiques**:
  - Variables CSS pour les couleurs, typographie, espacement
  - Composants UI réutilisables avec styles consistants
  - Responsive design avec approche mobile-first

## Fonctionnalités notables

### Système de recherche
- Implémentation d'une barre de recherche avec debounce (300ms)
- Surlignage des termes de recherche dans les résultats
- Détection des clics à l'extérieur pour fermer les résultats
- Utilisation des raccourcis clavier (Entrée, Échap)

## Stratégies d'optimisation
- **Lazy loading**: Chargement à la demande des modules pour améliorer les temps de chargement initiaux
- **Performance**: Optimisations OnPush pour minimiser les cycles de détection de changements
- **Caching**: Stratégies de mise en cache des réponses de l'API pour réduire les requêtes réseau

# Déploiement

## Environnements

L'application Scribere est conçue pour être déployée dans plusieurs environnements :

### 1. Développement local
- **Backend**: SpringBoot sur localhost:8080
- **Frontend**: Angular DevServer sur localhost:4200
- **Base de données**: PostgreSQL dans un conteneur Docker
- **Commande**: `docker-compose up -d postgres && mvn spring-boot:run && ng serve`

### 2. Environnement de test
- **Infrastructure**: Conteneurs Docker orchestrés par Docker Compose
- **CI/CD**: Tests et build automatisés via GitHub Actions
- **Commande**: `docker-compose -f docker-compose.test.yml up --build`

### 3. Production
- **Déploiement**: Kubernetes ou services cloud managés
- **Stratégie**: Blue/Green deployment pour les mises à jour sans interruption
- **Infrastructure as Code**: Configuration Terraform pour les ressources cloud

## Pipeline CI/CD

### GitHub Actions Workflow
- **Build**: Compilation et tests automatisés sur chaque push
- **Tests**: Exécution des tests unitaires et d'intégration
- **Artifacts**: Publication des images Docker vers GitHub Container Registry
- **Déploiement**: Déploiement automatique vers l'environnement correspondant à la branche

## Configuration Docker

### Images
- **Backend**: Image Java 21 + Spring Boot optimisée pour la production
- **Frontend**: Build statique servi via NGINX
- **Base de données**: PostgreSQL avec volumes persistants

### docker-compose.yml
Le fichier docker-compose.yml à la racine du projet permet de démarrer l'ensemble de l'application localement :

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: scribere
      POSTGRES_PASSWORD: scribere
      POSTGRES_DB: scribere
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/scribere
      SPRING_DATASOURCE_USERNAME: scribere
      SPRING_DATASOURCE_PASSWORD: scribere
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## Surveillance et Monitoring

- **Logs**: Centralisation des logs avec ELK Stack (Elasticsearch, Logstash, Kibana)
- **Métriques**: Surveillance des performances avec Prometheus et Grafana
- **Alertes**: Configuration d'alertes automatiques en cas de problèmes
