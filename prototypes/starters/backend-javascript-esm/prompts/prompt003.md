
ma structure backend-javascript-esm

Structure of project root:
|-- .babelrc
|-- .dockerignore
|-- Dockerfile
|-- eslint.config.js
|-- jest.config.mjs
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- README.en.md
|-- README.md
|-- src
  |-- app.js
  |-- infrastructure
    |-- middleware
      |-- security
        |-- security.js
    |-- swagger
      |-- swagger.config.js
      |-- swagger.routes.js
  |-- modules
    |-- person
      |-- person.controller.js
      |-- person.mock-data.js
      |-- person.swagger.js
      |-- __tests__
        |-- unit
          |-- person.controller.test.js
  |-- routers
    |-- app.routes.js
    |-- root.routes.js
  |-- server.js
  |-- __tests__
    |-- e2e
      |-- server.e2e.test.js
    |-- integration
      |-- app.test.js
      |-- server.test.js
|-- tools
  |-- scripts
    |-- generate-project-structure.js
|-- webpack.config.js


je veux rajouter un fichier de config

et 2 fichiers .env
.env.development
.env.production

comme ceci
app.config.js
env.js

dis moi comment faire