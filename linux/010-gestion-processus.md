# Gestion des processus

## Liste des processus

```bash
ps aux
```

## Processus de l'utilisateur

```bash
ps -u "$USER"
```

## Filtrer Java

```bash
pgrep -af java
```

## Filtrer Node

```bash
pgrep -af node
```

## Surveiller les processus

```bash
top
```

## Afficher un PID

```bash
echo $$
```

## Afficher un arbre de processus

```bash
pstree -p
```

## Envoyer SIGTERM

```bash
kill -TERM 1234
```

## Envoyer SIGKILL en dernier recours

```bash
kill -KILL 1234
```

## Terminer par nom exact

```bash
pkill -x java
```

## Afficher les tâches du shell

```bash
jobs -l
```

## Lancer en arrière-plan

```bash
sleep 60 &
```

## Récupérer au premier plan

```bash
fg %1
```

## Attendre un processus fils

```bash
wait
```

## Chercher le processus d'un port

```bash
sudo lsof -nP -iTCP:3000 -sTCP:LISTEN
```
