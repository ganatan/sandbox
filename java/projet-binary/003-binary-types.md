# 003 - Binary Types

## Objectif

Transformer plusieurs types numériques Java en données binaires, puis les décoder.

- `short` : 2 octets
- `int` : 4 octets
- `float` : 4 octets
- `double` : 8 octets

Java 8, sans Maven et sans dépendance externe.

## Projet

```text
java-binary-types/
└── Main.java
```

## Code Java

`Main.java`

```java
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) {

        short id = 1;
        int distance = 1500;
        float speed = 25.5f;
        double latitude = 48.5;

        ByteBuffer buffer = ByteBuffer.allocate(18);

        buffer.putShort(id);
        buffer.putInt(distance);
        buffer.putFloat(speed);
        buffer.putDouble(latitude);

        byte[] bytes = buffer.array();

        System.out.print("Hexadecimal : ");

        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }

        System.out.println();

        ByteBuffer received = ByteBuffer.wrap(bytes);

        System.out.println("ID       : " + received.getShort());
        System.out.println("Distance : " + received.getInt());
        System.out.println("Speed    : " + received.getFloat());
        System.out.println("Latitude : " + received.getDouble());
    }
}
```

## Compilation

```bash
javac Main.java
```

## Exécution

```bash
java Main
```

## Résultat attendu

```text
Hexadecimal : 00 01 00 00 05 DC 41 CC 00 00 40 48 40 00 00 00 00 00
ID       : 1
Distance : 1500
Speed    : 25.5
Latitude : 48.5
```

## Explication

Nous avons créé un message binaire de 18 octets.

| Variable | Type | Taille | Valeur |
|---|---|---|---|
| id | short | 2 octets | 1 |
| distance | int | 4 octets | 1500 |
| speed | float | 4 octets | 25.5 |
| latitude | double | 8 octets | 48.5 |
| **Total** | | **18 octets** | |

### Sérialisation

```java
buffer.putShort(id);
buffer.putInt(distance);
buffer.putFloat(speed);
buffer.putDouble(latitude);
```

Chaque valeur est transformée en octets et écrite successivement dans le buffer.

### Désérialisation

```java
received.getShort();
received.getInt();
received.getFloat();
received.getDouble();
```

Les valeurs sont relues dans le même ordre.

### Structure du message

```text
| ID | DISTANCE | SPEED | LATITUDE |
| 2  |    4     |   4   |    8     |
```

Le message binaire contient exactement 18 octets.

`ByteBuffer` utilise par défaut l'ordre Big Endian.

Les types `float` et `double` utilisent le format IEEE 754.

## À retenir

- Chaque type numérique occupe une taille précise.
- `ByteBuffer.allocate()` réserve la mémoire nécessaire.
- Les méthodes `put` écrivent les valeurs.
- Les méthodes `get` reconstruisent les valeurs.
- L'ordre de lecture doit correspondre à l'ordre d'écriture.
- Le format binaire doit être connu par l'émetteur et le récepteur.

Nous savons maintenant encoder et décoder plusieurs informations dans un même message binaire.
