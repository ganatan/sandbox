# Écriture d'un fichier TXT — Java 8

## Main.java

```java
import java.io.FileWriter;

public class Main {
    public static void main(String[] args) throws Exception {
        try (FileWriter writer = new FileWriter("realisateurs.txt")) {
            writer.write("Christopher Nolan\n");
            writer.write("Steven Spielberg\n");
            writer.write("James Cameron\n");
        }

        System.out.println("Fichier créé");
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

Fichier `realisateurs.txt` :

```text
Christopher Nolan
Steven Spielberg
James Cameron
```

## Principe

- `FileWriter` : écrit dans un fichier texte.
- `write()` : écrit une chaîne de caractères.
- `\n` : retour à la ligne.
- `try-with-resources` : ferme automatiquement le fichier.

Le fichier est créé dans le répertoire de travail s'il n'existe pas. Son contenu est remplacé s'il existe déjà.
