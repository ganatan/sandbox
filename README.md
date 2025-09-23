# 🚀 Sandbox - CI/CD & Deploy Tests

This repository is a **sandbox** to experiment with:
- **CI/CD using GitLab**
- **Building & pushing Docker images** to GitLab Registry
- **Deployment** with Docker and Kubernetes (K8s)

---

## 📂 Project Structure

```
sandbox/
 ├── .gitlab/              # GitLab CI templates and jobs
 │    └── angular/         # Angular-specific jobs
 ├── angular/              # Example Angular application
 ├── k8s/                  # Kubernetes manifests (deployment, service, ingress)
 └── .gitlab-ci.yml        # Main GitLab pipeline
```

---

## ⚙️ GitLab CI/CD

### Defined Stages
- **install**: install dependencies  
- **test**: run unit tests  
- **build**: build Angular app and Docker image  
- **deploy**: deploy (Docker / Kubernetes)  

### Example Pipeline
```yaml
stages:
  - install
  - test
  - build
  - deploy
```


## 🐳 Docker

### Build locally
```bash
cd angular
docker build -t registry.gitlab.com/<user>/<repo>/frontend-angular:latest .
docker push registry.gitlab.com/<user>/<repo>/frontend-angular:latest
```

### Run locally
```bash
docker run -d --name frontend-angular -p 4000:4000 registry.gitlab.com/<user>/<repo>/frontend-angular:latest
```

---

## ☸️ Kubernetes (K8s)

Example deployment:
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

---

## ✅ Goals

- [x] Validate full GitLab pipeline execution  
- [x] Build and publish Docker images  
- [x] Deploy to Kubernetes  

---

