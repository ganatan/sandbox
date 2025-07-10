# initialisation

Je veux ameliorer mon application backend avec java et maven

Mes outils 

	Jakarta 21
	Java 21
	Tomcat 11
	Eclipse Version: 2025-12 (4.34.0)


Je veux que le projet s'appelle backend-java-prototype

il doit etre le plus simple possible 


voila mon architecture java
- src
  - main
    - java
      - com
        - ganatan
          - servlets
            - Person.java
            - PersonsServlet.java
          - tools
            - GenerateStructure.java
    - resources
    - webapp
      - WEB-INF
        - web.xml
  - test
    - java
      - com
        - ganatan
          - servlets
            - PersonsServletTest.java
          - tools
            - GenerateStructureTest.java
    - resources


je veux m'inspirer de mon projet backend-javascript-prototype
pour respecter les best practices


voila mon architecture javascript

Structure of src:
|-- app.js
|-- config
  |-- config.js
|-- features
  |-- city
    |-- city-controller.js
    |-- city-repository.js
    |-- city-routes.js
    |-- city-service.js
    |-- __tests__
      |-- city-controller.test.js
      |-- city-repository.test.js
      |-- city-routes.test.js
      |-- city-service.test.js
  |-- person
    |-- person-controller.js
    |-- person-repository.js
    |-- person-routes.js
    |-- person-service.js
    |-- __tests__
      |-- person-controller.test.js
      |-- person-repository.test.js
      |-- person-routes.test.js
      |-- person-service.test.js
|-- features-routes.js
|-- index-routes.js
|-- middleware
  |-- response-handler.js
  |-- __tests__
    |-- response-handler.test.js
|-- server.js

Structure of __tests__:
|-- app.test.js
|-- server.test.js

Structure of tools:
|-- scripts
  |-- generate-structure.js



Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.



donne moi aussi ton avis sur cette architecture et les best practices à respecter