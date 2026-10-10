# Certificats TLS et OpenSSL

## Version OpenSSL

```bash
openssl version
```

## Afficher un certificat PEM

```bash
openssl x509 -in certificat.pem -text -noout
```

## Dates de validité

```bash
openssl x509 -in certificat.pem -noout -dates
```

## Sujet du certificat

```bash
openssl x509 -in certificat.pem -noout -subject
```

## Émetteur

```bash
openssl x509 -in certificat.pem -noout -issuer
```

## Empreinte SHA256

```bash
openssl x509 -in certificat.pem -noout -fingerprint -sha256
```

## Tester un endpoint TLS

```bash
openssl s_client -connect example.com:443 -servername example.com </dev/null
```

## Afficher les en-têtes HTTPS

```bash
curl -I https://example.com
```

## Vérifier le certificat avec curl

```bash
curl -v https://example.com
```

## Créer une clé privée locale de test

```bash
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out test.key
```

## Créer un certificat auto-signé de test

```bash
openssl req -x509 -new -key test.key -sha256 -days 30 -subj '/CN=localhost' -out test.crt
```

## Vérifier une chaîne avec une CA

```bash
openssl verify -CAfile ca.pem certificat.pem
```
