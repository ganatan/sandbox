# Starters

This repository contains several **starters** (bootstrap projects) for different environments and technologies.  
Each starter is designed as a minimal functional project, ready to be used, tested, and extended.

---

**👉 Version française disponible ici** : [![Français](./ui/version-fr.png)](./README.md)

---

## 📂 Repository Structure

```
002-STARTERS/
├── .gitlab/                # GitLab CI/CD pipelines
│   ├── angular/            # CI templates for Angular
│   └── springboot/         # CI templates for Spring Boot
│
├── angular/                # Angular starters
│   ├── bootstrap/          # Angular + Bootstrap
│   ├── eslint/             # Angular + ESLint (linting)
│   ├── ssr/                # Angular Universal (Server Side Rendering)
│   └── starter/            # Minimal Angular starter
│
├── javascript/             # Node.js / JavaScript starter
│
├── springboot/             # Spring Boot starters
│   ├── checkstyle/         # Starter with Checkstyle
│   ├── coverage/           # Starter with tests + JaCoCo/Coverage
│   ├── crud/               # Simple CRUD
│   ├── crud-jpa/           # CRUD with JPA
│   ├── crud-layered/       # Layered architecture CRUD
│   ├── kafka/              # Kafka integration
│   ├── logging/            # Advanced logging starter
│   ├── oracle/             # Spring Boot + Oracle starter
│   ├── oracle-jdbc/        # Oracle with JDBC starter
│   ├── rabbitmq/           # RabbitMQ integration
│   └── starter/            # Minimal Spring Boot starter
│
├── .gitignore              # Git ignored files
├── .gitlab-ci.yml          # Main entry for CI/CD pipelines
└── README.md               # Main documentation
```

---

## 🚀 Purpose

The purpose of this repository is to provide a **common base** for different kinds of projects:

- **Angular**: modern frontend with SSR, Bootstrap, and linting.
- **JavaScript (Node.js)**: simple backend in JavaScript.
- **Spring Boot (Java)**: production-ready backends with integrations (Oracle, Kafka, RabbitMQ, etc.).

Each project is built to be **quick to clone and run**, with ready-to-use **GitLab CI/CD examples**.

---

## ⚙️ CI/CD

- GitLab templates are stored in `.gitlab/angular` and `.gitlab/springboot`.
- The root `.gitlab-ci.yml` includes the proper templates.
- Thanks to `rules: changes`, only pipelines for modified folders are triggered.

---

## ▶️ Quick Start

### Angular

```bash
cd angular/starter
npm install
npm run start
```

### JavaScript (Node.js)

```bash
cd javascript
npm install
npm run start
```

### Spring Boot

```bash
cd springboot/starter
mvn spring-boot:run
```

---

