# 004 - Binary Buffer Read Write

## Objectif

Comprendre comment écrire puis lire des données binaires dans un `ByteBuffer` en Java 8.

- `capacity()` : capacité totale du buffer.
- `position()` : position actuelle de lecture ou d'écriture.
- `limit()` : limite accessible du buffer.
- `flip()` : préparer le buffer à la lecture.
- `clear()` : préparer le buffer à une nouvelle écriture.

Java 8, sans Maven et sans dépendance externe.

## Projet

```text
java-binary-buffer-read-write/
└── Main.java
```

## Code Java

`Main.java`

```java
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) {

        ByteBuffer buffer = ByteBuffer.allocate(8);

        System.out.println("Initial");
        display(buffer);

        buffer.putInt(1500);

        System.out.println("Apres ecriture");
        display(buffer);

        buffer.flip();

        System.out.println("Apres flip");
        display(buffer);

        int distance = buffer.getInt();

        System.out.println("Distance : " + distance);

        System.out.println("Apres lecture");
        display(buffer);

        buffer.clear();

        System.out.println("Apres clear");
        display(buffer);
    }

    private static void display(ByteBuffer buffer) {

        System.out.println("Capacity : " + buffer.capacity());
        System.out.println("Position : " + buffer.position());
        System.out.println("Limit    : " + buffer.limit());
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
Initial
Capacity : 8
Position : 0
Limit    : 8

Apres ecriture
Capacity : 8
Position : 4
Limit    : 8

Apres flip
Capacity : 8
Position : 0
Limit    : 4

Distance : 1500
Apres lecture
Capacity : 8
Position : 4
Limit    : 4

Apres clear
Capacity : 8
Position : 0
Limit    : 8
```

## Explication

### 1. Création du buffer

```java
ByteBuffer buffer = ByteBuffer.allocate(8);
```

Java réserve 8 octets. La position vaut 0 et la limite vaut 8.

### 2. Écriture

```java
buffer.putInt(1500);
```

Un `int` occupe 4 octets. La position passe de 0 à 4.

```text
00 00 05 DC 00 00 00 00
```

### 3. Flip

```java
buffer.flip();
```

`flip()` fixe la limite à l'ancienne position (4), puis remet la position à 0.

### 4. Lecture

```java
int distance = buffer.getInt();
```

Java reconstruit l'entier `1500`. La position passe de 0 à 4.

### 5. Clear

```java
buffer.clear();
```

La position revient à 0 et la limite à 8. Les données ne sont pas physiquement effacées.

## Schéma récapitulatif

```text
INITIAL
[ _ _ _ _ _ _ _ _ ]
Position 0, Limit 8

ECRITURE
[ 00 00 05 DC _ _ _ _ ]
Position 4, Limit 8

FLIP
[ 00 00 05 DC _ _ _ _ ]
Position 0, Limit 4

LECTURE
[ 00 00 05 DC _ _ _ _ ]
Position 4, Limit 4

CLEAR
[ 00 00 05 DC _ _ _ _ ]
Position 0, Limit 8
```

## À retenir

- `ByteBuffer` conserve une position, une limite et une capacité.
- `putInt()` écrit 4 octets et avance la position.
- `flip()` prépare à lire les données écrites.
- `getInt()` lit 4 octets et avance la position.
- `clear()` prépare une nouvelle écriture sans effacer les données.
- `capacity` reste constante pendant toute la durée de vie du buffer.

Ces mécanismes sont utiles pour manipuler des messages binaires et utiliser les API réseau Java NIO.
