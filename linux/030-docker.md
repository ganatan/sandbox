# Docker sous Linux

## Version

```bash
docker --version
```

## Service

```bash
systemctl status docker
```

## Informations

```bash
docker info
```

## Images

```bash
docker images
```

## Télécharger

```bash
docker pull nginx:stable
```

## Créer conteneur

```bash
docker run -d --name web -p 8080:80 nginx:stable
```

## Liste actifs

```bash
docker ps
```

## Tous les conteneurs

```bash
docker ps -a
```

## Logs

```bash
docker logs -f web
```

## Exécuter

```bash
docker exec web nginx -v
```

## Arrêter

```bash
docker stop web
```

## Redémarrer

```bash
docker start web
```

## Supprimer

```bash
docker rm web
```

## Volumes

```bash
docker volume ls
```

## Inspecter

```bash
docker inspect web
```

## Ressources

```bash
docker stats --no-stream
```

## Nettoyer inutilisé

```bash
docker system prune
```
