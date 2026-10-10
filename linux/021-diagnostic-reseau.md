# Diagnostic réseau

## Interfaces réseau

```bash
ip -brief addr
```

## Routes

```bash
ip route
```

## Passerelle par défaut

```bash
ip route show default
```

## Tester la connectivité IP

```bash
ping -c 4 1.1.1.1
```

## Tester la résolution DNS

```bash
getent hosts example.com
```

## Tester le port distant

```bash
nc -vz example.com 443
```

## Inspecter HTTPS

```bash
curl -Iv https://example.com
```

## Analyser les temps HTTP

```bash
curl -o /dev/null -sS -w '%{http_code} %{time_total}\n' https://example.com
```

## Écoutes TCP

```bash
ss -ltnp
```

## Écoutes UDP

```bash
ss -lunp
```

## Traceroute si installé

```bash
traceroute example.com
```

## Tester la route avec tracepath

```bash
tracepath example.com
```

## État NetworkManager si installé

```bash
nmcli device status
```

## Statistiques réseau

```bash
ip -s link
```
