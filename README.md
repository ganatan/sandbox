# RAG Generator — Angular 20 & Spring Boot 3.5.5  

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">

## 🚀 Project Goals  
- ✅ Demonstrate a complete **RAG (Retrieval-Augmented Generation)** architecture  
- ✅ **FullStack application**: **Angular 20** frontend and **Spring Boot 3.5.5 (Java 21)** backend  
- ✅ **GitLab CI/CD** integration and deployment on **OpenShift (Kubernetes)**  

---

**👉 Version française disponible ici** : [![Français](./ui/version-fr.png)](./README-fr.md)

---

## 🧱 Project Overview

**RAG Generator** is a working **proof of concept** demonstrating a production-grade setup for  
a Retrieval-Augmented Generation (RAG) application.  

It showcases a **modular architecture** with independent builds, pipelines, and deployments for:
- `frontend-angular` — the user interface  
- `backend-springboot` — the API layer and orchestration logic  

Each module can be built, tested, and deployed independently through **GitLab CI/CD pipelines**.  
The same Docker images are used across **local, CI, and OpenShift** environments, ensuring full reproducibility.

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
│       └── (SQL scripts)
│
├── .gitlab-ci.yml
└── README.md
```

> Each pipeline handles linting, testing, packaging, Docker image creation,  
> and deployment to OpenShift automatically.

---

## ⚙️ Components

| Component | Technology | Role |
|------------|-------------|------|
| **Frontend** | Angular 20 | User Interface |
| **Backend** | Spring Boot 3.5.5 / Java 21 | REST API, RAG orchestration |
| **Database** | PostgreSQL / Oracle | Context & embeddings storage |
| **Registry** | GitLab Container Registry | Docker image hosting |
| **Cluster** | OpenShift 4.x | Kubernetes-based deployment |

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

Coverage report:  
```
rag-generator/frontend-angular/coverage/index.html
```

### Build & Run

#### 🧩 Standard (SPA mode)
```bash
npm run build
npm run start
```
Local access (no SSR):  
```
http://localhost:4200
```

#### ⚡ Server-Side Rendering (SSR mode)
```bash
npm run build:ssr
npm run serve:ssr
```
Local access (with SSR):  
```
http://localhost:4000
```

> The SSR mode runs the Angular Universal server on Node.js for pre-rendered HTML responses, while the SPA mode serves static assets via the development server.

---

## ☕ Backend — Spring Boot 3.5.5

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

Coverage report:  
```
rag-generator/backend-springboot/target/site/jacoco/index.html
```

### Build & Run

```bash
mvn clean install
mvn spring-boot:run
```
or  
```bash
java -jar target/backend-springboot-1.0.0.jar
```

Local API:  
```
http://localhost:8080
```

> All backend tasks (lint, test, build, deploy) are automated via GitLab CI.

---

## 🐳 Docker

### Build Images

```bash
docker build -t frontend-angular:latest -f rag-generator/frontend-angular/docker/Dockerfile.frontend-angular .
docker build -t backend-springboot:latest -f rag-generator/backend-springboot/docker/Dockerfile.backend-springboot .
```

### Run Containers Locally

```bash
docker run -d --name frontend-angular -p 4000:80 frontend-angular:latest
docker run -d --name backend-springboot -p 8080:8080 backend-springboot:latest
```

> Used for local development, integration testing, and CI builds.

---

## 🚀 GitLab CI/CD

### Main Pipeline

`.gitlab-ci.yml` includes two specific pipelines:  

```yaml
include:
  - local: .gitlab/rag-generator-frontend-angular-ci.yml
  - local: .gitlab/rag-generator-backend-springboot-ci.yml
```

Each pipeline performs:
- Lint  
- Unit tests  
- Build  
- Docker image creation  
- Push to GitLab Registry  
- Deployment to OpenShift  

> Pipelines are triggered automatically on merge or tag creation.

---

## ☸️ OpenShift Deployment

### Cluster Connection

```bash
oc login https://api.openshift.example.com:6443 --token=<YOUR_TOKEN>
oc project ganatan-dev
```

### Apply Manifests

```bash
oc apply -f k8s/rag-generator-frontend-angular-deployment.yml -n ganatan-dev
oc apply -f k8s/rag-generator-backend-springboot-deployment.yml -n ganatan-dev
```

### Restart & Logs

```bash
oc rollout restart deployment/frontend-angular -n ganatan-dev
oc rollout restart deployment/backend-springboot -n ganatan-dev
oc logs -f deployment/backend-springboot -n ganatan-dev
```

### Application URLs

Frontend  
```
https://frontend-angular-ganatan-dev.apps.openshift.example.com
```

Backend  
```
https://backend-springboot-ganatan-dev.apps.openshift.example.com
```

> Deployed via Kubernetes manifests with readiness/liveness probes and auto-rollout.

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
| Infrastructure | GitLab + OpenShift | Integrated CI/CD with Kubernetes deployment |
