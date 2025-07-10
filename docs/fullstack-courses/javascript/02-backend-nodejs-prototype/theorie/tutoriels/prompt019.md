Ajout d’un Repository : Pourquoi et Quel Pattern ?
📌 Quel est le pattern utilisé ?
L’ajout d’un repository suit le Repository Pattern, souvent utilisé avec l’architecture en couches (Layered Architecture).

📌 Quel est l’intérêt ?
✅ Encapsulation de l’accès aux données : Le service ne connaît pas la source des données (BDD, API, Mock, etc.).
✅ Facilité de changement de source : On peut remplacer un fichier JSON par une base de données sans modifier le service.
✅ Testabilité accrue : On peut mocker facilement le repository lors des tests unitaires.

