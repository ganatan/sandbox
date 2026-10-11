# 002 - Binary Decode

## Objectif

Transformer un tableau d'octets `byte[]` en entier Java `int`.

Java 8, sans Maven et sans dépendance externe.

## Projet

```text
java-binary-decode/
└── Main.java
```

## Code Java

`Main.java`

```java
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) {

        byte[] bytes = {
            0x00,
            0x00,
            0x05,
            (byte) 0xDC
        };

        ByteBuffer buffer = ByteBuffer.wrap(bytes);

        int distance = buffer.getInt();

        System.out.println("Distance : " + distance);
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
```

## Explication

Nous disposons de quatre octets :

```text
00 00 05 DC
```

| Octet | Hexadécimal | Binaire |
|---|---|---|
| 1 | 00 | 00000000 |
| 2 | 00 | 00000000 |
| 3 | 05 | 00000101 |
| 4 | DC | 11011100 |

`ByteBuffer.wrap(bytes)` permet de lire le tableau d'octets.

`buffer.getInt()` lit les quatre octets et reconstitue un entier Java.

Par défaut, `ByteBuffer` utilise l'ordre **Big Endian**.

```text
0x000005DC = 1500
```

L'instruction `(byte) 0xDC` est nécessaire parce que le type `byte` Java est signé et accepte les valeurs de -128 à 127.

## À retenir

- `byte[]` contient les données binaires.
- `ByteBuffer.wrap()` permet de lire ces données.
- `getInt()` récupère un entier sur 4 octets.
- L'ordre des octets doit être connu pour décoder correctement les valeurs.

Sérialisation : `int → byte[]`

Désérialisation : `byte[] → int`

Ces opérations seront utilisées pour transmettre des données binaires entre applications Java.
