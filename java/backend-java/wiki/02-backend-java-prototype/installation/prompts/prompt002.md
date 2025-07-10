mon architecture
backend-javascript-prototype


Structure of src:
|-- app.js
|-- config
  |-- config.js
  |-- database.js
|-- middlewares
  |-- response-handler.js
  |-- __tests__
    |-- response-handler.test.js
|-- modules
  |-- city
    |-- city.controller.js
    |-- city.mock-data.js
    |-- city.repository.js
    |-- city.repository.mock.js
    |-- city.router.js
    |-- city.service.js
    |-- __tests__
      |-- city.controller.test.js
      |-- city.repository.test.js
      |-- city.router.test.js
      |-- city.service.test.js
  |-- person
    |-- person.controller.js
    |-- person.mock-data.js
    |-- person.repository.js
    |-- person.repository.mock.js
    |-- person.repository.pg.js
    |-- person.router.js
    |-- person.service.js
    |-- __tests__
      |-- person.controller.test.js
      |-- person.repository.test.js
      |-- person.router.test.js
      |-- person.service.test.js
|-- modules.router.js
|-- root.router.js
|-- server.js

Structure of __tests__:
|-- app.test.js
|-- server.test.js

Structure of tools:
|-- scripts
  |-- generate-module.js
  |-- generate-project-structure.js





mon architecture java

backend-java-prototype

- src
  - main
    - java
      - com
        - ganatan
          - modules
            - person
              - Person.java
              - PersonController.java
              - PersonRepository.java
              - PersonService.java
          - tools
            - GenerateProjectStructure.java
    - resources
    - webapp
      - WEB-INF
        - web.xml
  - test
    - java
      - com
        - ganatan
          - modules
            - person
              - PersonControllerTest.java
          - tools
            - GenerateProjectStructureTest.java
    - resources


improve

