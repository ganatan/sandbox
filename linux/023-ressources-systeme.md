# Ressources système : CPU, mémoire, disque

## Charge système

```bash
uptime
```

## Surveillance temps réel

```bash
top
```

## Utilisation mémoire

```bash
free -h
```

## Espace disque

```bash
df -h
```

## Inodes disponibles

```bash
df -i
```

## Taille d'un répertoire

```bash
du -sh dossier/
```

## Plus gros sous-dossiers

```bash
du -h --max-depth=1 . | sort -h
```

## Vue des disques

```bash
lsblk -f
```

## Informations CPU

```bash
lscpu
```

## Processus les plus consommateurs de CPU

```bash
ps aux --sort=-%cpu | head
```

## Processus les plus consommateurs de mémoire

```bash
ps aux --sort=-%mem | head
```

## Statistiques mémoire virtuelle

```bash
vmstat 1 5
```

## Descripteurs ouverts d'un PID

```bash
lsof -p 1234
```

## Limites du shell

```bash
ulimit -a
```
