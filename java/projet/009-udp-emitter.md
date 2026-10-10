# Java 8 - Émetteur UDP

## Principe

Créer une application Java 8 qui envoie des messages UDP vers une adresse IP et un port.

- Protocole : UDP
- Adresse : `127.0.0.1`
- Port : `5000`
- Intervalle : `1000 ms`
- Bibliothèques : Java standard
- Maven : non nécessaire

UDP est un protocole sans connexion. L'envoi d'un datagramme ne garantit ni sa réception ni son ordre d'arrivée.

## Structure du projet

```text
java-udp-emitter/
├── src/
│   └── Main.java
└── build/
```

## Main.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) throws Exception {

        String address = System.getenv().getOrDefault("UDP_ADDRESS", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("UDP_PORT", "5000"));
        int interval = Integer.parseInt(System.getenv().getOrDefault("UDP_INTERVAL_MS", "1000"));

        InetAddress destination = InetAddress.getByName(address);

        try (DatagramSocket socket = new DatagramSocket()) {

            int counter = 1;

            while (true) {

                String message = String.format(
                    "{\"name\":\"target-%03d\",\"distance\":%d}",
                    counter,
                    1000 + counter * 100
                );

                byte[] data = message.getBytes(StandardCharsets.UTF_8);

                DatagramPacket packet = new DatagramPacket(
                    data,
                    data.length,
                    destination,
                    port
                );

                socket.send(packet);

                System.out.println(
                    "UDP -> " + address + ":" + port + " " + message
                );

                counter++;

                Thread.sleep(interval);
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

```text
UDP -> 127.0.0.1:5000 {"name":"target-001","distance":1100}
UDP -> 127.0.0.1:5000 {"name":"target-002","distance":1200}
UDP -> 127.0.0.1:5000 {"name":"target-003","distance":1300}
UDP -> 127.0.0.1:5000 {"name":"target-004","distance":1400}
```

Un message est envoyé toutes les secondes.

## Modifier la configuration Windows

```bat
set UDP_ADDRESS=127.0.0.1
set UDP_PORT=6000
set UDP_INTERVAL_MS=500

java -cp build Main
```

## Modifier la configuration Linux

```bash
export UDP_ADDRESS=127.0.0.1
export UDP_PORT=6000
export UDP_INTERVAL_MS=500

java -cp build Main
```

## Classes utilisées

| Classe | Utilité |
|---|---|
| `DatagramSocket` | Créer une socket UDP |
| `DatagramPacket` | Construire un datagramme |
| `InetAddress` | Définir l'adresse de destination |
| `StandardCharsets.UTF_8` | Encoder le message |
| `Thread.sleep()` | Attendre entre deux émissions |

## Méthodes essentielles

| Méthode | Utilité |
|---|---|
| `InetAddress.getByName()` | Résoudre l'adresse IP ou le nom |
| `new DatagramSocket()` | Créer une socket UDP |
| `new DatagramPacket()` | Construire le paquet à envoyer |
| `socket.send()` | Envoyer le datagramme |
| `Thread.sleep()` | Temporiser l'émission |
| `socket.close()` | Fermer la socket, automatiquement ici |

## Arrêter l'application

```text
Ctrl + C
```

## À retenir

- UDP fonctionne sans connexion préalable.
- `DatagramSocket` permet d'envoyer des datagrammes.
- `DatagramPacket` contient les données, la destination et le port.
- `socket.send()` envoie le datagramme.
- Le port `5000` est le port UDP de destination, pas nécessairement le port local de l'émetteur.
- `127.0.0.1` correspond à la machine locale.
- L'adresse, le port et l'intervalle sont configurables par variables d'environnement.
- L'application fonctionne avec Java 8 sans dépendance externe.
- Pour vérifier la réception, il faut un récepteur UDP à l'écoute sur le port choisi.
