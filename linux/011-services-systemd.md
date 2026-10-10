# Gestion des services : systemd

## Lister les services

```bash
systemctl list-units --type=service
```

## État d'un service

```bash
systemctl status ssh
```

## Démarrer un service

```bash
sudo systemctl start ssh
```

## Arrêter un service

```bash
sudo systemctl stop ssh
```

## Redémarrer

```bash
sudo systemctl restart ssh
```

## Recharger sa configuration

```bash
sudo systemctl reload ssh
```

## Activer au démarrage

```bash
sudo systemctl enable ssh
```

## Désactiver au démarrage

```bash
sudo systemctl disable ssh
```

## Vérifier l'activation

```bash
systemctl is-enabled ssh
```

## Vérifier l'activité

```bash
systemctl is-active ssh
```

## Lire les logs

```bash
journalctl -u ssh -n 50 --no-pager
```

## Suivre les logs

```bash
journalctl -u ssh -f
```

## Afficher un fichier d'unité

```bash
systemctl cat ssh
```

## Recharger les unités après modification

```bash
sudo systemctl daemon-reload
```
