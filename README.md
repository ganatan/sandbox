# RAG Generator — Angular 20 & Spring Boot 3.5.5

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">

---

## Project Goals
- ✅ Demonstrate a complete **RAG (Retrieval-Augmented Generation)** architecture  
- ✅ **FullStack application**: **Angular 20.3.3** frontend and **Spring Boot 3.5.5 (Java 21)** backend  
- ✅ **GitLab CI/CD** integration and deployment on **OpenShift (Kubernetes)**  


---

**👉 Version française disponible ici** : [![Français](./ui/version-fr.png)](./README-fr.md)

---

## 📚 Table of Contents

- [🎯 Project Goals](#project-goals)
- [🧱 Project Overview](#project-overview)
- [🗂️ Project Structure](#project-structure)
- [⚙️ Components](#components)
- [🔧 Continuous Integration (CI)](#continuous-integration-ci)
- [📦 Docker Images](#docker-images)
- [🧩 Frontend — Angular 20](#frontend--angular-20)
- [☕ Backend — Spring Boot 3.5.5](#backend--spring-boot-355)
- [🐳 Docker](#docker)
- [🚀 GitLab CI/CD](#gitlab-cicd)
- [☸️ OpenShift Deployment](#openshift-deployment)
- [👤 Author & License](#author--license)

---

## 🧱 Project Overview

**RAG Generator** is a production-grade **proof of concept** for a Retrieval-Augmented Generation application.  
It demonstrates a modular architecture with independent builds, tests, and deployments for:
- `frontend-angular` — the UI  
- `backend-springboot` — the API and orchestration logic  

Each module can be deployed independently using GitLab CI/CD.  
Docker images are shared across local, CI, and OpenShift environments for full reproducibility.

---

## 🗂️ Project Structure

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
│   │   └── docker/Dockerfile.backend-springboot
│   │
│   ├── frontend-angular/
│   │   ├── src/
│   │   ├── package.json
│   │   └── docker/Dockerfile.frontend-angular
│   │
│   └── databases/
│       └── (SQL scripts)
│
├── .gitlab-ci.yml
└── README.md
```

> Each pipeline handles linting, testing, packaging, Docker image creation,  
> and automatic deployment on OpenShift.

---

## ⚙️ Components

| Component | Technology | Role |
|------------|-------------|------|
| Frontend | Angular 20 | User Interface |
| Backend | Spring Boot 3.5.5 / Java 21 | REST API, RAG orchestration |
| Database | PostgreSQL / Oracle | Context and embeddings storage |
| Registry | GitLab Container Registry | Docker image hosting |
| Cluster | OpenShift 4.x | Kubernetes-based deployment |

---

## 🔧 Continuous Integration (CI)

| Project | CI Badge |
|----------|-----------|
| Frontend Angular | [![Frontend Angular CI](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-frontend-angular.yml/badge.svg?branch=master)](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-frontend-angular.yml) |
| Backend Spring Boot | [![Backend Spring Boot CI](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-backend-springboot.yml/badge.svg?branch=master)](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-backend-springboot.yml) |

---

## 📦 Docker Images

| Component | Docker Image |
|------------|---------------|
| Frontend Angular | [Docker Hub — frontend-angular](https://hub.docker.com/r/ganatan/rag-generator-frontend-angular) |
| Backend Spring Boot | [Docker Hub — backend-springboot](https://hub.docker.com/r/ganatan/rag-generator-backend-springboot) |

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
`rag-generator/frontend-angular/coverage/index.html`

### Build & Run

**Standard Mode**
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
`rag-generator/backend-springboot/target/site/jacoco/index.html`

### Build & Run
```bash
mvn clean install
mvn spring-boot:run
```
or
```bash
java -jar target/backend-springboot-1.0.0.jar
```
→ http://localhost:3000

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
docker run -d --name backend-springboot -p 3000:3000 backend-springboot:latest
```

→ Frontend: http://localhost:4000  
→ Backend: http://localhost:3000

---

## 🚀 GitLab CI/CD

`.gitlab-ci.yml` includes both pipelines:

```yaml
include:
  - local: .gitlab/rag-generator-frontend-angular-ci.yml
  - local: .gitlab/rag-generator-backend-springboot-ci.yml
```

Each pipeline performs:
- Lint  
- Unit Tests  
- Build  
- Docker Image Creation  
- Push to Registry  
- OpenShift Deployment  

---

## ☸️ OpenShift Deployment

### Login
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

| Application | Environment | URL |
|--------------|--------------|-----|
| Frontend Angular | OpenShift Route | [rag-generator-frontend-angular](https://rag-generator-frontend-angular-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com) |
| Backend Spring Boot | OpenShift Route | [rag-generator-backend-springboot](https://rag-generator-backend-springboot-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com) |

---

## Author & License

**Author:** Danny — [www.ganatan.com](https://www.ganatan.com)  
**License:** MIT  
