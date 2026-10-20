# Java 8 — Trois bibliothèques Ant et JUnit 3

Projet Java 8 sans Maven ni Gradle : trois bibliothèques indépendantes construites avec Apache Ant, tests JUnit 3 et dépendances JAR copiées dans le répertoire `lib/` de chaque module.

## Structure

```text
java-ant-junit-libraries/
├── build.xml
├── README.md
├── message1/
│   ├── build.xml
│   ├── lib/junit.jar
│   ├── src/com/example/starter/protocol/Message1.java
│   ├── test/com/example/starter/protocol/Message1Test.java
│   └── dist/{message1.jar,message1.jar.MD5,message1-install.zip}
├── message2/
│   ├── build.xml
│   ├── lib/{junit.jar,message1.jar}
│   ├── src/com/example/starter/protocol/Message2.java
│   ├── test/com/example/starter/protocol/Message2Test.java
│   └── dist/{message2.jar,message2.jar.MD5,message2-install.zip}
└── message3/
    ├── build.xml
    ├── lib/{junit.jar,message1.jar,message2.jar}
    ├── src/com/example/starter/protocol/Message3.java
    ├── test/com/example/starter/protocol/Message3Test.java
    └── dist/{message3.jar,message3.jar.MD5,message3-install.zip}
```

Les dossiers `build/` et `dist/` sont générés par Ant. Les JAR ne sont pas versionnés.

## Dépendances

- `Message1.calculate()` retourne `1 + 2 = 3`.
- `Message2.calculate()` appelle `Message1` puis ajoute `3` : résultat `6`.
- `Message3.calculate()` appelle `Message2` puis ajoute `4` : résultat `10`.

Chaque module utilise le package `com.example.starter.protocol` et sépare `src/` et `test/`. Chaque test `extends TestCase`, affiche `00000000001` et vérifie le résultat avec `assertEquals`.

À la compilation, `message2/build.xml` copie `message1/dist/message1.jar` vers `message2/lib/`. `message3/build.xml` copie `message1.jar` et `message2.jar` vers `message3/lib/`. Les copies sont renouvelées lors des builds.

## Prérequis Windows

JDK 8 et Apache Ant installés. Télécharger Ant ZIP : https://ant.apache.org/bindownload.cgi

Configurer `JAVA_HOME` pour le JDK 8, `ANT_HOME` pour le dossier Ant, et ajouter `%JAVA_HOME%\bin` et `%ANT_HOME%\bin` au `Path` Windows.

Vérifier dans un nouveau CMD :

```bat
java -version
javac -version
ant -version
```

Télécharger [JUnit 3.8.2](https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar), le renommer `junit.jar` et en placer une copie dans **chacun** de ces dossiers :

```text
message1/lib/junit.jar
message2/lib/junit.jar
message3/lib/junit.jar
```

JUnit est une dépendance des tests seulement : il ne figure pas dans les ZIP distribués.

## Construire

Depuis la racine du projet, en CMD :

```bat
ant clean
ant
```

| Commande | Action |
|---|---|
| `ant jar` | Construit les trois bibliothèques dans l'ordre |
| `ant test` | Exécute les trois suites JUnit |
| `ant test-message1` | Teste Message1 |
| `ant test-message2` | Construit Message1 et teste Message2 |
| `ant test-message3` | Construit Message1, Message2 et teste Message3 |
| `ant clean` | Supprime les classes, les distributions et les JAR copiés |
| `ant` | Construit les trois modules et exécute les tests |

Dans chaque module, `ant jar` produit un JAR, un fichier MD5 et un ZIP d'installation. Les ZIP de message2 et message3 contiennent également les JAR de leurs dépendances (sans JUnit). Le JAR d'une bibliothèque n'a pas de `Main-Class` et ne s'exécute pas directement avec `java -jar`.

Pour vérifier une empreinte sous Windows :

```bat
certutil -hashfile message3\dist\message3.jar MD5
type message3\dist\message3.jar.MD5
```

MD5 vérifie ici l'intégrité du fichier et non son authenticité cryptographique.

## IntelliJ IDEA

Dans **File → Project Structure** :

1. Choisir **JDK 8**.
2. Définir **Project → Compiler output** sur un dossier `out/` à la racine du projet.
3. Pour chacun des trois modules, marquer son `src/` **Sources Root** et son `test/` **Test Sources Root**.
4. Dans **Modules → Dependencies**, ajouter `junit.jar` du module, scope **Test**.
5. Ajouter également les JAR nécessaires depuis les dossiers `lib/` de message2 et message3, scope **Compile**, après un `ant jar`.
6. Dans **Modules → Paths**, choisir **Inherit project compile output path**.

Si l'icône verte Run manque sur un test, vérifier la dépendance JUnit et **Test Sources Root**. IntelliJ ne lit pas automatiquement les classpaths de `build.xml`. La compilation Ant fonctionne indépendamment de la compilation IntelliJ.

Si `The output path is not specified` apparaît, régler **Compiler output** dans la configuration IntelliJ. Le fichier `build.xml` gère de son côté `build/classes`, `build/tests` et `dist`.
