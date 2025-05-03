# Installation TypeScript

## Installation globale

```bash
# Installation en global
npm install -g typescript

# Création d’un projet TypeScript
mkdir typescript-starter
cd typescript-starter

# Création du fichier `app.ts`
```
```typescript
  console.log('Movie');
```

```bash
# Compilation et exécution
tsc app
node app

# Désinstallation
npm uninstall -g typescript
```

---

## Installation locale

```bash
# Initialisation du projet
npm init -y

# Installation locale de TypeScript
npm install --save-dev typescript

# Ajout des scripts dans `package.json`
```

```json
  {
    "scripts": {
      "build": "tsc app",
      "start": "node app"
    }
  }
```

## Utilisation de watch

```bash
# Installation
npm install --save-dev nodemon ts-node

# Creation de tsconfig.json
```

```json
  {
    "compilerOptions": {
      "target": "ES6",
      "module": "CommonJS",
      "outDir": "./dist"
    },
    "include": ["src"]
  }
```

```bash
# Créer le répertoire src et copier app.ts dans src
mkdir src

# Rajouter les scripts
```

```json
  "scripts": {
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "ts-node src/app.ts",
    "watch": "nodemon --ext ts --exec ts-node src/app.ts"    
  },
```
