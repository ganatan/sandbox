# 🚀 RAG Generator — Angular 20 & Spring Boot 3.5.5  

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="logo ganatan">

<p align="left">
  <img src="https://img.shields.io/badge/Frontend-Angular%2020-DD0031?logo=angular&logoColor=white">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot%203.5.5-6DB33F?logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/Java-21-007396?logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/CI/CD-GitLab-orange?logo=gitlab">
  <img src="https://img.shields.io/badge/Déploiement-OpenShift-red?logo=redhatopenshift">
</p>

---

## 🎯 Objectifs du projet  
- ✅ Démontrer une architecture complète **RAG (Retrieval-Augmented Generation)**  
- ✅ Application **FullStack** : frontend **Angular 20** et backend **Spring Boot 3.5.5 (Java 21)**  
- ✅ Intégration **CI/CD GitLab** et déploiement sur **OpenShift (Kubernetes)**  

---

**👉 English version available here:** [![English](./ui/version-en.png)](./README.md)

---

## 🧱 Présentation du projet

**RAG Generator** est un **proof of concept fonctionnel** démontrant une architecture complète et industrialisable  
pour une application **RAG (Retrieval-Augmented Generation)**.  

Il illustre une **architecture modulaire** avec des builds, pipelines et déploiements indépendants pour :  
- `frontend-angular` — interface utilisateur  
- `backend-springboot` — API REST et logique métier  

Chaque module peut être construit, testé et déployé indépendamment via des **pipelines GitLab CI/CD**.  
Les images Docker sont identiques entre les environnements **local**, **CI**, et **OpenShift**, garantissant la reproductibilité.

---

## 🗂️ Structure du projet

```
sandbox/
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
│   │   ├── scripts/
│   │   └── docker/Dockerfile.backend-springboot
│   │
│   ├── frontend-angular/
│   │   ├── src/
│   │   ├── package.json
│   │   ├── scripts/
│   │   └── docker/Dockerfile.frontend-angular
│   │
│   └── databases/
│       └── (scripts SQL)
│
├── .gitlab-ci.yml
└── README.md
```

> Chaque pipeline gère automatiquement l’analyse, les tests, le build, la création d’images Docker  
> et le déploiement sur OpenShift.

---

## ⚙️ Composants

| 🔧 Composant | 🧩 Technologie | 🧠 Rôle |
|--------------|----------------|----------|
| **Frontend** | Angular 20 | Interface utilisateur |
| **Backend** | Spring Boot 3.5.5 / Java 21 | API REST, orchestration RAG |
| **Base de données** | PostgreSQL / Oracle | Stockage du contexte et des embeddings |
| **Registry** | GitLab Container Registry | Hébergement des images Docker |
| **Cluster** | OpenShift 4.x | Déploiement Kubernetes |

---

## 🧩 Frontend — Angular 20

### ⚙️ Installation
```bash
cd rag-generator/frontend-angular
npm ci
```

### ✅ Lint & Tests
```bash
npm run lint
npm run test
npm run coverage
```

Rapport de couverture :  
```
rag-generator/frontend-angular/coverage/index.html
```

### ⚡ Build & Exécution

#### 🧩 Mode standard
```bash
npm run build
npm run start
```
Accès local (sans SSR) :  
👉 [http://localhost:4200](http://localhost:4200)

#### ⚡ Mode SSR (Server-Side Rendering)
```bash
npm run build:ssr
npm run serve:ssr
```
Accès local (avec SSR) :  
👉 [http://localhost:4000](http://localhost:4000)

> Le mode SSR utilise **Angular Universal** pour le rendu côté serveur sur Node.js.  
> Le mode standard sert les fichiers statiques via le serveur de développement.

---

## ☕ Backend — Spring Boot 3.5.5

### 🔍 Analyse statique
```bash
cd rag-generator/backend-springboot
mvn checkstyle:check
```

### ✅ Tests unitaires & couverture
```bash
mvn clean test
mvn jacoco:report
```

Rapport de couverture :  
```
rag-generator/backend-springboot/target/site/jacoco/index.html
```

### ⚡ Build & Exécution
```bash
mvn clean install
mvn spring-boot:run
```
ou  
```bash
java -jar target/backend-springboot-1.0.0.jar
```

API locale :  
👉 [http://localhost:3000](http://localhost:3000)

> Toutes les étapes (analyse, tests, build, déploiement) sont automatisées via GitLab CI.

---

## 🐳 Docker

### 🧰 Construction des images (depuis la racine `sandbox`)
```bash
cd sandbox
docker build -t frontend-angular:latest -f rag-generator/frontend-angular/docker/Dockerfile.frontend-angular .
docker build -t backend-springboot:latest -f rag-generator/backend-springboot/docker/Dockerfile.backend-springboot .
```

### ▶️ Exécution locale des conteneurs
```bash
cd sandbox
docker run -d --name frontend-angular -p 4000:80 frontend-angular:latest
docker run -d --name backend-springboot -p 3000:3000 backend-springboot:latest
```

Une fois lancées :

- **Frontend (Angular SPA / SSR)** → [http://localhost:4000](http://localhost:4000)  
- **Backend (Spring Boot API)** → [http://localhost:3000](http://localhost:3000)

> Les deux conteneurs peuvent être exécutés simultanément.  
> Cette configuration reflète l’environnement CI/CD et OpenShift.

---

## 🚀 GitLab CI/CD

`.gitlab-ci.yml` inclut les deux pipelines :

```yaml
include:
  - local: .gitlab/rag-generator-frontend-angular-ci.yml
  - local: .gitlab/rag-generator-backend-springboot-ci.yml
```

Chaque pipeline exécute :
- Lint  
- Tests unitaires  
- Build  
- Création d’image Docker  
- Publication dans le Registry  
- Déploiement OpenShift  

> Les pipelines sont déclenchés automatiquement lors d’un **merge** ou de la création d’un **tag**.

---

## ☸️ Déploiement OpenShift

### 🔐 Connexion au cluster
```bash
oc login https://api.openshift.example.com:6443 --token=<VOTRE_TOKEN>
oc project ganatan-dev
```

### ⚙️ Application des manifests
```bash
oc apply -f k8s/rag-generator-frontend-angular-deployment.yml -n ganatan-dev
oc apply -f k8s/rag-generator-backend-springboot-deployment.yml -n ganatan-dev
```

### 🔁 Redémarrage & logs
```bash
oc rollout restart deployment/frontend-angular -n ganatan-dev
oc rollout restart deployment/backend-springboot -n ganatan-dev
oc logs -f deployment/backend-springboot -n ganatan-dev
```

### 🌐 URLs d’accès
- Frontend → https://rag-generator-frontend-angular-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com
- Backend → https://rag-generator-backend-springboot-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com


> Déployé via des manifests Kubernetes avec probes de santé et rolling updates.

---

## 🧠 Stack technique

| Couche | Technologie | Version |
|--------|--------------|----------|
| Frontend | Angular | 20.x |
| Backend | Spring Boot | 3.5.x |
| Java | 21 |
| CI/CD | GitLab | SaaS / Self-Hosted |
| Déploiement | OpenShift | 4.14+ |
| Conteneurs | Docker | 24+ |
| Qualité de code | ESLint / Checkstyle | - |
| Tests | Jasmine / JUnit / JaCoCo | - |
| Infrastructure | GitLab + OpenShift | Intégration CI/CD complète avec déploiement Kubernetes |
