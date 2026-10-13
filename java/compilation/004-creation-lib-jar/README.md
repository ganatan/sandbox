# Création d'une bibliothèque JAR — Java 8

## Objectif

Créer une bibliothèque Java réutilisable `media-lib.jar`, sans Maven ni Gradle.

## Arborescence

```text
media-lib/
├── src/
│   └── cinema/
│       └── Media.java
├── build/
└── dist/
    └── media-lib.jar
```

## 1. Créer la classe

`src/cinema/Media.java` :

```java
package cinema;

public class Media {
    private String title;

    public Media(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return "Media : " + title;
    }
}
```

## 2. Compiler

Depuis la racine `media-lib`, créer les répertoires `build` et `dist` :

```bash
mkdir build
mkdir dist
```

Compiler :

```bash
javac -source 8 -target 8 -d build src/cinema/Media.java
```

Résultat :

```text
build/
└── cinema/
    └── Media.class
```

`-d` définit le dossier de sortie. Le package `cinema` est conservé dans l'arborescence.

## 3. Créer le JAR

```bash
jar cf dist/media-lib.jar -C build .
```

- `c` : créer une archive.
- `f` : indiquer le nom du fichier JAR.
- `-C build .` : inclure le contenu de `build` à la racine de l'archive.

## 4. Vérifier le contenu

```bash
jar tf dist/media-lib.jar
```

On doit notamment retrouver :

```text
cinema/Media.class
```

## 5. Comprendre

Le JAR est une archive ZIP contenant des fichiers `.class`. Cette bibliothèque ne contient pas de méthode `main` : elle est destinée à être utilisée par une autre application.

La compilation de l'application consommatrice nécessite le JAR dans son `classpath`. Il doit également être disponible à l'exécution.

Suite : [Compiler une application qui utilise cette bibliothèque](../005-application-avec-lib-jar/README.md).
