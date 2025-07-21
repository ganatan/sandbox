
Méthode	    Endpoint	        Description

GET	        /persons	        Récupérer la liste de toutes les personnes (avec cache Redis)
GET	        /persons/:id	    Récupérer une personne par son ID
POST	      /persons	        Créer une nouvelle personne
PUT	        /persons/:id	    Mettre à jour une personne existante
DELETE	    /persons/:id	    Supprimer une personne



Endpoint	              Cas à tester

GET /persons	          200 OK (cache hit / cache miss)
GET /persons/:id	      200 OK (valide), 400 BadRequest (ID invalide), 404 Not Found
POST /persons	          201 Created, 400 BadRequest (payload invalide), 409 Conflict (doublon)
PUT /persons/:id	      200 OK, 400 BadRequest (ID ou payload invalide), 404 Not Found
DELETE /persons/:id	    200 OK, 400 BadRequest (ID invalide), 404 Not Found


Endpoint	              Code	Erreur / Cause

GET /persons/:id	      400	            ID invalide (non numérique ou ≤ 0)
GET /persons/:id	      404	            Personne non trouvée (ITEM_CONSTANTS.NOT_FOUND)

POST /persons	          400	            Payload invalide (schéma JSON non respecté)
POST /persons	          409	            Conflit (personne existante : ITEM_CONSTANTS.ALREADY_EXISTS)

PUT /persons/:id	      400	            ID invalide (non numérique ou ≤ 0)
PUT /persons/:id	      400	            Payload invalide (schéma JSON non respecté)
PUT /persons/:id	      404	            Personne non trouvée (ITEM_CONSTANTS.NOT_FOUND)

DELETE /persons/:id	    400	            ID invalide (non numérique ou ≤ 0)
DELETE /persons/:id	    404	            Personne non trouvée (ITEM_CONSTANTS.NOT_FOUND)