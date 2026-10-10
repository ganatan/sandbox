# HTTP et curl

## GET simple

```bash
curl http://localhost:3000
```

## GET et code de statut

```bash
curl -i http://localhost:3000
```

## En-têtes seulement

```bash
curl -I https://example.com
```

## POST JSON

```bash
curl -X POST http://localhost:3000/api/medias -H 'Content-Type: application/json' -d '{"title":"Interstellar"}'
```

## PUT JSON

```bash
curl -X PUT http://localhost:3000/api/medias/1 -H 'Content-Type: application/json' -d '{"title":"Dune"}'
```

## DELETE

```bash
curl -X DELETE http://localhost:3000/api/medias/1
```

## Ajouter un Bearer token

```bash
curl -H 'Authorization: Bearer TOKEN' http://localhost:3000/api/medias
```

## Afficher les échanges

```bash
curl -v https://example.com
```

## Suivre les redirections

```bash
curl -L https://example.com
```

## Échouer sur erreur HTTP

```bash
curl --fail-with-body http://localhost:3000/api/medias
```

## Timeout de connexion

```bash
curl --connect-timeout 5 http://localhost:3000
```

## Timeout total

```bash
curl --max-time 10 http://localhost:3000
```

## Enregistrer la réponse

```bash
curl -o resultat.json http://localhost:3000/api/medias
```

## Afficher uniquement le code HTTP

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3000
```
