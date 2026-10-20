# Java 8 — Ant et JUnit 3

Exemple minimal sans Maven ni Gradle. Trois classes Java, compilation Apache Ant, test JUnit 3 et JAR exécutable.

## Arborescence

```text
java-ant-junit/
├── build.xml
├── README.md
├── lib/
│   └── junit.jar
├── src/
│   ├── Main.java
│   ├── Message.java
│   └── MessageTest.java
├── build/
│   ├── classes/
│   └── tests/
└── dist/
    └── app.jar
```

`build/` et `dist/` sont créés automatiquement. Le fichier `lib/junit.jar` doit être téléchargé localement (non versionné).

## Prérequis

JDK 8 et Apache Ant installés :

```bash
java -version
javac -version
ant -version
```

Télécharger [JUnit 3.8.2](https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar), le renommer `junit.jar` et le placer dans `lib/`.

Sous Linux :

```bash
curl -fL https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar -o lib/junit.jar
```

Sous Windows PowerShell :

```powershell
Invoke-WebRequest https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar -OutFile lib/junit.jar
```

## Commandes Ant

À exécuter depuis `java-ant-junit/` :

| Commande | Action |
|---|---|
| `ant clean` | Supprime les répertoires générés |
| `ant compile` | Compile Main et Message dans build/classes |
| `ant compile-test` | Compile MessageTest dans build/tests |
| `ant test` | Exécute le test avec JUnit 3 |
| `ant jar` | Crée dist/app.jar |
| `ant` | Compile, teste, puis crée le JAR |

Lancer l'application :

```bash
java -jar dist/app.jar
```

Résultat attendu :

```text
3
```

Le test vérifie que `calculate()` retourne bien `3` avec `assertEquals(3, message.calculate())`. Le JAR applicatif ne contient pas JUnit et n'en dépend pas à l'exécution.
