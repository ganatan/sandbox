# Java 8 - Récepteur UDP

## Principe

Créer une application Java 8 qui écoute un port UDP et affiche chaque datagramme reçu.

- Adresse d'écoute par défaut : `127.0.0.1`
- Port par défaut : `5000`
- Bibliothèques : Java standard
- Maven : non nécessaire
- Compatible avec [009 - Émetteur UDP](009-udp-emitter.md)

UDP ne garantit ni la livraison ni l'ordre des messages.

## Structure du projet

```text
java-udp-receiver/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) throws Exception {

        String address = System.getenv().getOrDefault("UDP_ADDRESS", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("UDP_PORT", "5000"));

        InetAddress interfaceAddress = InetAddress.getByName(address);

        try (DatagramSocket socket = new DatagramSocket(null)) {

            socket.bind(new InetSocketAddress(interfaceAddress, port));

            System.out.println("UDP écoute -> " + address + ":" + port);

            byte[] buffer = new byte[65507];

            while (true) {

                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

                socket.receive(packet);

                String message = new String(
                    packet.getData(),
                    packet.getOffset(),
                    packet.getLength(),
                    StandardCharsets.UTF_8
                );

                System.out.println(
                    "UDP <- " + packet.getAddress().getHostAddress()
                    + ":" + packet.getPort() + " " + message
                );
            }
        }
    }
}
```

## Compilation Windows

Depuis la racine du projet :

```bat
mkdir build
javac -d build src/Main.java
```

## Exécution Windows

```bat
java -cp build Main
```

## Compilation Linux

```bash
mkdir -p build
javac -d build src/Main.java
```

## Exécution Linux

```bash
java -cp build Main
```

## Résultat

Lancer le récepteur avant l'émetteur, dans deux terminaux distincts.

```text
UDP écoute -> 127.0.0.1:5000
UDP <- 127.0.0.1:54321 {"name":"target-001","distance":1100}
UDP <- 127.0.0.1:54321 {"name":"target-002","distance":1200}
UDP <- 127.0.0.1:54321 {"name":"target-003","distance":1300}
```

Le port source `54321` est un exemple : l'émetteur utilise un port local attribué automatiquement.

## Modifier la configuration Windows

```bat
set UDP_ADDRESS=127.0.0.1
set UDP_PORT=6000

java -cp build Main
```

## Modifier la configuration Linux

```bash
export UDP_ADDRESS=127.0.0.1
export UDP_PORT=6000

java -cp build Main
```

Configurer également `UDP_PORT=6000` côté émetteur.

## Écouter sur toutes les interfaces

```bash
export UDP_ADDRESS=0.0.0.0
java -cp build Main
```

`0.0.0.0` est une adresse d'écoute et ne doit pas être utilisée comme destination par l'émetteur. Pour recevoir depuis une autre machine, utiliser son adresse IP joignable dans `UDP_ADDRESS` côté émetteur et autoriser le port UDP dans le pare-feu.

## Classes utilisées

| Classe | Utilité |
|---|---|
| `DatagramSocket` | Ouvrir la socket UDP |
| `InetSocketAddress` | Définir l'adresse et le port locaux |
| `DatagramPacket` | Recevoir les données et les informations de l'expéditeur |
| `InetAddress` | Résoudre l'adresse d'écoute |
| `StandardCharsets.UTF_8` | Décoder les octets reçus |

## Méthodes essentielles

| Méthode | Utilité |
|---|---|
| `socket.bind()` | Associer la socket à l'adresse et au port |
| `socket.receive()` | Attendre et recevoir un datagramme |
| `packet.getLength()` | Obtenir la longueur effectivement reçue |
| `packet.getAddress()` | Obtenir l'IP de l'expéditeur |
| `packet.getPort()` | Obtenir le port de l'expéditeur |

## Arrêter l'application

```text
Ctrl + C
```

## À retenir

- `receive()` est bloquant : il attend un datagramme.
- Le récepteur doit écouter le même port que celui utilisé comme destination par l'émetteur.
- Le contenu JSON est affiché comme du texte, sans bibliothèque JSON.
- `UDP_INTERVAL_MS` concerne uniquement l'émetteur.
- Le récepteur fonctionne en Java 8, sans dépendance externe.
- Un datagramme trop grand pour le tampon de réception peut être tronqué.
