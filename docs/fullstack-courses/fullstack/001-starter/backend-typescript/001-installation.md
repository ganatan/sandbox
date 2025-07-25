
- creer le fichier package.json et ses dependances
  npm init -y
  npm install express
  npm install --save-dev typescript ts-node @types/node @types/express

- Creer le fichier de config
  npx tsc --init

- Rajouter un script
  "scripts": {
    "start": "ts-node app.ts"
  }


- Remaquer Erreur peut etre sur 
  npm install --save-dev @types/express
  npm install --save-dev @types/express@4

