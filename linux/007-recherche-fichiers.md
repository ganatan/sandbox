# Recherche de fichiers et de texte

## Rechercher par nom

```bash
find . -name '*.java'
```

## Recherche insensible à la casse

```bash
find . -iname '*.jar'
```

## Fichiers seulement

```bash
find . -type f
```

## Répertoires seulement

```bash
find . -type d
```

## Limiter la profondeur

```bash
find . -maxdepth 2 -type f
```

## Fichiers modifiés depuis un jour

```bash
find . -type f -mtime -1
```

## Fichiers volumineux

```bash
find . -type f -size +100M
```

## Rechercher une chaîne

```bash
grep -n 'ERROR' application.log
```

## Rechercher dans un dossier

```bash
grep -rn 'TODO' src/
```

## Ignorer la casse

```bash
grep -i 'error' application.log
```

## Afficher le contexte

```bash
grep -C 3 'ERROR' application.log
```

## Lister les fichiers correspondants

```bash
grep -rl 'TODO' src/
```

## Rechercher plusieurs motifs

```bash
grep -E 'ERROR|WARN' application.log
```

## Recherche de commande

```bash
command -v java
```
