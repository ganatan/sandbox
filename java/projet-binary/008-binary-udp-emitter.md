# 008 - Binary UDP Emitter

## Objectif

Créer un projet Java 8 indépendant qui sérialise un objet `Target` en **12 octets**, puis émet un datagramme UDP.

Sans Maven, sans bibliothèque externe.

## Projet

```text
java-binary-udp-emitter/
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
import java.net.InetAddress;
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) throws Exception {
        String address = System.getenv().getOrDefault("UDP_ADDRESS", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("UDP_PORT", "5000"));

        Target target = new Target(1, 1500, 25.5f);

        ByteBuffer buffer = ByteBuffer.allocate(12);
        buffer.putInt(target.getId());
        buffer.putInt(target.getDistance());
        buffer.putFloat(target.getSpeed());

        byte[] bytes = buffer.array();
        InetAddress destination = InetAddress.getByName(address);
        DatagramPacket packet = new DatagramPacket(bytes, bytes.length, destination, port);

        try (DatagramSocket socket = new DatagramSocket()) {
            socket.send(packet);
        }

        System.out.println("Target      : " + target);
        System.out.println("Destination : " + address + ":" + port);
        System.out.println("Taille      : " + bytes.length + " octets");
        System.out.print("Binary      : ");
        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }
        System.out.println();
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

Variables d'environnement facultatives : `UDP_ADDRESS` (défaut `127.0.0.1`) et `UDP_PORT` (défaut `5000`).

## Résultat attendu

```text
Target      : Target{id=1, distance=1500, speed=25.5}
Destination : 127.0.0.1:5000
Taille      : 12 octets
Binary      : 00 00 00 01 00 00 05 DC 41 CC 00 00
```

## Format binaire

| Champ | Type | Taille |
|---|---|---|
| id | int | 4 octets |
| distance | int | 4 octets |
| speed | float | 4 octets |
| Total | | 12 octets |

`ByteBuffer` utilise Big Endian par défaut. L'envoi est effectué **une seule fois**, puis l'application s'arrête. UDP ne garantit pas la réception.

## Test

Démarrer d'abord le récepteur du [tutoriel 009](009-binary-udp-receiver.md), puis exécuter cet émetteur dans un autre terminal.
