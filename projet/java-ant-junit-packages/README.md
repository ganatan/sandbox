# Java 8 — Ant, JUnit 3, packages et tests séparés

Projet Java 8 minimal pour Windows, sans Maven ni Gradle. Compilation et livraison avec Apache Ant ; tests JUnit 3 avec `TestCase`.

## Arborescence

```text
java-ant-junit-packages/
├── build.xml
├── README.md
├── lib/
│   └── junit.jar
├── src/com/example/starter/
│   ├── Main.java
│   └── protocol/Message.java
├── test/com/example/starter/protocol/
│   └── MessageTest.java
├── build/
│   ├── classes/
│   └── tests/
└── dist/
    ├── app.jar
    ├── app.jar.MD5
    └── app-install.zip
```

`build/` et `dist/` sont générés par Ant. Les dossiers de packages sont des chemins (`com/example/starter`) tandis que leur déclaration Java utilise des points (`com.example.starter`).

## Prérequis Windows

Installer un JDK 8 et Apache Ant 1.10.x. Télécharger l'archive ZIP binaire d'Ant : https://ant.apache.org/bindownload.cgi

Décompresser dans `C:\apache-ant`, de sorte que `C:\apache-ant\bin\ant.bat` existe.

Sous Windows : `Win + R` → `sysdm.cpl` → **Avancé → Variables d'environnement**.

| Variable | Valeur d'exemple |
|---|---|
| `JAVA_HOME` | `C:\Program Files\Java\jdk1.8.0_XXX` |
| `ANT_HOME` | `C:\apache-ant` |
| `Path` | Ajouter `%JAVA_HOME%\bin` et `%ANT_HOME%\bin` |

Remplacer le chemin du JDK par celui réellement installé. Fermer et rouvrir CMD :

```bat
echo %JAVA_HOME%
echo %ANT_HOME%
java -version
javac -version
where ant
ant -version
```

Télécharger [JUnit 3.8.2](https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar), renommer le fichier en `junit.jar` et le placer dans `lib\junit.jar`. Le binaire n'est pas enregistré dans Git.

## Code et packages

- `Main` est dans `com.example.starter`.
- `Message` est dans `com.example.starter.protocol`.
- `MessageTest` est dans `com.example.starter.protocol` et hérite de `junit.framework.TestCase`.

`Main` importe `com.example.starter.protocol.Message`. `Message.calculate()` retourne `1 + 2`. Le test écrit `00000000001` et vérifie `assertEquals(3, message.calculate())`.

## Compilation, tests et livraison

Ouvrir CMD depuis le répertoire contenant `build.xml`.

| Commande | Action |
|---|---|
| `ant clean` | Supprime `build/` et `dist/` |
| `ant compile` | Compile `src/` vers `build/classes/` |
| `ant compile-test` | Compile `test/` vers `build/tests/` avec JUnit |
| `ant test` | Exécute `com.example.starter.protocol.MessageTest` |
| `ant jar` | Produit le JAR, le MD5 et le ZIP |
| `ant` | Compile, teste et génère les livrables |

```bat
ant clean
ant
java -jar dist\app.jar
```

Résultat de l'application :

```text
3
```

Le test JUnit affiche `00000000001` et, lorsqu'il réussit, un bilan `OK (1 test)`.

Le fichier `dist/app.jar` contient le manifeste `Main-Class: com.example.starter.Main`. Le fichier `app.jar.MD5` est l'empreinte MD5 du JAR. L'archive `app-install.zip` contient le JAR et son MD5. MD5 sert ici à contrôler l'intégrité, pas à garantir la sécurité cryptographique.

Pour vérifier sous CMD :

```bat
type dist\app.jar.MD5
certutil -hashfile dist\app.jar MD5
```

## IntelliJ IDEA : sources, tests, dépendances et output

Ouvrir **File → Project Structure** avec `Ctrl + Alt + Shift + S`.

Dans **Project**, sélectionner **JDK 8**, puis définir **Compiler output** sur le dossier `out` à la racine du projet.

Dans **Modules → Sources** :

1. Marquer `src/` comme **Sources Root**.
2. Marquer `test/` comme **Test Sources Root**.

Dans **Modules → Dependencies** : **+ → JARs or Directories**, sélectionner `lib\junit.jar` et définir le scope **Test**.

Dans **Modules → Paths** : sélectionner **Inherit project compile output path**.

Si l'avertissement `The output path is not specified for module java-ant-junit-packages` apparaît, vérifier **Compiler output** et **Modules → Paths**. Le `build.xml` gère indépendamment `build/classes/`, `build/tests/` et `dist/` : il ne règle pas automatiquement le compilateur IntelliJ.

Pour lancer les tests avec l'icône verte dans IntelliJ, vérifier que `test/` est marqué comme Test Sources Root, que JUnit est bien déclaré et que `MessageTest` est reconnu comme un test JUnit 3.

Pour compiler sans utiliser le compilateur de l'IDE, lancer `ant test` dans son terminal Windows.

## Diagnostic rapide

| Problème | Solution |
|---|---|
| `ant` non reconnu | Vérifier `ANT_HOME`, `Path` et rouvrir CMD |
| JUnit introuvable | Vérifier `lib\junit.jar` |
| Pas d'icône Run pour MessageTest | Vérifier Test Sources Root et la dépendance JUnit |
| Output path not specified | Définir Compiler output puis hériter du chemin dans Modules → Paths |
| JAR introuvable | Lancer `ant jar` depuis la racine |
