# Java 8 — Ant, JUnit et classes générées depuis XSD

Exemple minimal d'un projet Java 8 qui utilise une classe `Film` générée automatiquement depuis un schéma XML (`film.xsd`). Aucun Maven ni Gradle.

## Arborescence

```text
java-ant-junit-xsd/
├── src/
│   ├── main/com/ganatan/cinema/Main.java
│   ├── generated/
│   │   └── com/ganatan/cinema/generated/Film.java (créé par Ant)
│   └── misc/
│       ├── film.xsd
│       └── film.xml
├── test/com/ganatan/cinema/FilmTest.java
├── lib/
│   └── junit.jar (à ajouter pour les tests)
├── build.xml
└── dist/ (créé par Ant)
    ├── app.jar
    └── app-install.zip
```

## Prérequis

- JDK **8** avec l'outil `xjc` (JAXB/XSD, intégré au JDK Oracle/OpenJDK 8 classique)
- Apache Ant disponible dans le `PATH`
- JUnit **3.8.2** enregistré sous `lib/junit.jar` pour lancer les tests

Vérifier dans un terminal :

```bash
java -version
javac -version
xjc -version
ant -version
```

Il faut utiliser le **JDK 8**, et pas un JRE seul. Sur des JDK récents, XJC n'est plus fourni par défaut.

## Les trois répertoires de src

- `src/misc/film.xsd` décrit les champs `titre` (texte) et `annee` (entier).
- `src/generated/` reçoit les sources Java **générées par XJC**. Il ne faut pas modifier manuellement `Film.java`.
- `src/main/` contient `Main.java`, écrit manuellement, qui importe `com.ganatan.cinema.generated.Film`.

Le fichier `src/misc/film.xml` est un exemple de données conformes au XSD ; il n'est pas nécessaire pour exécuter le Main.

## Étape 1 — Générer les classes

Depuis le répertoire du projet :

```bash
ant generate
```

Ant exécute l'équivalent de :

```bash
xjc -encoding UTF-8 -d src/generated -p com.ganatan.cinema.generated src/misc/film.xsd
```

Le résultat comprend `Film.java`, dans le package `com.ganatan.cinema.generated`, ainsi que d'éventuels fichiers annexes produits par XJC.

## Étape 2 — Compiler et exécuter

```bash
ant compile
ant run
```

Résultat attendu :

```text
Alien (1979)
```

On peut également générer puis lancer le JAR :

```bash
ant jar
java -jar dist/app.jar
```

La compilation utilise ensemble les classes écrites dans `src/main` et les classes produites dans `src/generated`. Le JAR contient leurs fichiers `.class` compilés.

## Étape 3 — Tester avec JUnit 3

Copier `junit-3.8.2.jar` vers `lib/junit.jar` puis exécuter :

```bash
ant test
```

Le test `FilmTest` étend `junit.framework.TestCase` et vérifie les getters/setters de la classe générée.

## Commandes Ant

| Commande | Action |
|---|---|
| `ant generate` | Générer les classes depuis le XSD |
| `ant compile` | Générer puis compiler les classes |
| `ant run` | Exécuter `Main` |
| `ant test` | Générer, compiler et tester avec JUnit |
| `ant jar` | Construire `dist/app.jar` et le ZIP |
| `ant all` | Tests puis livrables (JUnit requis) |
| `ant clean` | Supprimer `build`, `dist` et les sources générées |

## IntelliJ IDEA

1. Ouvrir le dossier `java-ant-junit-xsd` comme projet.
2. Dans **Project Structure → Project**, sélectionner un **JDK 1.8** et un niveau de langage **8**.
3. Exécuter d'abord `ant generate` depuis le panneau Ant ou le terminal.
4. Marquer `src/main` comme **Sources Root**, `src/generated` comme **Generated Sources Root** et `test` comme **Test Sources Root** si IntelliJ ne les reconnaît pas.
5. Ajouter `lib/junit.jar` dans **Project Structure → Modules → Dependencies**, pour exécuter les tests directement dans IntelliJ.
6. Dans l'exécution du test, vérifier que le **module classpath** et le **SDK** sont ceux du projet Java 8.

Le fichier `build.xml` pilote la construction Ant ; les dépendances configurées dans Ant ne sont pas automatiquement ajoutées au classpath des tests lancés par IntelliJ.

## Modifier le modèle

Changer `src/misc/film.xsd`, puis exécuter `ant generate` et `ant compile`. Les classes générées peuvent être recréées : modifier le XSD, pas `Film.java`.

Le fichier `src/generated/.gitkeep` conserve le répertoire vide dans Git, tandis que les fichiers Java générés sont ignorés par `.gitignore`.
