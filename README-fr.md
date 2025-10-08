# RAG Generator — Angular 20 & Spring Boot 3.5.5

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="logo ganatan">

## 🚀 Objectifs du projet
- ✅ Démontrer une architecture **RAG (Retrieval-Augmented Generation)** complète  
- ✅ Application **FullStack** : frontend **Angular 20** et backend **Spring Boot 3.5.5 (Java 21)**  
- ✅ Intégration **CI/CD GitLab** et déploiement sur **OpenShift (Kubernetes)**  

---

**👉 English version available here** : [![English](./ui/version-en.png)](./README.md)

---

## 📁 Structure du projet

```
.
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
│       └── (scripts SQL, init, migrations)
│
├── .gitlab-ci.yml
└── README.md
```

---

## ⚙️ Description

**RAG Generator** est une application FullStack complète démontrant une architecture **RAG (Retrieval-Augmented Generation)**.
Elle associe un **frontend Angular 20** et un **backend Spring Boot 3.5 (Java 21)**.
Le projet inclut un pipeline **GitLab CI/CD** complet et un **déploiement OpenShift** automatisé.

---

## 🧩 Composants

| Composant | Technologie | Rôle |
|------------|-------------|------|
| Frontend | Angular 20 | Interface utilisateur |
| Backend | Spring Boot 3.5 / Java 21 | API REST / logique métier |
| Database | PostgreSQL / Oracle | Stockage contextuel |
| Registry | GitLab Container Registry | Stockage des images Docker |
| Cluster | OpenShift 4.x | Orchestration et hébergement |

---

## 🧱 Frontend Angular

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

Rapport :
```
rag-generator/frontend-angular/coverage/index.html
```

### Build

```bash
npm run build
```

### Démarrage local

```bash
npm run start
```

Application disponible sur :
```
http://localhost:4200
```

---

## ☕ Backend Spring Boot

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

Rapport :
```
rag-generator/backend-springboot/target/site/jacoco/index.html
```

### Build

```bash
mvn clean install
```

### Exécution locale

```bash
mvn spring-boot:run
```
ou
```bash
java -jar target/backend-springboot-1.0.0.jar
```

API disponible sur :
```
http://localhost:8080
```

---

## 🐳 Docker

### Build des images

```bash
docker build -t frontend-angular:latest -f rag-generator/frontend-angular/docker/Dockerfile.frontend-angular .
docker build -t backend-springboot:latest -f rag-generator/backend-springboot/docker/Dockerfile.backend-springboot .
```

### Exécution locale

```bash
docker run -d --name frontend-angular -p 4000:80 frontend-angular:latest
docker run -d --name backend-springboot -p 8080:8080 backend-springboot:latest
```

---

## 🚀 CI/CD GitLab

### `.gitlab-ci.yml` principal

Inclut les pipelines spécifiques au frontend et au backend :

```yaml
include:
  - local: .gitlab/rag-generator-frontend-angular-ci.yml
  - local: .gitlab/rag-generator-backend-springboot-ci.yml
```

### Pipelines détaillés

#### Frontend Angular
- install:frontend-angular
- lint:frontend-angular
- test:frontend-angular
- build:frontend-angular
- docker:frontend-angular
- deploy:frontend-angular

#### Backend Spring Boot
- lint:backend-springboot
- test:backend-springboot
- build:backend-springboot
- docker:backend-springboot
- deploy:backend-springboot

---

## ☸️ Déploiement OpenShift

### 1. Connexion au cluster

```bash
oc login https://api.openshift.example.com:6443 --token=<VOTRE_TOKEN>
oc project ganatan-dev
```

### 2. Publication des images Docker

#### Frontend

```bash
docker tag frontend-angular:latest registry.gitlab.com/ganatan/sandbox/rag-generator/frontend-angular:latest
docker push registry.gitlab.com/ganatan/sandbox/rag-generator/frontend-angular:latest
```

#### Backend

```bash
docker tag backend-springboot:latest registry.gitlab.com/ganatan/sandbox/rag-generator/backend-springboot:latest
docker push registry.gitlab.com/ganatan/sandbox/rag-generator/backend-springboot:latest
```

### 3. Déploiement des manifests

#### Frontend

```bash
oc apply -f k8s/rag-generator-frontend-angular-deployment.yml -n ganatan-dev
```

#### Backend

```bash
oc apply -f k8s/rag-generator-backend-springboot-deployment.yml -n ganatan-dev
```

### 4. Redémarrage et logs

```bash
oc rollout restart deployment/frontend-angular -n ganatan-dev
oc rollout restart deployment/backend-springboot -n ganatan-dev
oc get pods -n ganatan-dev
oc logs -f deployment/backend-springboot -n ganatan-dev
```

### 5. Accès à l’application

Frontend :
```
https://frontend-angular-ganatan-dev.apps.openshift.example.com
```

Backend :
```
https://backend-springboot-ganatan-dev.apps.openshift.example.com
```

### 6. Nettoyage complet

```bash
oc delete all -l app=frontend-angular -n ganatan-dev
oc delete all -l app=backend-springboot -n ganatan-dev
```

---

## 📦 Commandes Maven utiles

```bash
mvn clean
mvn compile
mvn test
mvn package
mvn install
mvn checkstyle:check
mvn dependency:tree
mvn spring-boot:run
```

---

## 🧠 Stack technique

| Couche | Technologie | Version |
|--------|--------------|----------|
| Frontend | Angular | 20.x |
| Backend | Spring Boot | 3.5.x |
| Java | 21 |
| CI/CD | GitLab | SaaS ou Self-Hosted |
| Déploiement | OpenShift | 4.14+ |
| Conteneurs | Docker | 24+ |
| Qualité | ESLint / Checkstyle | - |
| Tests | Jasmine / JUnit / JaCoCo | - |
