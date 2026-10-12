# Big Endian et Little Endian

## Définition

L'**endianness** désigne l'ordre des octets utilisé pour représenter un nombre composé de plusieurs octets en mémoire ou dans un message binaire.

- **Big Endian** : l'octet de poids fort est placé en premier.
- **Little Endian** : l'octet de poids faible est placé en premier.

## Exemple

Prenons le nombre hexadécimal `0x12345678`, représenté sur 4 octets.

| Ordre | Octets du premier au dernier |
|---|---|
| Big Endian | `12 34 56 78` |
| Little Endian | `78 56 34 12` |

La valeur numérique ne change pas : seule sa représentation en octets diffère.

## Utilisation sur le réseau

Les champs numériques des en-têtes IPv4, TCP et UDP sont encodés en **Big Endian**, aussi appelé **Network Byte Order**.

Un port UDP est un entier non signé de 16 bits, soit 2 octets.

Exemple avec le port `5000` :

```text
Décimal       : 5000
Hexadécimal   : 0x1388
Big Endian    : 13 88
Little Endian : 88 13
```

## Exemple Java 8

`ByteBuffer` utilise Big Endian par défaut. Il est possible de choisir explicitement l'ordre des octets.

```java
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class Main {
    public static void main(String[] args) {
        int mediaId = 5000;

        ByteBuffer big = ByteBuffer.allocate(4);
        big.order(ByteOrder.BIG_ENDIAN);
        big.putInt(mediaId);

        ByteBuffer little = ByteBuffer.allocate(4);
        little.order(ByteOrder.LITTLE_ENDIAN);
        little.putInt(mediaId);

        printBytes("Big Endian", big.array());
        printBytes("Little Endian", little.array());
    }

    private static void printBytes(String label, byte[] bytes) {
        System.out.print(label + " : ");
        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }
        System.out.println();
    }
}
```

Compilation et exécution :

```bash
javac Main.java
java Main
```

Résultat :

```text
Big Endian : 00 00 13 88
Little Endian : 88 13 00 00
```

L'identifiant du média est ici un entier Java de 32 bits, donc 4 octets. Le port UDP, lui, est représenté sur 2 octets.

## Avec DatagramSocket

En Java, `DatagramSocket` gère les en-têtes UDP : il n'est pas nécessaire d'encoder manuellement le port en Big Endian.

En revanche, si le contenu du datagramme contient des nombres binaires, l'émetteur et le récepteur doivent utiliser le même ordre des octets.

Un JSON transmis en UTF-8 est du texte : l'ordre des octets Big Endian ou Little Endian ne s'applique pas directement à ses nombres écrits sous forme de caractères.

## À retenir

**Big Endian = octet de poids fort en premier.**

**Little Endian = octet de poids faible en premier.**

L'ordre des octets est essentiel pour interpréter correctement les données binaires échangées entre applications.
