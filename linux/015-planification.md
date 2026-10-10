# Planification : cron et timers

## Lister ses tâches cron

```bash
crontab -l
```

## Éditer ses tâches cron

```bash
crontab -e
```

## Exemple de tâche quotidienne

```bash
0 2 * * * /home/user/scripts/sauvegarde.sh
```

## Exemple toutes les cinq minutes

```bash
*/5 * * * * /home/user/scripts/controle.sh
```

## Rediriger les logs d'une tâche

```bash
0 2 * * * /home/user/scripts/sauvegarde.sh >> /home/user/sauvegarde.log 2>&1
```

## Lister les timers systemd

```bash
systemctl list-timers --all
```

## État d'un timer

```bash
systemctl status apt-daily.timer
```

## Afficher son unité

```bash
systemctl cat apt-daily.timer
```

## Activer un timer existant

```bash
sudo systemctl enable --now apt-daily.timer
```

## Désactiver un timer

```bash
sudo systemctl disable --now apt-daily.timer
```

## Lire ses journaux

```bash
journalctl -u apt-daily.service -n 50
```

## Vérifier la date

```bash
date
```

Les expressions cron sont des entrées de crontab, pas des commandes à exécuter directement dans le terminal.
