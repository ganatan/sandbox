

Non, req n'est pas utilisé dans cette route, mais il est nécessaire pour respecter la signature de la fonction de callback d'Express.

Explication
Dans Express, une route suit cette structure :

javascript
Copier
Modifier
router.get('/route', (req, res) => {
  res.json(data);
});
Le paramètre req (request) est inclus par convention et peut être utilisé pour :

Lire les paramètres de requête (req.query, req.params)
Accéder aux headers (req.headers)
Lire le corps (req.body en POST)
Dans ton cas, comme req n'est pas utilisé, tu peux techniquement l'omettre, mais ce n'est pas recommandé.

Options
1️⃣ Conserver req (bonne pratique)

javascript
Copier
Modifier
router.get('/persons', (req, res) => {
  res.json(persons);
});
Cela garantit que si tu dois utiliser req plus tard (ex: req.query pour filtrer), tu n’auras pas besoin de modifier la signature.

2️⃣ Supprimer req (possible mais déconseillé)

javascript
Copier
Modifier
router.get('/persons', (_, res) => {
  res.json(persons);
});
L'underscore _ indique que le paramètre n'est pas utilisé, ce qui est acceptable mais peu courant.

Conclusion
Garde req, même s'il n'est pas utilisé. C'est la convention en Express et cela évite des modifications futures. 🚀