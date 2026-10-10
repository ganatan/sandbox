# Lecture d'un fichier XLS en Java 8

## Principe

Lire un fichier Excel `.xls` avec Java 8, sans Maven ni Spring Boot.

Bibliothèque : **Apache POI 5.2.5**.

Format : Excel 97–2003 (`.xls`).

## Structure du projet

```text
java-xls/
├── src/
│   └── Main.java
├── lib/
│   ├── poi-5.2.5.jar
│   ├── commons-codec-1.16.0.jar
│   ├── commons-collections4-4.4.jar
│   ├── commons-io-2.15.0.jar
│   ├── commons-math3-3.6.1.jar
│   ├── SparseBitSet-1.3.jar
│   └── log4j-api-2.21.1.jar
├── films.xls
└── build/
```

## Dépendances

Utiliser les mêmes bibliothèques que dans le tutoriel précédent :

[007 - Écriture d'un fichier XLS](007-fichier-xls-write.md)

## Fichier Excel

Le fichier `films.xls` contient :

| Titre | Année | Réalisateur |
|---|---|---|
| Interstellar | 2014 | Christopher Nolan |
| Dune | 2021 | Denis Villeneuve |
| Alien | 1979 | Ridley Scott |

## Main.java

```java
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {

        try (FileInputStream input = new FileInputStream("films.xls");
             Workbook workbook = new HSSFWorkbook(input)) {

            Sheet sheet = workbook.getSheet("Films");

            if (sheet == null) {
                System.out.println("Feuille Films introuvable");
                return;
            }

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

                Row row = sheet.getRow(i);

                if (row == null) {
                    continue;
                }

                String title = row.getCell(0).getStringCellValue();
                int year = (int) row.getCell(1).getNumericCellValue();
                String director = row.getCell(2).getStringCellValue();

                System.out.println(title + " | " + year + " | " + director);
            }

        } catch (IOException e) {
            System.err.println("Erreur : " + e.getMessage());
        }
    }
}
```

## Compilation Windows

Depuis la racine du projet :

```bat
mkdir build
javac -cp "lib/*" -d build src/Main.java
```

## Exécution Windows

```bat
java -cp "build;lib/*" Main
```

## Compilation Linux

```bash
mkdir -p build
javac -cp "lib/*" -d build src/Main.java
```

## Exécution Linux

```bash
java -cp "build:lib/*" Main
```

## Résultat

```text
Interstellar | 2014 | Christopher Nolan
Dune | 2021 | Denis Villeneuve
Alien | 1979 | Ridley Scott
```

## Classes utilisées

| Classe | Utilité |
|---|---|
| `FileInputStream` | Ouvrir le fichier XLS |
| `HSSFWorkbook` | Lire un classeur XLS |
| `Workbook` | Représenter le classeur |
| `Sheet` | Accéder à une feuille |
| `Row` | Accéder à une ligne |
| `Cell` | Accéder à une cellule |

## Méthodes essentielles

| Méthode | Utilité |
|---|---|
| `getSheet()` | Récupérer une feuille par son nom |
| `getSheetAt()` | Récupérer une feuille par son index |
| `getLastRowNum()` | Obtenir l'index de la dernière ligne |
| `getRow()` | Récupérer une ligne |
| `getCell()` | Récupérer une cellule |
| `getStringCellValue()` | Lire une chaîne |
| `getNumericCellValue()` | Lire un nombre |

## À retenir

- `HSSFWorkbook` permet de lire un fichier `.xls`.
- `XSSFWorkbook` permet de lire un fichier `.xlsx`, avec les dépendances correspondantes.
- Les index des lignes et des colonnes commencent à `0`.
- La première ligne est ignorée ici, car elle contient les en-têtes.
- `getNumericCellValue()` retourne un `double`.
- Le programme suppose que les cellules contiennent les types attendus et ne sont pas vides.
- `try-with-resources` ferme automatiquement les ressources ouvertes.
