# Variables d'environnement

## Lister l'environnement

```bash
printenv
```

## Afficher PATH

```bash
printf '%s\n' "$PATH"
```

## Définir pour le shell

```bash
export APPLICATION_NAME=cinema
```

## Lire une variable

```bash
echo "$APPLICATION_NAME"
```

## Valeur par défaut

```bash
echo "${SERVER_PORT:-3000}"
```

## Définir si absente

```bash
export SERVER_PORT="${SERVER_PORT:-3000}"
```

## Limiter à une commande

```bash
SERVER_PORT=3000 java -jar app.jar
```

## Supprimer une variable

```bash
unset APPLICATION_NAME
```

## Ajouter au PATH temporairement

```bash
export PATH="$HOME/bin:$PATH"
```

## Charger un fichier d'environnement fiable

```bash
set -a; source .env; set +a
```

## Configuration Bash utilisateur

```bash
nano ~/.bashrc
```

## Recharger Bash utilisateur

```bash
source ~/.bashrc
```

## Afficher le chemin Java

```bash
command -v java
```

## Afficher les variables Java

```bash
printenv JAVA_HOME
```
