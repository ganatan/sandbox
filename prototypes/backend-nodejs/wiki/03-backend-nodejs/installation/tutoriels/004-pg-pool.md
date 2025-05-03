Pourquoi ?

pool.query permet d’exécuter une requête directement via le pool de connexions, qui gère automatiquement les connexions.
Il n'est pas nécessaire d’obtenir une connexion manuellement car pool.query gère l’emprunt et la libération de la connexion en interne.
Idéal pour les requêtes simples et rapides, comme un SELECT.


Différence clé
pool.query est simple et suffisant pour des requêtes SELECT.
pool.connect() est nécessaire quand on veut gérer une transaction ou plusieurs requêtes dans une seule connexion.
🚀 Bonne pratique : Utiliser pool.query autant que possible et pool.connect() uniquement pour des transactions ou des opérations complexes.