# 007 - Binary File Read

## Objectif

Lire le fichier binaire `target.bin` créé dans le tutoriel 006 et reconstruire un objet Java `Target`.

Java 8, sans Maven et sans dépendance externe.

## Projet

```text
java-binary-file-read/
├── Main.java
├── Target.java
└── target.bin
```

Copier le fichier `target.bin` généré dans le tutoriel 006 dans ce répertoire.

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
        return "Target{id=" + id
                + ", distance=" + distance
                + ", speed=" + speed + "}";
    }
}
```

`Main.java`

```java
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) throws IOException {

        byte[] bytes = Files.readAllBytes(Paths.get("target.bin"));

        if (bytes.length != 12) {
            throw new IOException("Taille du fichier invalide : " + bytes.length);
        }

        ByteBuffer buffer = ByteBuffer.wrap(bytes);

        int id = buffer.getInt();
        int distance = buffer.getInt();
        float speed = buffer.getFloat();

        Target target = new Target(id, distance, speed);

        System.out.println("Fichier : target.bin");
        System.out.println("Taille  : " + bytes.length + " octets");

        System.out.print("Binary  : ");

        for (byte value : bytes) {
            System.out.printf("%02X ", value & 0xFF);
        }

        System.out.println();

        System.out.println("Target  : " + target);
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
Fichier : target.bin
Taille  : 12 octets
Binary  : 00 00 00 01 00 00 05 DC 41 CC 00 00
Target  : Target{id=1, distance=1500, speed=25.5}
```

## Explication

### Lecture du fichier

```java
byte[] bytes = Files.readAllBytes(Paths.get("target.bin"));
```

`Files.readAllBytes()` charge les octets en mémoire.

### Vérification de la taille

```java
if (bytes.length != 12) {
    throw new IOException("Taille du fichier invalide : " + bytes.length);
}
```

Le protocole utilisé dans cet exemple exige exactement 12 octets.

### Conversion des octets

```java
ByteBuffer buffer = ByteBuffer.wrap(bytes);
```

Par défaut, l'ordre des octets est Big Endian.

### Désérialisation

```java
int id = buffer.getInt();
int distance = buffer.getInt();
float speed = buffer.getFloat();
```

| Position | Type | Propriété | Valeur |
|---|---|---|---|
| 0 à 3 | int | id | 1 |
| 4 à 7 | int | distance | 1500 |
| 8 à 11 | float | speed | 25.5 |

### Reconstruction de l'objet

```java
Target target = new Target(id, distance, speed);
```

## Schéma

```text
target.bin
    |
    | 12 octets
    v
Files.readAllBytes()
    |
    v
byte[]
    |
    v
ByteBuffer.wrap()
    |
    +---- getInt()   → id
    |
    +---- getInt()   → distance
    |
    +---- getFloat() → speed
    |
    v
Target
```

## À retenir

- `Files.readAllBytes()` lit les octets d'un fichier.
- `ByteBuffer.wrap()` permet de décoder les données.
- `getInt()` et `getFloat()` reconstruisent les valeurs.
- Le format binaire doit être connu à l'avance.
- L'ordre de lecture doit correspondre à l'ordre d'écriture.

**Tutoriel 006 :** Objet Java → fichier binaire.

**Tutoriel 007 :** Fichier binaire → objet Java.
