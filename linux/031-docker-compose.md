# Docker Compose

## Version

```bash
docker compose version
```

## Exemple compose.yaml

```yaml
services:
  web:
    image: nginx:stable
    ports:
      - "8080:80"
```

## Valider

```bash
docker compose config
```

## Démarrer

```bash
docker compose up -d
```

## État

```bash
docker compose ps
```

## Logs

```bash
docker compose logs -f
```

## Logs service

```bash
docker compose logs -f web
```

## Exécuter

```bash
docker compose exec web nginx -v
```

## Redémarrer

```bash
docker compose restart web
```

## Arrêter

```bash
docker compose stop
```

## Reprendre

```bash
docker compose start
```

## Construire

```bash
docker compose build
```

## Recréer

```bash
docker compose up -d --build
```

## Supprimer conteneurs

```bash
docker compose down
```

## Supprimer aussi volumes avec précaution

```bash
docker compose down -v
```

## Images utilisées

```bash
docker compose images
```
