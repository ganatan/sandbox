# 001 - Documentation Protocole Media

## Contexte

Document fictif transmis par un fournisseur de services multimédias pour permettre à une équipe de développer un client compatible.

**Media Protocol V1** est un protocole binaire pédagogique, indépendant de tout langage de programmation. Il permet de transmettre des informations sur un film entre deux applications.

## Transport

- TCP
- Port par défaut : `5000`
- Ordre des octets : Big Endian
- Une connexion peut transporter plusieurs messages

## Structure d'un message

| Champ | Type | Taille | Description |
|---|---|---|---|
| Magic | 2 octets | 2 | Signature `4D 50` (MP) |
| Version | uint8 | 1 | `01` |
| Type | uint8 | 1 | `01` : Media |
| Length | uint32 | 4 | Taille du payload en octets |
| Payload | variable | Length | Données métier |

La taille totale du message est `8 + Length` octets.

## Message Media (type 01)

| Champ | Type | Taille | Description |
|---|---|---|---|
| id | int32 | 4 | Identifiant du film |
| year | int32 | 4 | Année du film |

Le payload Media mesure exactement 8 octets.

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

## Règles de réception

1. Lire exactement les 8 octets d'en-tête.
2. Vérifier la signature `4D 50`, la version `01` et le type `01`.
3. Vérifier que la longueur annoncée vaut `8` pour ce type.
4. Lire exactement 8 octets de payload.
5. Décoder `id` et `year` en Big Endian.
6. Rejeter un message invalide ou incomplet.

## Objectif de l'étude

À partir de cette seule documentation, analyser le protocole puis développer un émetteur et un récepteur Java 8 compatibles, sans Maven ni dépendance externe.

> Document entièrement fictif, sans affiliation avec Netflix ou un autre fournisseur réel.
