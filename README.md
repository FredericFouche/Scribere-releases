# Scribere

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
