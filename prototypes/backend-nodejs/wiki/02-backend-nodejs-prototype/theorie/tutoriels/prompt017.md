
Pourquoi cette approche ?
✅ Injection de dépendances : le service est passé en paramètre au contrôleur, ce qui permet de le remplacer facilement pour les tests.
✅ Modularité : possibilité de changer de service sans modifier le contrôleur.
✅ Facilité de test : injection d’un mock de person-service.js pour les tests unitaires. 🚀