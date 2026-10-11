# 009 - Binary UDP Receiver

## Objectif

Créer un second projet Java 8 indépendant qui écoute en continu sur le port UDP 5000 et reconstruit un objet `Target` à partir de **12 octets binaires**.

Sans Maven, sans bibliothèque externe.

## Projet

```text
java-binary-udp-receiver/
├── Main.java
└── Target.java
```

## Target.java

```java
public class Target {
    private int id;
    private int distance;
    private float speed;

    public Target(int id, int distance, float speed) {
        this.id = id;
        this.distance = distance;
        this.speed = speed;
    }

    public int getId() { return id; }
    public int getDistance() { return distance; }
    public float getSpeed() { return speed; }

    @Override
    public String toString() {
        return "Target{id=" + id + ", distance=" + distance + ", speed=" + speed + "}";
    }
}
```

## Main.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) throws Exception {
        int port = Integer.parseInt(System.getenv().getOrDefault("UDP_PORT", "5000"));

        try (DatagramSocket socket = new DatagramSocket(port)) {
            System.out.println("Receiver UDP : port " + port);

            while (true) {
                byte[] bytes = new byte[12];
                DatagramPacket packet = new DatagramPacket(bytes, bytes.length);
                socket.receive(packet);

                if (packet.getLength() != 12) {
                    System.out.println("Message invalide : " + packet.getLength() + " octets");
                    continue;
                }

                ByteBuffer buffer = ByteBuffer.wrap(packet.getData(), packet.getOffset(), packet.getLength());
                Target target = new Target(buffer.getInt(), buffer.getInt(), buffer.getFloat());

                System.out.println("Source : " + packet.getAddress().getHostAddress() + ":" + packet.getPort());
                System.out.println("Target : " + target);
            }
        }
    }
}
```

## Compilation

```bash
javac Main.java Target.java
```

## Exécution

```bash
java Main
```

Variable d'environnement facultative : `UDP_PORT` (défaut `5000`).

Démarrer le récepteur avant l'émetteur. Il reste à l'écoute jusqu'à son arrêt, par exemple avec `Ctrl+C`.

## Résultat attendu

Au démarrage :

```text
Receiver UDP : port 5000
```

Après une exécution du [tutoriel 008](008-binary-udp-emitter.md) :

```text
Source : 127.0.0.1:<port-source>
Target : Target{id=1, distance=1500, speed=25.5}
```

`<port-source>` est un port éphémère choisi par le système.

## Explication

- `DatagramSocket(port)` écoute sur le port UDP.
- `receive(packet)` attend un datagramme.
- `packet.getLength()` donne la longueur reçue.
- `ByteBuffer.wrap()` prépare le décodage.
- `getInt()`, `getInt()`, `getFloat()` reconstruisent les trois champs, dans cet ordre.
- La boucle `while (true)` traite les messages successifs.

Le protocole attend exactement 12 octets, en Big Endian. Un paquet trop court est rejeté. Dans cet exemple pédagogique, le buffer de réception fait 12 octets : un datagramme plus long peut être tronqué à cette taille ; un véritable protocole doit également vérifier les longueurs et les champs de contrôle pour détecter ce cas.

## Test local

Terminal 1, dans `java-binary-udp-receiver` :

```bash
javac Main.java Target.java
java Main
```

Terminal 2, dans `java-binary-udp-emitter` :

```bash
javac Main.java Target.java
java Main
```

Les deux processus sont indépendants et communiquent par UDP binaire.
