# dependances
  npm init -y
  npm install express dotenv openai
  npm install -D typescript ts-node @types/node @types/express


# tsconfig.json

  npx tsc --init

  {
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}


# scripts

"scripts": {
  "dev": "ts-node src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js"
}


# fichier .env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


# fichier 

.gitignore

/node_modules/
/.history/
/data/logs/
/dist
/coverage
package-lock.json
.env
