# Compiler une application avec une bibliothèque JAR — Java 8

## Objectif

Compiler une application `app.jar` utilisant la classe `cinema.Media` de la bibliothèque créée dans le tutoriel précédent, sans Maven ni Gradle.

Prérequis : [Créer `media-lib.jar`](../004-creation-lib-jar/README.md).

## Arborescence

Copier le fichier `media-lib.jar` dans `lib/` :

```text
media-app/
├── src/
│   └── Main.java
├── lib/
│   └── media-lib.jar
├── build/
├── manifest.mf
└── app.jar
```

## 1. Créer l'application

`src/Main.java` :

```java
import cinema.Media;

public class Main {
    public static void main(String[] args) {
        Media media = new Media("Interstellar");
        System.out.println(media.getDescription());
    }
}
```

## 2. Compiler avec le JAR externe

Créer le dossier de compilation :

```bash
mkdir build
```

Sous Windows :

```bash
javac -source 8 -target 8 -cp "lib/media-lib.jar" -d build src/Main.java
```

Sous Linux, la même commande fonctionne car un seul JAR figure dans le classpath :

```bash
javac -source 8 -target 8 -cp "lib/media-lib.jar" -d build src/Main.java
```

Résultat :

```text
build/
└── Main.class
```

`-cp` (ou `-classpath`) indique où Java recherche les classes externes.

## 3. Exécuter avec le classpath

Windows (`;` comme séparateur) :

```bash
java -cp "build;lib/media-lib.jar" Main
```

Linux / macOS (`:` comme séparateur) :

```bash
java -cp "build:lib/media-lib.jar" Main
```

Résultat :

```text
Media : Interstellar
```

## 4. Créer app.jar

```bash
jar cfe app.jar Main -C build .
```

Le JAR contient `Main.class`, mais **pas** la bibliothèque externe.

Windows :

```bash
java -cp "app.jar;lib/media-lib.jar" Main
```

Linux / macOS :

```bash
java -cp "app.jar:lib/media-lib.jar" Main
```

## 5. Exécuter avec java -jar

Créer `manifest.mf` avec ces lignes et une ligne vide finale :

```text
Manifest-Version: 1.0
Main-Class: Main
Class-Path: lib/media-lib.jar

```

Recréer l'archive en intégrant le manifeste :

```bash
jar cfm app.jar manifest.mf -C build .
```

Exécuter :

```bash
java -jar app.jar
```

La directive `Class-Path` du manifeste référence `lib/media-lib.jar` relativement au dossier contenant `app.jar`. Le dossier `lib` doit donc être livré avec l'application.

## 6. Livraison

```text
livraison/
├── app.jar
└── lib/
    └── media-lib.jar
```

Depuis `livraison/` :

```bash
java -jar app.jar
```

Résultat :

```text
Media : Interstellar
```

## 7. Points importants

- `javac -cp` : dépendance nécessaire à la compilation.
- `java -cp` : dépendance nécessaire à l'exécution.
- `java -jar` : utilise le manifeste du JAR ; l'option `-cp` de la commande est ignorée dans ce mode.
- Le JAR applicatif ne contient pas automatiquement les classes de `media-lib.jar`.
- Pour produire un seul JAR avec toutes les classes, il faut assembler explicitement les dépendances (fat JAR), ce qui est un autre procédé.
- Si une classe manque à l'exécution, vérifier le chemin de `lib/media-lib.jar` et son contenu avec `jar tf`.
