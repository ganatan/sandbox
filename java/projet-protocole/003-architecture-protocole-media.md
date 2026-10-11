# 003 - Architecture Protocole Media

## Objectif

Définir l'architecture logicielle pour implémenter Media Protocol V1 en Java 8.

Documents de référence :

- [001 - Documentation Protocole Media](001-documentation-protocole-media.md)
- [002 - Analyse Protocole Media](002-analyse-protocole-media.md)

Contraintes : Java 8, sans Maven, sans dépendance externe, communication UDP, messages binaires, compilation avec `javac` et livraison en JAR.

## 1. Architecture générale

Trois projets Java indépendants :

```text
                  media-protocol.jar
                          |
              +-----------+-----------+
              |                       |
              v                       v
        media-emitter           media-receiver
              |                       ^
              +-------- UDP ----------+
                     Port 5000
```

- `media-protocol` définit les messages et les règles de codage.
- `media-emitter` construit et transmet les messages.
- `media-receiver` reçoit et décode les messages.

## 2. Projet media-protocol

Bibliothèque sans communication réseau :

```text
media-protocol/
└── src/
    ├── Media.java
    ├── MediaMessage.java
    ├── MediaEncoder.java
    ├── MediaDecoder.java
    └── ProtocolException.java
```

| Classe | Responsabilité |
|---|---|
| Media | Représenter un film : `id` et `year` |
| MediaMessage | Contenir la version, le type et l'objet Media |
| MediaEncoder | Convertir un message en `byte[16]` |
| MediaDecoder | Valider et reconstruire un message depuis `byte[16]` |
| ProtocolException | Signaler une erreur de protocole |

`MediaEncoder` et `MediaDecoder` sont indépendants d'UDP.

## 3. Projet media-emitter

```text
media-emitter/
└── src/
    └── Main.java
```

Fonctionnement :

```text
Media → MediaMessage → MediaEncoder → byte[16]
        → DatagramPacket → DatagramSocket → UDP
```

L'émetteur envoie un message à `127.0.0.1:5000`, puis s'arrête.

## 4. Projet media-receiver

```text
media-receiver/
└── src/
    └── Main.java
```

Fonctionnement :

```text
DatagramSocket → DatagramPacket → byte[]
        → MediaDecoder → MediaMessage → Media → Console
```

Le récepteur écoute en continu sur le port `5000`.

À chaque réception, il conserve la longueur réelle du datagramme, décode et affiche le message valide, puis continue son écoute. Un datagramme invalide est ignoré.

Le tampon de réception sera de 1024 octets, afin de distinguer les messages de 16 octets des datagrammes trop longs ordinaires. La réception UDP peut tronquer les datagrammes plus grands que le tampon ; pour cette V1, tout message reçu d'une taille différente de 16 octets est rejeté.

## 5. Format binaire

| Champ | Taille | Valeur |
|---|---|---|
| Magic | 2 octets | 4D 50 |
| Version | 1 octet | 01 |
| Type | 1 octet | 01 |
| Length | 4 octets | 8 |
| ID | 4 octets | 1 |
| Year | 4 octets | 2024 |
| **Total** | **16 octets** | |

Exemple en Big Endian :

```text
4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
```

## 6. Livrables JAR

```text
media-protocol/build/media-protocol.jar
media-emitter/build/media-emitter.jar
media-receiver/build/media-receiver.jar
```

`media-emitter` et `media-receiver` utilisent `media-protocol.jar` via le classpath, sans Maven ni autre outil de construction.

## 7. Configuration

| Variable | Projet | Défaut |
|---|---|---|
| UDP_ADDRESS | Emitter | 127.0.0.1 |
| UDP_PORT | Emitter / Receiver | 5000 |

Les variables sont facultatives.

## 8. Gestion des erreurs

| Erreur | Composant |
|---|---|
| Signature invalide | MediaDecoder |
| Version inconnue | MediaDecoder |
| Type inconnu | MediaDecoder |
| Longueur invalide | MediaDecoder |
| Payload incomplet | MediaDecoder |
| Échec d'envoi UDP | MediaEmitter |
| Échec de réception UDP | MediaReceiver |

`MediaDecoder` lève une `ProtocolException` pour les messages non conformes. Le récepteur intercepte cette exception et poursuit son écoute. Les erreurs réseau sont distinctes des erreurs de protocole.

## 9. Tests prévus

- Encoder un objet `Media`.
- Décoder un message binaire.
- Vérifier les 16 octets exacts.
- Rejeter les messages incorrects.
- Tester l'échange UDP entre deux processus.
- Compiler et exécuter les applications en Java 8 avec `media-protocol.jar`.

## 10. Conclusion

`media-protocol` centralise le format et la validation.

`media-emitter` sérialise et émet les données en UDP.

`media-receiver` reçoit, valide et décode les datagrammes.

Prochaine étape : implémentation de la bibliothèque `media-protocol` en Java 8.
