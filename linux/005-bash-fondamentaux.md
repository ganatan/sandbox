# Bash : fondamentaux

## Vérifier le shell

```bash
echo "$SHELL"
```

## Version de Bash

```bash
bash --version
```

## Lancer Bash

```bash
bash
```

## Exécuter une commande

```bash
echo Bonjour
```

## Déclarer une variable

```bash
film="Interstellar"
```

## Lire une variable

```bash
echo "$film"
```

## Substitution de commande

```bash
date_actuelle=$(date +%F)
```

## Afficher la date

```bash
echo "$date_actuelle"
```

## Tableau

```bash
films=(Alien Dune Interstellar)
```

## Lire un élément

```bash
echo "${films[1]}"
```

## Condition

```bash
if [[ -f film.txt ]]; then echo "Fichier présent"; else echo "Absent"; fi
```

## Boucle for

```bash
for film in Alien Dune; do echo "$film"; done
```

## Boucle while

```bash
n=0; while (( n < 3 )); do echo "$n"; ((n+=1)); done
```

## Fonction

```bash
bonjour() { printf 'Bonjour %s\n' "$1"; }
```

## Appeler une fonction

```bash
bonjour Cinema
```

## Code retour

```bash
echo $?
```

## Aide intégrée

```bash
help test
```
