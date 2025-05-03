
Pattern MVC (Model-View-Controller)
Pourquoi ?

Sépare la logique métier (service) de la logique de requête (controller).
Permet une meilleure maintenabilité et facilite les tests unitaires.
💡 Application dans ton projet :

Controller (person-controller.js) : Gère les requêtes et les réponses HTTP.
Service (person-service.js) : Contient la logique métier (accès aux données).
Routes (person-route.js) : Définit les endpoints et délègue aux controllers.
2️⃣ Pattern Layered Architecture (Architecture en couches)
Pourquoi ?

Sépare les responsabilités en plusieurs couches distinctes (Routes → Controller → Service).
Améliore la scalabilité en rendant le code modulaire et réutilisable.
💡 Application dans ton projet :

Routes : Gère les URL et appelle le controller.
Controller : Gère la requête et appelle le service.
Service : Gère la logique métier et retourne les données.
3️⃣ Pattern Dependency Injection
Pourquoi ?

Permet d’injecter des dépendances sans couplage fort entre les modules.
Facilite les tests unitaires en permettant de mocker les dépendances.
💡 Application dans ton projet :

Le service est importé et utilisé dans le controller, mais il pourrait être injecté via un conteneur d’injection de dépendances.