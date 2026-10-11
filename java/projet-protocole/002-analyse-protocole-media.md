# 002 - Analyse Protocole Media

## Objectif

Analyser la documentation fournie dans le tutoriel précédent :

[001 - Documentation Protocole Media](001-documentation-protocole-media.md)

Comprendre le protocole avant de commencer son implémentation en Java 8.

## 1. Identification

| Élément | Valeur |
|---|---|
| Nom | Media Protocol |
| Version | 1 |
| Format | Binaire |
| Transport | TCP |
| Port | 5000 |
| Ordre des octets | Big Endian |
| Langage | Indépendant |

Le protocole transmet des informations sur un film entre deux applications.

## 2. Architecture

```text
Media Emitter
      |
      | TCP : 127.0.0.1:5000
      v
Media Receiver
```

L'émetteur construit un message binaire. Le récepteur le lit, le valide et récupère les données métier.

## 3. Analyse de la trame

```text
+-------------------+
| HEADER - 8 octets |
+-------------------+
| PAYLOAD           |
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

Un message Media V1 contient exactement **16 octets**.

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

### Communication TCP

TCP transporte un flux d'octets : une lecture peut fournir moins d'octets que demandé. Le récepteur doit donc lire exactement les 8 octets d'en-tête, puis les 8 octets du payload.

### Contrôle des messages

Le récepteur doit vérifier :

- La signature du protocole.
- La version.
- Le type de message.
- La longueur du payload.
- La présence de toutes les données attendues.

Un message non conforme doit être rejeté.

### Ordre des octets

Tous les champs numériques sur plusieurs octets utilisent Big Endian.

## 6. Composants à développer

| Composant | Responsabilité |
|---|---|
| Media | Représenter les données métier |
| MediaMessage | Représenter un message du protocole |
| MediaEncoder | Convertir un message en octets |
| MediaDecoder | Reconstruire un message |
| MediaEmitter | Envoyer les données en TCP |
| MediaReceiver | Recevoir les données en TCP |

L'encodage et le décodage devront être indépendants du transport TCP.

## 7. Points à clarifier

| Sujet | Question |
|---|---|
| Connexion | Combien de temps une connexion reste-t-elle ouverte ? |
| Erreur | Fermer la connexion ou attendre un nouveau message ? |
| Timeout | Combien de temps attendre un message incomplet ? |
| Version | Comment gérer une future version 2 ? |
| Sécurité | Une authentification est-elle nécessaire ? |
| Performance | Combien de messages par seconde sont attendus ? |

Ces points devront être clarifiés ou faire l'objet d'hypothèses documentées avant une utilisation en production.

## 8. Conclusion

L'implémentation Java 8 devra :

1. Construire des messages de 16 octets.
2. Encoder et décoder les champs numériques.
3. Vérifier le format du protocole.
4. Transmettre les données sur TCP.
5. Gérer correctement les lectures partielles.
6. Rejeter les messages invalides.

La prochaine étape est la conception de l'architecture logicielle.
