# prompt

Je veux rajouter swagger



mon architecture javascript

Structure of src:
|-- app.js
|-- infrastructure
  |-- middleware
    |-- security
      |-- security.js
|-- modules
  |-- person
    |-- person.controller.js
    |-- person.mock-data.js
    |-- __tests__
      |-- unit
        |-- person.controller.test.js
|-- routers
  |-- app.routes.js
  |-- root.routes.js
|-- server.js

Structure of __tests__:
|-- e2e
  |-- server.e2e.test.js
|-- integration
  |-- app.test.js
  |-- server.test.js

Structure of tools:
|-- scripts
  |-- generate-project-structure.js

je veux utiliser swagger

dans 
infrastructure/swagger

je veux un fichier swagger pas dans le code
mais person.swagger.js

comment faire


concernant swagger

api-docs fonctionne
mais apres le build avec dist il ne fonctionne pas 
pourquoi