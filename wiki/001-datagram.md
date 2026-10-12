# Datagram

## Définition

Un **datagramme** est une unité autonome de données envoyée sur un réseau. Il contient les informations nécessaires à son acheminement et peut être transmis indépendamment des autres datagrammes.

UDP (User Datagram Protocol) est un protocole de transport qui échange des datagrammes sans établir de connexion préalable.

## Fonctionnement

1. L'émetteur prépare les données.
2. Il indique l'adresse IP et le port du destinataire.
3. Il envoie un datagramme UDP.
4. Le réseau tente de l'acheminer.
5. Le récepteur lit les données si le datagramme arrive.

UDP ne garantit ni la livraison, ni l'ordre d'arrivée, ni l'absence de doublons. Chaque datagramme conserve ses limites de message.

## Structure

Un datagramme UDP contient un en-tête de **8 octets** et une charge utile.

| Champ | Taille | Rôle |
|---|---|---|
| Port source | 16 bits | Port de l'émetteur |
| Port destination | 16 bits | Port du récepteur |
| Longueur | 16 bits | Taille de l'en-tête et des données UDP |
| Checksum | 16 bits | Contrôle d'intégrité |
| Données | Variable | Contenu applicatif |

L'en-tête IP entoure le datagramme UDP pour son transport sur le réseau.

## Datagramme et socket

- **Datagramme** : message transporté sur le réseau.
- **Socket** : interface logicielle utilisée par une application pour envoyer ou recevoir des données.
- **Port** : numéro permettant d'identifier un point de communication sur une machine.

Une socket UDP permet d'envoyer et de recevoir des datagrammes.

## Exemple radar ou sonar

Un système de détection peut envoyer périodiquement la position d'une cible :

```json
{
  "name": "target-001",
  "distance": 1200
}
```

Exemple de configuration locale :

```env
UDP_ADDRESS=127.0.0.1
UDP_PORT=5000
UDP_INTERVAL_MS=1000
```

L'émetteur envoie un datagramme toutes les secondes. Le récepteur écoute le port 5000 et traite chaque message reçu.

Si un datagramme est perdu, UDP ne le retransmet pas automatiquement. Pour des mesures actualisées fréquemment, l'application peut privilégier les données les plus récentes plutôt que d'attendre les anciennes.

## UDP et TCP

| UDP | TCP |
|---|---|
| Sans connexion préalable | Connexion établie avant l'échange |
| Transmission par datagrammes | Flux d'octets |
| Livraison non garantie | Livraison fiable et ordonnée tant que la connexion fonctionne |
| Faible surcharge protocolaire | Gestion des accusés de réception et retransmissions |
| Adapté aux mesures temps réel tolérant des pertes | Adapté aux échanges nécessitant une transmission fiable |

## À retenir

Un datagramme est un message indépendant. UDP transporte ces messages rapidement et simplement, sans garantir leur arrivée. Une socket est le mécanisme utilisé par le programme pour communiquer.
