# 🚀 RAG Generator — Angular 20 & Spring Boot 3.5.5  

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">

---

## 🎯 Project Goals  
- ✅ Demonstrate a complete **RAG (Retrieval-Augmented Generation)** architecture  
- ✅ **FullStack application**: **Angular 20.3.3** frontend and **Spring Boot 3.5.5 (Java 21)** backend  
- ✅ **GitLab CI/CD** integration and deployment on **OpenShift (Kubernetes)**  

---

**👉 Version française disponible ici** : [![Français](./ui/version-fr.png)](./README-fr.md)

---

## 📚 Table of Contents

- [🎯 Project Goals](#-project-goals)
- [🧱 Project Overview](#-project-overview)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Components](#️-components)
- [🔧 Continuous Integration (CI)](#-continuous-integration-ci)
- [📦 Docker Images](#-docker-images)
- [🧩 Frontend — Angular 20](#-frontend--angular-20)
- [☕ Backend — Spring Boot 3.5.5](#-backend--spring-boot-355)
- [🐳 Docker](#-docker)
- [🚀 GitLab CI/CD](#-gitlab-cicd)
- [☸️ OpenShift Deployment](#️-openshift-deployment)
- [🧠 Technical Stack](#-technical-stack)

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

| 🔧 Component | 🧩 Technology | 🧠 Role |
|--------------|---------------|----------|
| **Frontend** | Angular 20 | User Interface |
| **Backend** | Spring Boot 3.5.5 / Java 21 | REST API, RAG orchestration |
| **Database** | PostgreSQL / Oracle | Context & embeddings storage |
| **Registry** | GitLab Container Registry | Docker image hosting |
| **Cluster** | OpenShift 4.x | Kubernetes-based deployment |

---

## 🔧 Continuous Integration (CI)

| Project                      | CI Badge |
|-----------------------------|----------|
| Frontend Angular            | [![Frontend Angular CI](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-frontend-angular.yml/badge.svg?branch=master)](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-frontend-angular.yml) |
| Backend Spring Boot           | [![Backend Spring Boot CI](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-backend-springboot.yml/badge.svg?branch=master)](https://github.com/ganatan/sandbox/actions/workflows/rag-generator-backend-springboot.yml) |

---

## 📦 Docker Images

| Component                   | Docker Badge |
|----------------------------|---------------|
| Frontend Angular             | [![Docker Image Version - Frontend Angular](https://img.shields.io/docker/v/ganatan/rag-generator-frontend-angular?label=Frontend%20Angular%20Docker&logo=docker&sort=semver)](https://hub.docker.com/r/ganatan/rag-generator-frontend-angular) |
| Backend Spring Boot          | [![Docker Image Version - Backend Spring Boot](https://img.shields.io/docker/v/ganatan/rag-generator-backend-springboot?label=Backend%20SpringBoot%20Docker&logo=docker&sort=semver)](https://hub.docker.com/r/ganatan/rag-generator-backend-springboot) |


---

## 🧩 Frontend — Angular 20.3.3

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

Coverage report:  
```
rag-generator/frontend-angular/coverage/index.html
```

### ⚡ Build & Run

#### 🧩 Standard Mode
```bash
npm run build
npm run start
```
Local access (no SSR):  
👉 [http://localhost:4200](http://localhost:4200)

#### ⚡ Server-Side Rendering (SSR mode)
```bash
npm run build:ssr
npm run serve:ssr
```
Local access (with SSR):  
👉 [http://localhost:4000](http://localhost:4000)

> SSR mode uses Angular Universal for pre-rendered HTML on Node.js.  
> Standard mode serves static assets via the dev server.

---

## ☕ Backend — Spring Boot 3.5.5

### 🔍 Static Analysis
```bash
cd rag-generator/backend-springboot
mvn checkstyle:check
```

### ✅ Unit Tests & Coverage
```bash
mvn clean test
mvn jacoco:report
```

Coverage report:  
```
rag-generator/backend-springboot/target/site/jacoco/index.html
```

### ⚡ Build & Run
```bash
mvn clean install
mvn spring-boot:run
```
or  
```bash
java -jar target/backend-springboot-1.0.0.jar
```

Local API:  
👉 [http://localhost:3000](http://localhost:3000)

> All backend tasks (lint, test, build, deploy) are automated via GitLab CI.

---

## 🐳 Docker

### 🧰 Build Images (from sandbox root)
```bash
cd sandbox
docker build -t frontend-angular:latest -f rag-generator/frontend-angular/docker/Dockerfile.frontend-angular .
docker build -t backend-springboot:latest -f rag-generator/backend-springboot/docker/Dockerfile.backend-springboot .
```

### ▶️ Run Containers Locally
```bash
cd sandbox
docker run -d --name frontend-angular -p 4000:80 frontend-angular:latest
docker run -d --name backend-springboot -p 3000:3000 backend-springboot:latest
```

Once running:

- **Frontend (Angular SPA / SSR)** → [http://localhost:4000](http://localhost:4000)  
- **Backend (Spring Boot API)** → [http://localhost:3000](http://localhost:3000)

> Both containers can be executed simultaneously.  
> This setup mirrors the CI/CD and OpenShift configuration.

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

> Pipelines trigger automatically on **merge** or **tag creation**.

---

## ☸️ OpenShift Deployment

### 🔐 Cluster Connection
```bash
oc login https://api.openshift.example.com:6443 --token=<YOUR_TOKEN>
oc project ganatan-dev
```

### ⚙️ Apply Manifests
```bash
oc apply -f k8s/rag-generator-frontend-angular-deployment.yml -n ganatan-dev
oc apply -f k8s/rag-generator-backend-springboot-deployment.yml -n ganatan-dev
```

### 🔁 Restart & Logs
```bash
oc rollout restart deployment/frontend-angular -n ganatan-dev
oc rollout restart deployment/backend-springboot -n ganatan-dev
oc logs -f deployment/backend-springboot -n ganatan-dev
```

### 🌐 Application URLs
| Application | Environment   | URL |
|--------------|----------------|-----|
| **Frontend Angular** | OpenShift Route | 🔗 [rag-generator-frontend-angular](https://rag-generator-frontend-angular-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com) |
| **Backend Spring Boot** | OpenShift Route | 🔗 [rag-generator-backend-springboot](https://rag-generator-backend-springboot-route-ganatan-dev.apps.rm2.thpm.p1.openshiftapps.com) |

> Routes are automatically generated by OpenShift during deployment.  
> Each URL corresponds to the service exposed within the `ganatan-dev` namespace.

---

## 🧠 Technical Stack

| Layer | Technology | Version |
|--------|-------------|----------|
| Frontend | Angular | 20.x |
| Backend | Spring Boot | 3.5.x |
| Java | 21 |
| CI/CD | GitLab | SaaS / Self-Hosted |
| Deployment | OpenShift | 4.14+ |
| Containers | Docker | 24+ |
| Code Quality | ESLint / Checkstyle | - |
| Tests | Jasmine / JUnit / JaCoCo | - |
| Infrastructure | GitLab + OpenShift | Integrated CI/CD with Kubernetes deployment |
