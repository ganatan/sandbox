
npm install express cors
npm install --save-dev @types/express @types/cors



# !!!!!!!!!!!!!!!!!!!!!!!!!!!!

attention à la version d'express

    "express": "4.21.1",

# !!!!!!!!!!!!!!!!!!!!!!!!!!!!
Modifier


tsconfig.json


{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
