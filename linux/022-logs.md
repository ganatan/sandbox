# Logs et journalisation

## Lire un journal

```bash
less application.log
```

## Dernières lignes

```bash
tail -n 100 application.log
```

## Suivre les nouvelles lignes

```bash
tail -f application.log
```

## Rechercher les erreurs

```bash
grep -n 'ERROR' application.log
```

## Rechercher plusieurs niveaux

```bash
grep -E 'ERROR|WARN' application.log
```

## Journal système récent

```bash
journalctl -n 100 --no-pager
```

## Journal de la session de démarrage

```bash
journalctl -b
```

## Logs d'un service

```bash
journalctl -u mon-application.service -n 100
```

## Suivre les logs d'un service

```bash
journalctl -u mon-application.service -f
```

## Logs depuis une date

```bash
journalctl --since '2026-10-01 00:00:00'
```

## Logs avec priorité erreur

```bash
journalctl -p err -b
```

## Taille des journaux persistants

```bash
journalctl --disk-usage
```

## Lire les logs d'un conteneur

```bash
docker logs --tail 100 mon-application
```
