# 005 - Binary Object

## Objectif

Transformer un objet Java `Target` en tableau d'octets `byte[]`, puis reconstruire un nouvel objet à partir de ces octets.

Java 8, sans Maven et sans dépendance externe.

## Projet

```text
java-binary-object/
├── Main.java
└── Target.java
```

## Code Java

`Target.java`

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

`Main.java`

```java
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) {

        Target original = new Target(1, 1500, 25.5f);

        ByteBuffer buffer = ByteBuffer.allocate(12);
        buffer.putInt(original.getId());
        buffer.putInt(original.getDistance());
        buffer.putFloat(original.getSpeed());

        byte[] bytes = buffer.array();

        System.out.println("Original : " + original);

        System.out.print("Binary   : ");
        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }
        System.out.println();

        ByteBuffer received = ByteBuffer.wrap(bytes);

        Target decoded = new Target(
            received.getInt(),
            received.getInt(),
            received.getFloat()
        );

        System.out.println("Decoded  : " + decoded);
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

## Résultat attendu

```text
Original : Target{id=1, distance=1500, speed=25.5}
Binary   : 00 00 00 01 00 00 05 DC 41 CC 00 00
Decoded  : Target{id=1, distance=1500, speed=25.5}
```

## Explication

Le protocole binaire de notre exemple comporte trois champs, dans cet ordre :

| Champ | Type | Taille |
|---|---|---|
| id | int | 4 octets |
| distance | int | 4 octets |
| speed | float | 4 octets |
| **Total** | | **12 octets** |

### Sérialisation

```java
buffer.putInt(original.getId());
buffer.putInt(original.getDistance());
buffer.putFloat(original.getSpeed());
```

Chaque valeur est enregistrée dans le buffer selon un format fixe.

### Désérialisation

```java
Target decoded = new Target(
    received.getInt(),
    received.getInt(),
    received.getFloat()
);
```

On relit les champs dans le même ordre pour reconstruire un objet.

Par défaut, `ByteBuffer` utilise l'ordre **Big Endian**.

## À retenir

- Un objet Java n'est pas envoyé directement : ses champs sont encodés en octets.
- `ByteBuffer` permet de contrôler explicitement le format binaire.
- Le récepteur doit connaître l'ordre, le type et la taille des champs.
- Notre message contient exactement **12 octets**.

Ce format pourra ensuite être écrit dans un fichier ou envoyé par UDP ou TCP.
