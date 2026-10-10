# Scripts exécutables

## Créer un script

```bash
nano lancement.sh
```

## Exemple de script

```bash
#!/usr/bin/env bash
set -euo pipefail
printf 'Démarrage application\n'
```

## Rendre exécutable

```bash
chmod +x lancement.sh
```

## Exécuter

```bash
./lancement.sh
```

## Exécuter via Bash

```bash
bash lancement.sh
```

## Vérifier la syntaxe

```bash
bash -n lancement.sh
```

## Tracer l'exécution

```bash
bash -x lancement.sh
```

## Passer des arguments

```bash
./lancement.sh Interstellar 2026
```

## Lire les arguments

```bash
printf '%s\n' "$1" "$2"
```

## Répertoire du script

```bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
```

## Tester le résultat

```bash
./lancement.sh; echo $?
```

## Exécuter en environnement contrôlé

```bash
env APPLICATION_NAME=cinema ./lancement.sh
```
