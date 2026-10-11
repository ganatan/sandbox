# 009 - Revue Technique Protocole Media

## Objectif

Réaliser une revue technique de Media Protocol V1 afin d'identifier les limites de son implémentation et les améliorations nécessaires.

La revue examine la conformité documentaire, le format binaire, UDP, la gestion des erreurs, les tests et la livraison.

Java 8, sans Maven ni dépendance externe.

## 1. Documents de référence

- [001 - Documentation Protocole Media](001-documentation-protocole-media.md)
- [002 - Analyse Protocole Media](002-analyse-protocole-media.md)
- [003 - Architecture Protocole Media](003-architecture-protocole-media.md)
- [004 - Implémentation Protocole Media](004-implementation-protocole-media.md)
- [005 - Implémentation Media Emitter](005-implementation-media-emitter.md)
- [006 - Implémentation Media Receiver](006-implementation-media-receiver.md)
- [007 - Tests et Validation Protocole Media](007-tests-validation-protocole-media.md)
- [008 - Packaging et Livraison Protocole Media](008-packaging-livraison-protocole-media.md)

## 2. Architecture

```text
                 media-protocol.jar
                         |
              +----------+----------+
              |                     |
              v                     v
        media-emitter.jar     media-receiver.jar
              |                     ^
              +-------- UDP --------+
                     Port 5000
```

La bibliothèque centralise l'encodage et le décodage. Les applications sont indépendantes.

## 3. Format binaire

| Champ | Taille | Valeur |
|---|---|---|
| Magic | 2 octets | 4D 50 |
| Version | 1 octet | 01 |
| Type | 1 octet | 01 |
| Length | 4 octets | 8 |
| ID | 4 octets | 1 |
| Year | 4 octets | 2024 |
| Total | 16 octets | |

```text
4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
```

Le format est déterministe. Des règles métier restent à préciser : identifiants et années négatifs ou nuls, et futurs types de messages.

## 4. Communication UDP

Chaque datagramme contient un message complet. UDP ne garantit ni la livraison, ni l'ordre, ni l'unicité des messages.

```text
Emitter                     Receiver
Message 1  -----------------> Reçu
Message 2  -------X           Perdu
Message 3  -----------------> Reçu
```

Une future version pourrait ajouter un numéro de séquence pour détecter les ruptures ; cela nécessite une nouvelle spécification.

## 5. Intégrité

Le décodeur vérifie la signature, la version, le type et la longueur. Ces contrôles ne détectent pas toutes les altérations accidentelles du payload.

Un CRC pourrait être ajouté dans une version ultérieure. Il ne protège pas contre une modification volontaire : ce n'est pas un mécanisme cryptographique.

## 6. Gestion des erreurs

`ProtocolException` identifie les problèmes de décodage.

| Code envisagé | Erreur |
|---|---|
| MP-001 | Signature invalide |
| MP-002 | Version inconnue |
| MP-003 | Type inconnu |
| MP-004 | Longueur invalide |
| MP-005 | Message incomplet |

Ces codes ne sont pas encore implémentés.

## 7. Configuration

| Variable | Défaut |
|---|---|
| UDP_ADDRESS | 127.0.0.1 |
| UDP_PORT | 5000 |

Améliorations : contrôler le port (1 à 65535), permettre une adresse d'écoute paramétrable et gérer proprement les erreurs de configuration.

## 8. Bibliothèque Java

| Classe | Responsabilité |
|---|---|
| Media | Données métier |
| MediaMessage | Message |
| MediaEncoder | Encodage |
| MediaDecoder | Décodage et validation |
| ProtocolException | Erreur de protocole |

Améliorations envisagées : packages Java explicites, constantes centralisées et gestion du versionnement.

## 9. Tests

Les tutoriels définissent sept tests automatisés et deux scénarios d'intégration. Leur réussite effective reste à confirmer par exécution.

Tests complémentaires recommandés :

- Plusieurs datagrammes successifs.
- Datagramme vide ou trop long.
- Valeurs métier invalides selon les règles retenues.
- Récepteur absent ou port déjà occupé.
- Datagrams désordonnés ou dupliqués.
- Rejet d'un message incorrect suivi de la réception d'un message correct.

## 10. Packaging

```text
media-protocol-release/
├── lib/
│   └── media-protocol.jar
├── media-emitter.jar
└── media-receiver.jar
```

Améliorations : versions de livrables, README de déploiement, scripts Windows et Linux, empreintes SHA-256 et archivage des résultats de validation.

## 11. Synthèse des risques

| Sujet | Risque | Priorité à confirmer |
|---|---|---|
| Pertes UDP | Messages non reçus | Haute selon le besoin métier |
| Doublons | Traitements répétés | Moyenne |
| Désordre | Traitements non séquentiels | Moyenne |
| Absence de CRC applicatif | Altérations non couvertes par les contrôles métier | Selon le besoin |
| Versionnement | Incompatibilité future | Moyenne |
| Configuration invalide | Échec au démarrage | Moyenne |
| Tests non exécutés | Conformité non démontrée | Haute |

## 12. Décisions pour Media Protocol V1

1. Conserver les messages de 16 octets.
2. Conserver UDP.
3. Conserver un seul type de message.
4. Conserver la bibliothèque indépendante du transport.
5. Ne pas ajouter de CRC ni de numéro de séquence en V1.
6. Documenter les limites.
7. Exécuter les tests avant de déclarer une livraison validée.

Les modifications de format seront étudiées dans une éventuelle V2.

## 13. Conclusion

Cette revue clôt le premier cycle documentaire : documentation fournisseur fictive, analyse, architecture, implémentation, tests, packaging et revue technique.

**Media Protocol V1 reste pédagogique ; son aptitude à un usage industriel n'est pas démontrée sans tests exécutés et exigences opérationnelles formalisées.**
