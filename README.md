[![Build Status](https://github.com/FredericFouche/Scribere/actions/workflows/WORKFLOW-FILE/badge.svg)](https://github.com/FredericFouche/Scribere)

# [WIP]Scribere

Scribere is a modern blogging platform that enables users to create, edit, and share rich-text articles with tags, search capabilities, and real-time indexing. It consists of a Spring Boot backend and an Angular frontend, with Postgres for data persistence, Meilisearch for fast search, and Flyway for database migrations.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Code Conventions & Standards](#code-conventions--standards)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running with Docker](#running-with-docker)
- [Building for Production](#building-for-production)
- [Testing](#testing)

## Tech Stack

- **Backend**: Java, Spring Boot, Maven, Flyway, PostgreSQL
- **Search**: Meilisearch
- **Frontend**: Angular 19, TypeScript, Tailwind CSS, SSR (Angular Universal)
- **DevOps**: Docker, Docker Compose
- **Testing**: JUnit, Spring Test, Karma, Jasmine

## Features

- Create, edit, and delete articles with rich-text support (Tiptap editor)
- Tagging system with UUID-based tags
- Full-text search powered by Meilisearch
- Database migrations using Flyway
- Responsive UI with Tailwind CSS
- Server-side rendering for SEO and performance
- RESTful API endpoints for articles and tags

## Project Structure

```plaintext
Scribere/
├── backend/              # Spring Boot application
│   ├── src/main/java     # Application code and controllers
│   ├── src/main/resources
│   │   └── application.properties
│   └── src/test/java     # Integration and unit tests
├── frontend/scribere/    # Angular application
│   ├── src/app           # Components, pages, services, and pipes
│   ├── src/assets        # Fonts, images
│   └── src/styles.css    # Global styles
├── docker-compose.yml    # Development and local multi-container setup
└── README.md             # Project overview and setup
```

## Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+ and npm
- Docker & Docker Compose (optional, recommended for local setup)

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Configure database and Meilisearch in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=postgres

   meilisearch.url=http://localhost:7700
   meilisearch.key=devkey
   ```
3. Run Flyway migrations and start the server:
   ```bash
   mvn clean package
   mvn spring-boot:run
   ```
4. The API will be available at `http://localhost:8080/api`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend/scribere
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update API URL in `src/app/env/env.ts` if needed (default is `http://localhost:8080/api`).
4. Run the development server:
   ```bash
   npm start
   ```
5. Open `http://localhost:4200` in your browser.

### Running with Docker

A full development environment can be started with Docker Compose:

```bash
docker-compose up --build
```

This will launch:
- PostgreSQL at `localhost:5432`
- Meilisearch at `localhost:7700`
- MinIO (object storage) at `localhost:9000`
- Backend at `localhost:8080`
- Frontend at `localhost:4200`

## Building for Production

- **Backend**:
  ```bash
  cd backend
  mvn clean package -DskipTests
  ```
- **Frontend**:
  ```bash
  cd frontend/scribere
  npm run build
  ```

Production artifacts will be generated under `backend/target` and `frontend/scribere/dist` respectively.

## Testing

### Backend Tests
Run the following command to execute all tests in the backend:

```bash
mvn test
```

### Frontend Tests
Run the following command to execute all tests in the frontend:

```bash
ng test
```
