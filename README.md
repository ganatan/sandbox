# Starters

Ce dépôt regroupe plusieurs **starters** (projets de démarrage) pour différents environnements et technologies.  
Chaque starter est conçu comme un projet minimal fonctionnel, prêt à être utilisé, testé et enrichi.

---

## 📂 Structure du dépôt

```
002-STARTERS/
├── .gitlab/                # Pipelines GitLab CI/CD spécifiques
│   ├── angular/            # Templates CI pour Angular
│   └── springboot/         # Templates CI pour Spring Boot
│
├── angular/                # Starters Angular
│   ├── bootstrap/          # Angular + Bootstrap
│   ├── eslint/             # Angular + ESLint (linting)
│   ├── ssr/                # Angular Universal (Server Side Rendering)
│   └── starter/            # Starter Angular minimal
│
├── javascript/             # Starter Node.js / JavaScript
│
├── springboot/             # Starters Spring Boot
│   ├── checkstyle/         # Starter avec Checkstyle
│   ├── coverage/           # Starter avec tests + JaCoCo/Coverage
│   ├── crud/               # CRUD simple
│   ├── crud-jpa/           # CRUD avec JPA
│   ├── crud-layered/       # CRUD architecture en couches
│   ├── kafka/              # Intégration Kafka
│   ├── logging/            # Starter logging avancé
│   ├── oracle/             # Starter Spring Boot + Oracle
│   ├── oracle-jdbc/        # Starter Oracle via JDBC
│   ├── rabbitmq/           # Intégration RabbitMQ
│   └── starter/            # Starter Spring Boot minimal
│
├── .gitignore              # Fichiers ignorés par Git
├── .gitlab-ci.yml          # Entrée principale pour les pipelines CI/CD
└── README.md               # Documentation principale
```

---

## 🚀 Objectif

L’objectif de ce dépôt est de fournir une **base commune** pour différents types de projets :

- **Angular** : frontend moderne avec SSR, Bootstrap, linting.
- **JavaScript (Node.js)** : backend simple en JavaScript.
- **Spring Boot (Java)** : backends prêts à l’emploi avec différentes intégrations (Oracle, Kafka, RabbitMQ, etc.).

Chaque projet est pensé pour être **rapide à cloner et exécuter**, avec des exemples de **CI/CD GitLab** intégrés.

---

## ⚙️ CI/CD

- Les templates GitLab sont stockés dans `.gitlab/angular` et `.gitlab/springboot`.
- Le fichier racine `.gitlab-ci.yml` inclut les templates adaptés.
- Grâce aux règles (`rules: changes`), seuls les pipelines des dossiers modifiés se déclenchent.

---

## ▶️ Démarrage rapide

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

## 📌 Notes

- Chaque starter peut être utilisé comme **base pédagogique** ou comme **base projet réelle**.
- Les intégrations avancées (Kafka, RabbitMQ, Oracle, etc.) sont fournies sous forme de starters dédiés.
- Les tests unitaires, la couverture et l’intégration continue sont inclus progressivement selon les starters.
