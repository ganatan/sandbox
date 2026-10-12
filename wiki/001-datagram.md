# Datagram

## Définition

Un **datagramme** est une unité autonome de données transmise sur un réseau.

UDP (**User Datagram Protocol**) est un protocole de transport qui permet d'envoyer des datagrammes sans établir de connexion préalable.

## Fonctionnement

1. L'émetteur prépare un message.
2. Il précise l'adresse IP et le port du destinataire.
3. Il envoie un datagramme UDP.
4. Le réseau tente de l'acheminer.
5. Le récepteur récupère le message s'il arrive.

UDP ne garantit ni la livraison, ni l'ordre d'arrivée, ni l'absence de doublons. Il conserve en revanche les frontières entre messages.

## Structure

Un datagramme UDP contient un en-tête de **8 octets** et des données.

| Champ | Taille | Rôle |
|---|---|---|
| Port source | 16 bits | Port de l'émetteur |
| Port destination | 16 bits | Port du récepteur |
| Longueur | 16 bits | Taille totale UDP |
| Checksum | 16 bits | Contrôle d'intégrité |
| Données | Variable | Contenu applicatif |

Le datagramme UDP est encapsulé dans un paquet IP.

## Datagramme, socket et port

- **Datagramme** : message indépendant envoyé sur le réseau.
- **Socket** : interface logicielle permettant à une application de communiquer.
- **Port** : numéro identifiant un point de communication sur une machine.

Une socket UDP permet d'envoyer ou de recevoir des datagrammes.

## Exemple : média

Une application de cinéma transmet périodiquement les informations d'un média :

```json
{
  "id": 1001,
  "title": "Interstellar",
  "movie": true
}
```

Configuration locale :

```env
UDP_ADDRESS=127.0.0.1
UDP_PORT=5000
UDP_INTERVAL_MS=1000
```

L'émetteur envoie un datagramme toutes les secondes. Le récepteur écoute le port 5000 et affiche les informations du média reçu.

Si un datagramme est perdu, UDP ne le retransmet pas automatiquement. L'application doit prévoir une stratégie si chaque message est indispensable.

## UDP et TCP

| UDP | TCP |
|---|---|
| Sans connexion préalable | Connexion établie avant les échanges |
| Messages indépendants | Flux d'octets |
| Livraison non garantie | Transmission fiable et ordonnée pendant une connexion fonctionnelle |
| Pas de retransmission automatique | Retransmission et contrôle de flux |
| Adapté aux messages dont la perte est acceptable | Adapté aux échanges nécessitant une livraison fiable |

## À retenir

Un **datagramme** est un message autonome. **UDP** permet de le transmettre sans connexion préalable, mais sans garantie de livraison. Une **socket** est l'interface utilisée par le programme pour communiquer.
