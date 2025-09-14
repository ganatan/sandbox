# prompt 1

que penses tu de ma structure baceknd javascript


Structure of src:
|-- app.js
|-- features
  |-- city
    |-- city-controller.js
    |-- city-repository.js
    |-- city-routes.js
    |-- city-service.js
  |-- person
    |-- person-controller.js
    |-- person-repository.js
    |-- person-routes.js
    |-- person-service.js
|-- features-routes.js
|-- index-routes.js
|-- middleware
  |-- response-handler.js
|-- server.js

Structure of __tests__:
|-- app.test.js
|-- server.test.js

Structure of tools:
|-- scripts
  |-- generate-structure.js


# prompt 2

pour le cas de config


server.js 
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default server;

et mon fichier .env
PORT=3000

qu'en penses tu



