
# Concepts

  # HTTP
    protocole standard (RFC 2616)
    fonctionne en requête/réponse
    → le client envoie une requête
    → le serveur répond
    → la connexion est fermée
    sans état (stateless)
    sur TCP (généralement port 80/443)
    chaque nouvelle requête = nouvelle connexion (sauf keep-alive mais toujours en mode requête/réponse)
    pas de push serveur → le client doit redemander périodiquement (polling)

  # WebSocket
    protocole plus récent (RFC 6455)

    démarre par une requête HTTP d’upgrade
    → handshake
    → si accepté → bascule en mode WebSocket

    la connexion reste ouverte et persistante

    communication bidirectionnelle temps réel
    → le client peut envoyer à tout moment
    → le serveur peut envoyer à tout moment

    pas besoin de recréer une connexion à chaque message
    très faible latence

    idéal pour :
      chat
      monitoring
      jeux temps réel
      IoT

# Mise en pratique dans le code

 la ligne côté serveur :

  const wss = new WebSocketServer({ port: 8080 })
  → crée le serveur WebSocket
  → il écoute en réalité une requête HTTP classique au départ
  → quand il reçoit un Upgrade: websocket, il bascule automatiquement vers le protocole WebSocket

👉 la ligne côté client :

  ws = new WebSocket('ws://localhost:8080')
  → envoie une requête HTTP avec l’en-tête Upgrade: websocket
  → si le serveur accepte (status 101 Switching Protocols)
  → la connexion devient un tunnel WebSocket

démarre par requête HTTP → handshake → 101 Switching Protocols → socket temps réel
tout le handshake est géré en interne par la lib ws côté Node et l’API WebSocket côté navigateur
