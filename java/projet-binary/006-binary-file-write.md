# 006 - Binary File Write

## Objectif

Écrire un objet Java `Target` dans un fichier binaire `target.bin`.

Java 8, sans Maven et sans dépendance externe.

## Projet

```text
java-binary-file-write/
├── Main.java
├── Target.java
└── target.bin
```

Le fichier `target.bin` sera généré automatiquement.

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
}
```

`Main.java`

```java
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;

public class Main {

    public static void main(String[] args) throws IOException {

        Target target = new Target(1, 1500, 25.5f);

        ByteBuffer buffer = ByteBuffer.allocate(12);

        buffer.putInt(target.getId());
        buffer.putInt(target.getDistance());
        buffer.putFloat(target.getSpeed());

        byte[] bytes = buffer.array();

        try (FileOutputStream output = new FileOutputStream("target.bin")) {
            output.write(bytes);
        }

        System.out.println("Fichier : target.bin");
        System.out.println("Taille  : " + bytes.length + " octets");

        System.out.print("Binary  : ");

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

## Résultat attendu

```text
Fichier : target.bin
Taille  : 12 octets
Binary  : 00 00 00 01 00 00 05 DC 41 CC 00 00
```

## Explication

| Propriété | Type | Valeur | Taille |
|---|---|---|---|
| id | int | 1 | 4 octets |
| distance | int | 1500 | 4 octets |
| speed | float | 25.5 | 4 octets |
| **Total** | | | **12 octets** |

### Conversion binaire

```java
ByteBuffer buffer = ByteBuffer.allocate(12);

buffer.putInt(target.getId());
buffer.putInt(target.getDistance());
buffer.putFloat(target.getSpeed());
```

`ByteBuffer` convertit les valeurs dans l'ordre Big Endian par défaut.

### Écriture du fichier

```java
try (FileOutputStream output = new FileOutputStream("target.bin")) {
    output.write(bytes);
}
```

`FileOutputStream` écrit directement les octets. Le `try-with-resources` ferme automatiquement le flux.

Si `target.bin` existe déjà, son contenu est remplacé.

### Contenu du fichier

```text
00 00 00 01 00 00 05 DC 41 CC 00 00
```

Ce sont exactement 12 octets bruts, et non une représentation textuelle.

## Vérification

Sous Linux :

```bash
xxd target.bin
```

Extrait attendu :

```text
00000000: 0000 0001 0000 05dc 41cc 0000
```

Sous Windows avec PowerShell :

```powershell
Format-Hex .\target.bin
```

## À retenir

- `ByteBuffer` transforme les champs en octets.
- `byte[]` contient les octets à écrire.
- `FileOutputStream` écrit les octets dans un fichier.
- Le fichier `.bin` contient les données brutes.
- Le récepteur doit connaître le format pour reconstruire l'objet.

Prochain tutoriel : lire `target.bin` et reconstruire l'objet Java `Target`.
