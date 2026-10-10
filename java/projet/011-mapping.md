# Java 8 - Mapping objet vers objet

## Principe

Le mapping consiste à transformer un objet en un autre objet.

Exemple :

```text
Media
  id = 1
  title = "Interstellar"
  year = 2014
        |
        | MediaMapper
        v
MediaDto
  name = "Interstellar"
  releaseYear = 2014
```

Trois classes :

- `Media` : objet source.
- `MediaDto` : objet de destination.
- `MediaMapper` : transformation des données.

Aucune bibliothèque externe.

## Structure du projet

```text
java-mapping/
├── src/
│   ├── Main.java
│   ├── Media.java
│   ├── MediaDto.java
│   └── MediaMapper.java
└── build/
```

## Media.java

```java
public class Media {

    private int id;
    private String title;
    private int year;

    public Media(int id, String title, int year) {
        this.id = id;
        this.title = title;
        this.year = year;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getYear() {
        return year;
    }
}
```

## MediaDto.java

```java
public class MediaDto {

    private String name;
    private int releaseYear;

    public MediaDto(String name, int releaseYear) {
        this.name = name;
        this.releaseYear = releaseYear;
    }

    public String getName() {
        return name;
    }

    public int getReleaseYear() {
        return releaseYear;
    }
}
```

## MediaMapper.java

```java
public class MediaMapper {

    public static MediaDto toDto(Media media) {

        return new MediaDto(
            media.getTitle(),
            media.getYear()
        );
    }
}
```

## Main.java

```java
public class Main {

    public static void main(String[] args) {

        Media media = new Media(
            1,
            "Interstellar",
            2014
        );

        MediaDto dto = MediaMapper.toDto(media);

        System.out.println("Media :");
        System.out.println(media.getId());
        System.out.println(media.getTitle());
        System.out.println(media.getYear());

        System.out.println();

        System.out.println("MediaDto :");
        System.out.println(dto.getName());
        System.out.println(dto.getReleaseYear());
    }
}
```

## Compilation Windows

Depuis la racine du projet :

```bat
mkdir build
javac -d build src/*.java
```

## Exécution Windows

```bat
java -cp build Main
```

## Compilation Linux

```bash
mkdir -p build
javac -d build src/*.java
```

## Exécution Linux

```bash
java -cp build Main
```

## Résultat

```text
Media :
1
Interstellar
2014

MediaDto :
Interstellar
2014
```

## Correspondance des propriétés

| Media | MediaDto |
|---|---|
| `id` | Non transmis |
| `title` | `name` |
| `year` | `releaseYear` |

Le mapper choisit les propriétés à transmettre et peut les renommer ou les transformer.

## Pourquoi utiliser un mapper ?

- Séparer les objets métier des objets échangés.
- Ne transmettre que les données nécessaires.
- Renommer les propriétés.
- Centraliser les transformations.
- Éviter d'exposer directement les objets métier.

## Mapping inverse

On peut également transformer un `MediaDto` en `Media`.

Ajouter dans `MediaMapper.java` :

```java
public static Media toMedia(MediaDto dto) {

    return new Media(
        0,
        dto.getName(),
        dto.getReleaseYear()
    );
}
```

Le DTO ne contenant pas d'identifiant, l'exemple utilise `0` comme valeur par défaut. Dans une application réelle, l'identifiant pourrait être fourni séparément.

## À retenir

- Le mapping transforme un objet source en objet de destination.
- Un DTO (*Data Transfer Object*) transporte les données nécessaires.
- Un mapper centralise la transformation.
- Les noms et les types des propriétés peuvent être différents.
- Un mapping n'a pas besoin d'une bibliothèque externe.
- Des bibliothèques comme MapStruct peuvent automatiser ces transformations.

Dans cet exemple, le mapping est **manuel, explicite et entièrement compatible avec Java 8**.
