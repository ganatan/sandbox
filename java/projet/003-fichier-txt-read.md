# Lecture d'un fichier TXT — Java 8

## Main.java

```java
import java.io.BufferedReader;
import java.io.FileReader;

public class Main {
    public static void main(String[] args) throws Exception {
        try (BufferedReader reader = new BufferedReader(new FileReader("realisateurs.txt"))) {
            String ligne;

            while ((ligne = reader.readLine()) != null) {
                System.out.println(ligne);
            }
        }
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

## Résultat

```text
Christopher Nolan
Steven Spielberg
James Cameron
```

## Principe

- `FileReader` : ouvre un fichier texte.
- `BufferedReader` : permet de lire ligne par ligne.
- `readLine()` : lit une ligne, ou retourne `null` à la fin du fichier.
- `try-with-resources` : ferme automatiquement le fichier.

Le fichier `realisateurs.txt` doit exister dans le répertoire de travail avant l'exécution.
