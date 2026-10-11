# 001 - Documentation Protocole Media

## Contexte

Document fournisseur **entièrement fictif**, utilisé pour étudier un protocole de communication industriel.

**Media Protocol V1** est un protocole binaire, indépendant du langage de programmation, destiné à transmettre des informations sur un film entre deux applications.

## Transport

- UDP, en datagrammes
- Adresse de destination par défaut : `127.0.0.1`
- Port de destination et d'écoute par défaut : `5000`
- Ordre des octets : Big Endian
- Un datagramme contient exactement un message Media Protocol V1
- Pas de connexion préalable, d'accusé de réception ni de retransmission définis par le protocole V1

UDP ne garantit ni la livraison, ni l'ordre, ni l'unicité des datagrammes.

## Structure d'un message

| Champ | Type | Taille | Description |
|---|---|---|---|
| Magic | 2 octets | 2 | Signature `4D 50` (MP) |
| Version | uint8 | 1 | `01` |
| Type | uint8 | 1 | `01` : Media |
| Length | uint32 | 4 | Taille du payload en octets |
| Payload | variable | Length | Données métier |

La taille du message UDP utile est `8 + Length` octets, hors en-têtes IP et UDP.

## Message Media (type 01)

| Champ | Type | Taille | Description |
|---|---|---|---|
| id | int32 | 4 | Identifiant du film |
| year | int32 | 4 | Année du film |

Le payload Media V1 mesure exactement 8 octets. Le datagramme Media V1 doit donc contenir exactement **16 octets de données**.

## Exemple

Film : id = 1, year = 2024.

```text
4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
```

Décodage :

```text
Magic   : MP
Version : 1
Type    : Media
Length  : 8
ID      : 1
Year    : 2024
```

## Règles d'émission

1. Construire l'en-tête et le payload en Big Endian.
2. Former un message de 16 octets.
3. Envoyer ce message dans un seul datagramme UDP à l'adresse et au port du récepteur.

## Règles de réception

1. Recevoir un datagramme UDP complet, en conservant sa longueur réelle.
2. Vérifier que le datagramme contient exactement 16 octets.
3. Vérifier la signature `4D 50`, la version `01` et le type `01`.
4. Vérifier que le champ Length vaut `8`.
5. Décoder les champs `id` et `year` en Big Endian.
6. Rejeter le datagramme invalide sans interrompre l'écoute des suivants.

## Objectif de l'étude

À partir de cette documentation, analyser le protocole puis développer un émetteur UDP et un récepteur UDP en Java 8, sans Maven ni dépendance externe.

> Document entièrement fictif, sans affiliation avec Netflix ou un autre fournisseur réel.
