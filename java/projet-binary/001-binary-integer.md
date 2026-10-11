# 001 - Binary Integer

## Objectif

Transformer un entier Java `int` en tableau d'octets `byte[]` et afficher chaque octet en binaire et en hexadécimal.

Java 8, sans Maven et sans dépendance externe.

## Projet

```text
java-binary-integer/
└── Main.java
```

## Code Java

`Main.java`

```java
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) {

        int distance = 1500;

        ByteBuffer buffer = ByteBuffer.allocate(4);
        buffer.putInt(distance);

        byte[] bytes = buffer.array();

        System.out.println("Distance : " + distance);

        System.out.print("Binaire : ");
        for (byte value : bytes) {
            String binary = String.format("%8s", Integer.toBinaryString(value & 0xFF))
                    .replace(' ', '0');
            System.out.print(binary + " ");
        }

        System.out.println();

        System.out.print("Hexadecimal : ");
        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }

        System.out.println();
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
Distance : 1500
Binaire : 00000000 00000000 00000101 11011100
Hexadecimal : 00 00 05 DC
```

## Explication

Un `int` Java occupe 4 octets, soit 32 bits.

| Octet | Hexadécimal | Binaire |
|---|---|---|
| 1 | 00 | 00000000 |
| 2 | 00 | 00000000 |
| 3 | 05 | 00000101 |
| 4 | DC | 11011100 |

- `ByteBuffer.allocate(4)` réserve 4 octets.
- `putInt(distance)` écrit l'entier dans le buffer.
- `array()` récupère le tableau d'octets.
- `value & 0xFF` permet de traiter chaque octet comme une valeur non signée pour l'affichage.
- Par défaut, `ByteBuffer` utilise l'ordre **Big Endian** (octet de poids fort en premier).

## À retenir

- `int` : entier Java sur 32 bits.
- `byte` : valeur sur 8 bits.
- `byte[]` : tableau d'octets.
- `ByteBuffer` : lecture et écriture de données binaires.
- Hexadécimal : représentation lisible des octets.

Le message `00 00 05 DC` peut ensuite être écrit dans un fichier ou transmis sur le réseau.
