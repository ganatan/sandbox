# 🧠 RAG Generator — Angular 20 & Spring Boot 3.5.5

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="logo ganatan">

---

## 🎯 Objectifs du projet
- ✅ construire une architecture complète **RAG (Retrieval-Augmented Generation)**  
- ✅ Application **FullStack** : **Angular 20.3.4** en frontend et **Spring Boot 3.5.5 (Java 21)** en backend  
- ✅ Intégration **GitLab CI/CD** et déploiement sur **OpenShift (Kubernetes)**  

---

**👉 English version available here:** [![English](./ui/version-en.png)](./README.md)

---

## 📘 Sommaire
- [Présentation du projet](#-présentation-du-projet)
- [Structure du projet](#-structure-du-projet)
- [Composants](#-composants)
- [Intégration Continue (CI)](#-intégration-continue-ci)
- [Images Docker](#-images-docker)
- [Frontend — Angular 20](#-frontend--angular-20)
- [Backend — Spring Boot 3.5.5](#-backend--spring-boot-355)
- [Docker](#-docker)
- [GitLab CI/CD](#-gitlab-cicd)
- [Déploiement OpenShift](#-déploiement-openshift)
- [Auteur & Licence](#-auteur--licence)

---

## 🧬 Présentation du projet

**RAG Generator** est une preuve de concept **production-ready** illustrant une architecture **Retrieval-Augmented Generation**.  
Le projet démontre une architecture modulaire avec builds, tests et déploiements indépendants pour :
- `frontend-angular` — l’interface utilisateur  
- `backend-springboot` — l’API et la logique d’orchestration  

Chaque module peut être déployé indépendamment via GitLab CI/CD.  
Les images Docker sont partagées entre les environnements locaux, CI et OpenShift afin d’assurer la reproductibilité complète.

---

## 🧩 Structure du projet

```
sandbox/
├── .github/
│   └── workflows/
│       ├── rag-generator-frontend-angular.yml
│       └── rag-generator-backend-springboot.yml
│
├── .gitlab/
│   ├── rag-generator-frontend-angular-ci.yml
│   └── rag-generator-backend-springboot-ci.yml
│
├── k8s/
│   ├── rag-generator-frontend-angular-deployment.yml
│   └── rag-generator-backend-springboot-deployment.yml
│
├── rag-generator/
│   ├── backend-springboot/
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── docker/Dockerfile.backend-springboot
│   │
│   ├── frontend-angular/
│   │   ├── src/
│   │   ├── package.json
│   │   └── docker/Dockerfile.frontend-angular
│   │
│   └── databases/
│       └── (scripts SQL)
│
├── .gitlab-ci.yml
└── README.md
```

> Chaque pipeline gère le linting, les tests, le packaging, la création d’images Docker  
> et le déploiement automatique sur OpenShift.

---

## 🧮 Composants

| Composant | Technologie | Rôle |
|------------|-------------|------|
| Frontend | Angular 20 | Interface utilisateur |
| Backend | Spring Boot 3.5.5 / Java 21 | API REST, orchestration RAG |
| Base de données | PostgreSQL / Oracle | Stockage du contexte et des embeddings |
| Registry | GitLab Container Registry | Hébergement des images Docker |
| Cluster | OpenShift 4.x | Déploiement Kubernetes |

---

## 🔧 Intégration Continue (CI)

| Projet  | GitHub Actions | GitLab CI |
|----------|----------------|-----------|
| **Frontend Angular** | [![Frontend Angular CI](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-frontend-angular.yml/badge.svg?branch=master)](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-frontend-angular.yml) | [![GitLab Pipeline](https://gitlab.com/ganatan/sandbox/badges/master/pipeline.svg?job=frontend-angular)](https://gitlab.com/ganatan/sandbox/-/pipelines) |
| **Backend Spring Boot** | [![Backend Spring Boot CI](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-backend-springboot.yml/badge.svg?branch=master)](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-backend-springboot.yml) | [![GitLab Pipeline](https://gitlab.com/ganatan/sandbox/badges/master/pipeline.svg?job=backend-springboot)](https://gitlab.com/ganatan/sandbox/-/pipelines) |

---

## 📦 Images Docker

| Composant | Docker Hub | GitLab Container Registry |
|------------|-------------|----------------------------|
| **Frontend Angular** | [![Docker Hub](https://img.shields.io/badge/Docker%20Hub-frontend--angular-blue?logo=docker&logoColor=white)](https://hub.docker.com/r/ganatan/rag-generator-frontend-angular) | [![GitLab Registry](https://img.shields.io/badge/GitLab%20Registry-frontend--angular-orange?logo=gitlab&logoColor=white)](https://gitlab.com/ganatan/sandbox/container_registry) |
| **Backend Spring Boot** | [![Docker Hub](https://img.shields.io/badge/Docker%20Hub-backend--springboot-blue?logo=docker&logoColor=white)](https://hub.docker.com/r/ganatan/rag-generator-backend-springboot) | [![GitLab Registry](https://img.shields.io/badge/GitLab%20Registry-backend--springboot-orange?logo=gitlab&logoColor=white)](https://gitlab.com/ganatan/sandbox/container_registry) |

---

## 🧩 Frontend — Angular 20

### Installation
```bash
cd rag-generator/frontend-angular
npm ci
```

### Lint & Tests
```bash
npm run lint
npm run test
npm run coverage
```

Rapport de couverture :  
`rag-generator/frontend-angular/coverage/index.html`

### Build & Exécution

**Mode standard**
```bash
npm run build
npm run start
```
→ http://localhost:4200

**Server-Side Rendering (SSR)**
```bash
npm run build:ssr
npm run serve:ssr
```
→ http://localhost:4000

---

## ☕ Backend — Spring Boot 3.5.5

### Analyse statique
```bash
cd rag-generator/backend-springboot
mvn checkstyle:check
```

### Tests unitaires & couverture
```bash
mvn clean test
mvn jacoco:report
```

Rapport de couverture :  
`rag-generator/backend-springboot/target/site/jacoco/index.html`

### Build & Exécution
```bash
mvn clean install
mvn spring-boot:run
```
ou
```bash
java -jar target/backend-springboot-1.0.0.jar
```
→ http://localhost:3000

---

## 🐳 Docker

### Construction des images
```bash
docker build -t frontend-angular:latest -f rag-generator/frontend-angular/docker/Dockerfile.frontend-angular .
docker build -t backend-springboot:latest -f rag-generator/backend-springboot/docker/Dockerfile.backend-springboot .
```

### Exécution des conteneurs
```bash
docker run -d --name frontend-angular -p 4000:80 frontend-angular:latest
docker run -d --name backend-springboot -p 3000:3000 backend-springboot:latest
```

→ Frontend : http://localhost:4000  
→ Backend : http://localhost:3000

---

## 🚀 GitLab CI/CD

`.gitlab-ci.yml` inclut les deux pipelines :

```yaml
include:
  - local: .gitlab/rag-generator-frontend-angular-ci.yml
  - local: .gitlab/rag-generator-backend-springboot-ci.yml
```

Chaque pipeline effectue :
- Lint  
- Tests unitaires  
- Build  
- Création d’image Docker  
- Push vers le Registry  
- Déploiement sur OpenShift  

---

## 🛫 Déploiement OpenShift

### Connexion
```bash
oc login https://api.openshift.example.com:6443 --token=<YOUR_TOKEN>
oc project ganatan-dev
```

### Application des manifests
```bash
oc apply -f k8s/rag-generator-frontend-angular-deployment.yml -n ganatan-dev
oc apply -f k8s/rag-generator-backend-springboot-deployment.yml -n ganatan-dev
```

### Redémarrage & Logs
```bash
oc rollout restart deployment/frontend-angular -n ganatan-dev
oc rollout restart deployment/backend-springboot -n ganatan-dev
oc logs -f deployment/backend-springboot -n ganatan-dev
```

### URLs d'application

| Application | Environnement | URL |
|--------------|----------------|-----|
| Frontend Angular | OpenShift Route | [rag-generator-frontend-angular](https://rag-generator-frontend-angular-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com) |
| Backend Spring Boot | OpenShift Route | [rag-generator-backend-springboot](https://rag-generator-backend-springboot-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com) |

---

## 👤 Auteur & Licence

**Auteur :** Danny — [www.ganatan.com](https://www.ganatan.com)  
**Licence :** MIT
