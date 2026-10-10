# Automatisation et scripts de maintenance

## Vérifier la version de Bash

```bash
bash --version
```

## Créer un répertoire pour les scripts

```bash
mkdir -p "$HOME/scripts"
```

## Éditer un script

```bash
nano "$HOME/scripts/maintenance.sh"
```

## Exemple de script

```bash
#!/usr/bin/env bash
set -euo pipefail
printf 'Maintenance : %s\n' "$(date -Is)"
df -h "$HOME"
```

## Contrôler la syntaxe

```bash
bash -n "$HOME/scripts/maintenance.sh"
```

## Autoriser l'exécution

```bash
chmod +x "$HOME/scripts/maintenance.sh"
```

## Exécuter

```bash
"$HOME/scripts/maintenance.sh"
```

## Conserver une trace

```bash
"$HOME/scripts/maintenance.sh" >> "$HOME/maintenance.log" 2>&1
```

## Consulter la trace

```bash
tail -n 30 "$HOME/maintenance.log"
```

## Lister les tâches planifiées

```bash
crontab -l
```

## Éditer la planification

```bash
crontab -e
```

## Exemple de planification quotidienne

```bash
0 2 * * * /home/user/scripts/maintenance.sh
```

## Lister les timers

```bash
systemctl list-timers --all
```

## Tester un script en mode trace

```bash
bash -x "$HOME/scripts/maintenance.sh"
```

## Afficher le code retour

```bash
echo $?
```

Les chemins des exemples sont à adapter au compte Linux utilisé. Une ligne crontab se place dans `crontab -e`, pas directement dans le shell.
