# 010 - Binary TCP Emitter

## Objectif

Créer un projet Java 8 indépendant qui transforme un objet `Target` en **12 octets**, puis l'envoie à un récepteur TCP.

Sans Maven ni dépendance externe.

## Projet

```text
java-binary-tcp-emitter/
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

    public int getId() {
        return id;
    }

    public int getDistance() {
        return distance;
    }

    public float getSpeed() {
        return speed;
    }

    @Override
    public String toString() {
        return "Target{id=" + id + ", distance=" + distance + ", speed=" + speed + "}";
    }
}
```

## Main.java

```java
import java.io.DataOutputStream;
import java.net.Socket;
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) throws Exception {

        String address = System.getenv().getOrDefault("TCP_ADDRESS", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("TCP_PORT", "5000"));

        Target target = new Target(1, 1500, 25.5f);

        ByteBuffer buffer = ByteBuffer.allocate(12);
        buffer.putInt(target.getId());
        buffer.putInt(target.getDistance());
        buffer.putFloat(target.getSpeed());

        byte[] bytes = buffer.array();

        try (Socket socket = new Socket(address, port);
             DataOutputStream output = new DataOutputStream(socket.getOutputStream())) {
            output.write(bytes);
            output.flush();
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

Démarrer d'abord le [récepteur TCP](011-binary-tcp-receiver.md), puis :

```bash
java Main
```

Variables d'environnement facultatives :

| Variable | Défaut |
|---|---|
| `TCP_ADDRESS` | `127.0.0.1` |
| `TCP_PORT` | `5000` |

## Résultat attendu

```text
Target      : Target{id=1, distance=1500, speed=25.5}
Destination : 127.0.0.1:5000
Taille      : 12 octets
Binary      : 00 00 00 01 00 00 05 DC 41 CC 00 00
```

## Explication

| Champ | Type | Taille |
|---|---|---|
| id | int | 4 octets |
| distance | int | 4 octets |
| speed | float | 4 octets |
| Total | | 12 octets |

`ByteBuffer` écrit les valeurs en Big Endian par défaut.

`Socket` établit une connexion TCP vers le récepteur. `DataOutputStream.write(bytes)` écrit les octets sur le flux.

L'application émet une seule fois, puis ferme la connexion et s'arrête.

Contrairement à UDP, TCP transporte un **flux d'octets fiable et ordonné** : il ne préserve pas de frontières entre messages. Notre exemple utilise donc un format de message **fixe de 12 octets**.
