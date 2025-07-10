ma structure backend-javascript-cjs

Structure of src:
|-- app.js
|-- infrastructure
  |-- middleware
    |-- error
      |-- error-handler.js
      |-- __tests__
        |-- unit
          |-- error-handler.test.js
    |-- security
      |-- security.js
  |-- swagger
    |-- swagger.config.js
    |-- swagger.routes.js
|-- modules
  |-- city
    |-- city.controller.js
    |-- city.mock-data.js
    |-- city.routes.js
    |-- city.schema.js
    |-- city.service.js
    |-- city.swagger.js
    |-- __tests__
      |-- unit
        |-- city.test.js
  |-- person
    |-- person.controller.js
    |-- person.mock-data.js
    |-- person.swagger.js
    |-- __tests__
      |-- unit
        |-- person.test.js
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


que manque t'il pour appliquer express-pro  