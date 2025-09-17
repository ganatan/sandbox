Problème : Jest ne peut pas tester directement un fichier qui lance un listen()
Donc, on ne peut pas tester app.js directement sans modification, car il démarre le serveur immédiatement.


donc on decompose
  server.js pour le listen
  app.js pour les requetes