

La raison pour laquelle 00000000001:database s'affiche avant 00000000001:person-routes est liée à l'importation des modules en ES Modules (import).


Explication du comportement
Lorsque person-routes.js est importé quelque part (app.js, features-routes.js, etc.),

Le moteur JavaScript commence à analyser et exécuter person-routes.js.
Il rencontre import pool from '../../config/database.js'.
Dès que le moteur voit cet import (database.js),

Il charge et exécute database.js avant de continuer l’exécution de person-routes.js.
console.log('00000000001:database') s'affiche.
Une fois database.js exécuté, il retourne pool à person-routes.js.

Maintenant, person-routes.js continue son exécution.
console.log('00000000001:person-routes') s'affiche ensuite.
📌 Règle des imports en JavaScript
Les modules importés sont exécutés immédiatement lors de leur premier appel.
Si un module (person-routes.js) importe un autre module (database.js), ce dernier sera exécuté avant que le code du premier ne continue.