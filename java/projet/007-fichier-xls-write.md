# Écriture d'un fichier XLS en Java 8

## Principe

Créer un fichier Excel `.xls` avec Java 8, sans Maven ni Spring Boot.

Bibliothèque : Apache POI 5.2.5 (`HSSFWorkbook`), format Excel 97–2003.

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
└── build/
```

## Dépendances

Télécharger les JAR et les placer dans `lib/` :

- [Apache POI 5.2.5](https://repo.maven.apache.org/maven2/org/apache/poi/poi/5.2.5/poi-5.2.5.jar)
- [Commons Codec 1.16.0](https://repo.maven.apache.org/maven2/commons-codec/commons-codec/1.16.0/commons-codec-1.16.0.jar)
- [Commons Collections 4.4](https://repo.maven.apache.org/maven2/org/apache/commons/commons-collections4/4.4/commons-collections4-4.4.jar)
- [Commons IO 2.15.0](https://repo.maven.apache.org/maven2/commons-io/commons-io/2.15.0/commons-io-2.15.0.jar)
- [Commons Math 3.6.1](https://repo.maven.apache.org/maven2/org/apache/commons/commons-math3/3.6.1/commons-math3-3.6.1.jar)
- [SparseBitSet 1.3](https://repo.maven.apache.org/maven2/com/zaxxer/SparseBitSet/1.3/SparseBitSet-1.3.jar)
- [Log4j API 2.21.1](https://repo.maven.apache.org/maven2/org/apache/logging/log4j/log4j-api/2.21.1/log4j-api-2.21.1.jar)

## Main.java

```java
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {

        try (Workbook workbook = new HSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Films");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Titre");
            header.createCell(1).setCellValue("Année");
            header.createCell(2).setCellValue("Réalisateur");

            Row row1 = sheet.createRow(1);
            row1.createCell(0).setCellValue("Interstellar");
            row1.createCell(1).setCellValue(2014);
            row1.createCell(2).setCellValue("Christopher Nolan");

            Row row2 = sheet.createRow(2);
            row2.createCell(0).setCellValue("Dune");
            row2.createCell(1).setCellValue(2021);
            row2.createCell(2).setCellValue("Denis Villeneuve");

            Row row3 = sheet.createRow(3);
            row3.createCell(0).setCellValue("Alien");
            row3.createCell(1).setCellValue(1979);
            row3.createCell(2).setCellValue("Ridley Scott");

            sheet.setColumnWidth(0, 6000);
            sheet.setColumnWidth(1, 3000);
            sheet.setColumnWidth(2, 6000);

            try (FileOutputStream output = new FileOutputStream("films.xls")) {
                workbook.write(output);
            }

            System.out.println("Fichier films.xls créé avec succès");

        } catch (IOException e) {
            System.err.println("Erreur : " + e.getMessage());
        }
    }
}
```

## Compilation Windows

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

Le programme crée `films.xls` dans le répertoire courant.

| Titre | Année | Réalisateur |
|---|---|---|
| Interstellar | 2014 | Christopher Nolan |
| Dune | 2021 | Denis Villeneuve |
| Alien | 1979 | Ridley Scott |

```text
Fichier films.xls créé avec succès
```

## Classes utilisées

| Classe | Utilité |
|---|---|
| `HSSFWorkbook` | Créer un classeur XLS |
| `Sheet` | Créer une feuille |
| `Row` | Créer une ligne |
| `Cell` | Représenter une cellule |
| `FileOutputStream` | Écrire le fichier sur disque |

## À retenir

- `HSSFWorkbook` génère un fichier `.xls`.
- `XSSFWorkbook` génère un `.xlsx` et nécessite d'autres dépendances.
- XLS est limité à 65 536 lignes et 256 colonnes par feuille.
- Apache POI n'est pas inclus dans Java.
- `-cp` définit le classpath ; Windows sépare les chemins avec `;`, Linux avec `:`.
