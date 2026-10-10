# Ports et connexions TCP/UDP

## Ports TCP en écoute

```bash
ss -ltn
```

## Ports UDP en écoute

```bash
ss -lun
```

## Processus et ports TCP

```bash
sudo ss -ltnp
```

## Toutes les connexions TCP

```bash
ss -tn
```

## Filtrer le port 3000

```bash
ss -ltnp '( sport = :3000 )'
```

## Processus d'un port

```bash
sudo lsof -nP -iTCP:3000 -sTCP:LISTEN
```

## Tester un port TCP

```bash
nc -vz 127.0.0.1 3000
```

## Tester HTTP

```bash
curl -v http://127.0.0.1:3000
```

## Voir les interfaces

```bash
ip -brief addr
```

## Voir les routes

```bash
ip route
```

## Envoyer un datagramme UDP

```bash
printf 'test\n' | nc -u -w1 127.0.0.1 5000
```

## Lire les statistiques TCP

```bash
ss -s
```
