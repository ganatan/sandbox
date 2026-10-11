# 002 - Analyse Protocole Media

## Objectif

Analyser la [001 - Documentation Protocole Media](001-documentation-protocole-media.md) avant toute implémentation Java 8.

## 1. Identification

| Élément | Valeur |
|---|---|
| Nom | Media Protocol |
| Version | 1 |
| Format | Binaire |
| Transport | UDP |
| Adresse par défaut | 127.0.0.1 |
| Port | 5000 |
| Ordre des octets | Big Endian |
| Langage | Indépendant |

Le protocole transmet des informations sur un film d'une application vers une autre.

## 2. Architecture

```text
Media Emitter
      |
      | Datagramme UDP : 127.0.0.1:5000
      | 16 octets
      v
Media Receiver
```

Les deux processus sont indépendants. L'émetteur envoie des datagrammes sans établir de connexion. Le récepteur écoute sur un port UDP, valide les données reçues et restitue les informations métier.

## 3. Analyse de la trame

```text
+-------------------+
| HEADER - 8 octets |
+-------------------+
| PAYLOAD - 8 octets|
+-------------------+
```

### Header

| Champ | Taille | Valeur attendue |
|---|---|---|
| Magic | 2 octets | 4D 50 |
| Version | 1 octet | 01 |
| Type | 1 octet | 01 |
| Length | 4 octets | 8 pour Media |

### Payload Media

| Champ | Taille | Type |
|---|---|---|
| id | 4 octets | int32 |
| year | 4 octets | int32 |

Un message Media V1 occupe exactement **16 octets**, transmis dans un seul datagramme UDP.

## 4. Analyse d'un message

```text
4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
```

```text
4D 50          Magic
01             Version
01             Type
00 00 00 08    Length
00 00 00 01    ID
00 00 07 E8    Year
```

Résultat attendu :

```text
Media
ID   : 1
Year : 2024
```

## 5. Analyse des contraintes

### Communication UDP

UDP conserve les frontières des datagrammes : une réception traite un datagramme, pas un flux continu comme TCP.

L'application doit utiliser un tampon assez grand pour détecter les messages anormalement longs : un tampon limité à 16 octets pourrait tronquer silencieusement un datagramme plus grand et masquer sa longueur réelle.

UDP ne garantit ni la livraison, ni l'ordre, ni l'unicité. Media Protocol V1 n'ajoute ni accusé de réception ni retransmission.

### Contrôle des messages

Le récepteur doit vérifier :

- La longueur réelle : exactement 16 octets.
- La signature : `4D 50`.
- La version : `01`.
- Le type : `01`.
- La longueur annoncée : `8`.

Un datagramme non conforme est ignoré, sans arrêter le récepteur.

### Ordre des octets

Les entiers sur plusieurs octets sont codés en Big Endian.

## 6. Composants à développer

| Composant | Responsabilité |
|---|---|
| Media | Représenter les données métier |
| MediaMessage | Représenter un message du protocole |
| MediaEncoder | Convertir le message en octets |
| MediaDecoder | Valider et décoder les octets |
| MediaEmitter | Envoyer un datagramme UDP |
| MediaReceiver | Recevoir et traiter les datagrammes UDP |

La bibliothèque d'encodage/décodage reste indépendante du transport réseau. `DatagramSocket` et `DatagramPacket` sont disponibles en Java 8.

## 7. Points à clarifier

| Sujet | Question |
|---|---|
| Perte | Les messages perdus doivent-ils être retransmis ? |
| Ordre | Faut-il détecter les messages reçus dans le désordre ? |
| Doublons | Faut-il éliminer les messages reçus plusieurs fois ? |
| Fréquence | Combien de messages par seconde sont attendus ? |
| Sécurité | Faut-il authentifier l'émetteur ou protéger le contenu ? |
| Version | Comment faire évoluer le protocole V1 ? |
| Réseau | Faut-il prévoir du multicast ou uniquement de l'unicast ? |

Ces points ne sont pas définis par la documentation fictive V1 : ils devront être clarifiés avant un usage réel.

## 8. Conclusion

L'implémentation Java 8 devra :

1. Construire des messages binaires de 16 octets.
2. Encoder et décoder les champs numériques en Big Endian.
3. Transmettre chaque message dans un datagramme UDP.
4. Vérifier la longueur réelle du datagramme et les champs du protocole.
5. Rejeter les messages invalides sans interrompre l'écoute.
6. Tester l'envoi et la réception entre deux processus indépendants.

La prochaine étape est la conception de l'architecture logicielle.
