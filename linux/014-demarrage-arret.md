# Démarrage et arrêt du système

## Durée de fonctionnement

```bash
uptime
```

## Dernier démarrage

```bash
who -b
```

## Historique des redémarrages

```bash
last reboot
```

## État du système

```bash
systemctl is-system-running
```

## Cible par défaut

```bash
systemctl get-default
```

## Lister les cibles

```bash
systemctl list-units --type=target
```

## Services en échec

```bash
systemctl --failed
```

## Journal du démarrage courant

```bash
journalctl -b -n 100
```

## Journal du démarrage précédent

```bash
journalctl -b -1 -n 100
```

## Redémarrer immédiatement

```bash
sudo systemctl reboot
```

## Arrêter immédiatement

```bash
sudo systemctl poweroff
```

## Planifier un arrêt

```bash
sudo shutdown -h +10
```

## Annuler un arrêt planifié

```bash
sudo shutdown -c
```
