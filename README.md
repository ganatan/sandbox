# RAG Generator — Angular 20 & Spring Boot 3.5.5  

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">

## 🚀 Project Goals  
- ✅ Demonstrate a complete **RAG (Retrieval-Augmented Generation)** architecture  
- ✅ **FullStack application**: **Angular 20** frontend and **Spring Boot 3.5.5 (Java 21)** backend  
- ✅ **GitLab CI/CD** integration and deployment on **OpenShift (Kubernetes)**  

---

**👉 Version française disponible ici** : [![Français](./ui/version-fr.png)](./README-fr.md)

---

## 📁 Project Structure

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
│       └── (SQL scripts, init, migrations)
│
├── .gitlab-ci.yml
└── README.md
```

---

## ⚙️ Description

**RAG Generator** is a complete FullStack application demonstrating a **Retrieval-Augmented Generation (RAG)** architecture.
It combines a **frontend built with Angular 20** and a **backend powered by Spring Boot 3.5 (Java 21)**.
The project includes a full **GitLab CI/CD pipeline** and **automated OpenShift deployment**.

---

## 🧩 Components

| Component | Technology | Role |
|------------|-------------|------|
| Frontend | Angular 20 | User interface |
| Backend | Spring Boot 3.5 / Java 21 | REST API / business logic |
| Database | PostgreSQL / Oracle | Context and embeddings storage |
| Registry | GitLab Container Registry | Docker image repository |
| Cluster | OpenShift 4.x | Container orchestration and hosting |

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

Report:
```
rag-generator/frontend-angular/coverage/index.html
```

### Build

```bash
npm run build
```

### Local Development Server

```bash
npm run start
```

App available at:
```
http://localhost:4200
```

---

## ☕ Backend Spring Boot

### Static Analysis

```bash
cd rag-generator/backend-springboot
mvn checkstyle:check
```

### Unit Tests & Coverage

```bash
mvn clean test
mvn jacoco:report
```

Report:
```
rag-generator/backend-springboot/target/site/jacoco/index.html
```

### Build

```bash
mvn clean install
```

### Run Application

```bash
mvn spring-boot:run
```
or
```bash
java -jar target/backend-springboot-1.0.0.jar
```

API available at:
```
http://localhost:8080
```

---

## 🐳 Docker

### Build Images

```bash
docker build -t frontend-angular:latest -f rag-generator/frontend-angular/docker/Dockerfile.frontend-angular .
docker build -t backend-springboot:latest -f rag-generator/backend-springboot/docker/Dockerfile.backend-springboot .
```

### Run Containers

```bash
docker run -d --name frontend-angular -p 4000:80 frontend-angular:latest
docker run -d --name backend-springboot -p 8080:8080 backend-springboot:latest
```

---

## 🚀 GitLab CI/CD

### Main `.gitlab-ci.yml`

Includes both frontend and backend pipelines:

```yaml
include:
  - local: .gitlab/rag-generator-frontend-angular-ci.yml
  - local: .gitlab/rag-generator-backend-springboot-ci.yml
```

### Pipeline Stages

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

## ☸️ OpenShift Deployment

### 1. Connect to Cluster

```bash
oc login https://api.openshift.example.com:6443 --token=<YOUR_TOKEN>
oc project ganatan-dev
```

### 2. Push Docker Images

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

### 3. Apply Kubernetes Manifests

#### Frontend

```bash
oc apply -f k8s/rag-generator-frontend-angular-deployment.yml -n ganatan-dev
```

#### Backend

```bash
oc apply -f k8s/rag-generator-backend-springboot-deployment.yml -n ganatan-dev
```

### 4. Restart & Logs

```bash
oc rollout restart deployment/frontend-angular -n ganatan-dev
oc rollout restart deployment/backend-springboot -n ganatan-dev
oc get pods -n ganatan-dev
oc logs -f deployment/backend-springboot -n ganatan-dev
```

### 5. Application URLs

Frontend:
```
https://frontend-angular-ganatan-dev.apps.openshift.example.com
```

Backend:
```
https://backend-springboot-ganatan-dev.apps.openshift.example.com
```

### 6. Full Cleanup

```bash
oc delete all -l app=frontend-angular -n ganatan-dev
oc delete all -l app=backend-springboot -n ganatan-dev
```

---

## 📦 Useful Maven Commands

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

## 🧠 Technical Stack

| Layer | Technology | Version |
|--------|--------------|----------|
| Frontend | Angular | 20.x |
| Backend | Spring Boot | 3.5.x |
| Java | 21 |
| CI/CD | GitLab | SaaS or Self-Hosted |
| Deployment | OpenShift | 4.14+ |
| Containers | Docker | 24+ |
| Code Quality | ESLint / Checkstyle | - |
| Tests | Jasmine / JUnit / JaCoCo | - |


