Respecter SOLID dans les tests
SOLID est un ensemble de 5 principes qui améliorent la maintenabilité du code. Voici comment les appliquer aux tests :

Principe	Application dans les tests
S - Single Responsibility	Chaque test doit tester une seule responsabilité d'une classe. Ex : person-repository.test.js ne doit tester que le repository.
O - Open/Closed	Ne modifie pas les tests existants, ajoute-en de nouveaux si tu veux tester un nouveau comportement.
L - Liskov Substitution	Si tu remplaces un repository par un mock, assure-toi qu'il se comporte de la même manière.
I - Interface Segregation	Ne mélange pas les tests unitaires et d’intégration. Les tests unitaires doivent se concentrer sur une seule classe.
D - Dependency Inversion	Utilise des mocks pour tester les dépendances, surtout dans person-service.test.js et person-controller.test.js.



 2. Ordre des tests à exécuter
L’ordre optimal pour exécuter les tests respecte la hiérarchie Bottom-Up : du plus bas niveau (Repository) au plus haut niveau (Routes).

Ordre recommandé : 1️⃣ person-repository.test.js → Vérifier la persistance des données.
2️⃣ person-service.test.js → Tester la logique métier avec des mocks du repository.
3️⃣ person-controller.test.js → Tester les contrôleurs avec un service mocké.
4️⃣ person-routes.test.js → Tester l’intégration complète avec Express + Supertest.

Pourquoi cet ordre ?

On s’assure d’abord que le repository fonctionne bien.
On teste ensuite la logique métier avec person-service.test.js.
On teste ensuite le contrôleur, qui dépend du service.
Enfin, on fait un test d'intégration avec person-routes.test.js pour tout valider.
📌 3. Best practices pour les tests
✅ 1. Utiliser beforeEach() pour instancier les dépendances
Au lieu de recréer un repository/service à chaque test :

javascript
Copier
Modifier
let repository;
let service;

beforeEach(() => {
  repository = new PersonRepository();
  service = new PersonService(repository);
});
✅ 2. Toujours tester les cas "heureux" ET "malheureux"
Chaque fonction doit être testée avec :

Cas valide ✅ (Ex: récupérer un id existant).
Cas invalide ❌ (Ex: récupérer un id inexistant → devrait renvoyer null ou 404).
Exemple pour getItemById() :

javascript
Copier
Modifier
test('getItemById should return a person by ID', async () => {
  const person = await repository.getItemById(1);
  expect(person).toEqual({ id: 1, name: 'Steven Spielberg', city: 'Cincinnati' });
});

test('getItemById should return null if person is not found', async () => {
  const person = await repository.getItemById(999);
  expect(person).toBeNull();
});
✅ 3. Utiliser des mocks pour les dépendances
Dans person-service.test.js, ne teste pas le repository. Mocke-le pour isoler les tests :

javascript
Copier
Modifier
const mockRepository = {
  getItems: jest.fn().mockResolvedValue([{ id: 1, name: 'John Doe' }]),
  getItemById: jest.fn().mockResolvedValue(null),
};

const service = new PersonService(mockRepository);
✅ 4. Vérifier les erreurs avec .rejects.toThrow()
Si une fonction doit lever une erreur, on la teste comme ça :

javascript
Copier
Modifier
await expect(service.createItem(null)).rejects.toThrow('Invalid data');
✅ 5. Les tests d'intégration (person-routes.test.js) doivent utiliser supertest
Utilise request(app).get('/persons') pour tester l'API.
Vérifie les statuts HTTP (res.status) et le format de réponse (res.body).
Assure-toi que les cas d'erreur (404, 500) sont bien gérés.
Exemple pour un test de GET /persons/:id :

javascript
Copier
Modifier
test('GET /persons/:id should return 404 if person not found', async () => {
  const res = await request(app).get('/persons/999');

  expect(res.status).toBe(404);
  expect(res.body).toHaveProperty('message', 'Person not found');
});
🎯 Résumé : Les 6 règles d'or
1️⃣ Toujours tester en suivant l’ordre : Repository → Service → Controller → Routes.
2️⃣ Mocker les dépendances pour tester uniquement la classe concernée.
3️⃣ Tester les cas valides et invalides (200, 404, 500).
4️⃣ Utiliser beforeEach() pour initialiser les dépendances proprement.
5️⃣ Tester les erreurs avec .rejects.toThrow() dans les services.
6️⃣ Pour les tests d’API (routes.test.js) : Vérifier les statuts HTTP et le format de réponse.

🔥 Si tu appliques ces conseils, tes tests seront plus propres, maintenables et conformes à SOLID !