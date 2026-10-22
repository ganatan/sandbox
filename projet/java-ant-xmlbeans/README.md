# Java 8 — Ant, JUnit 3 et Apache XMLBeans

Second projet pour comparer **Apache XMLBeans** avec le projet [JAXB/XJC](../java-ant-junit-xsd/README.md). Il utilise le même film **Alien (1979)**, mais génère des types XMLBeans à partir du XSD plutôt que des POJO JAXB. **Aucun Maven ni Gradle.**

## 1. Arborescence

```text
java-ant-xmlbeans/
├── build.xml
├── README.md
├── src/
│   ├── main/com/ganatan/cinema/Main.java
│   ├── generated/
│   │   └── com/ganatan/cinema/generated/FilmDocument.java (généré)
│   └── misc/
│       ├── film.xsd
│       ├── film.xsdconfig
│       └── film.xml
├── test/com/ganatan/cinema/FilmTest.java
├── lib/
│   ├── xmlbeans-5.4.1.jar (à installer)
│   ├── ... autres JAR requis par XMLBeans
│   └── junit.jar (JUnit 3.8.2, à installer)
├── build/ (généré)
└── dist/ (généré)
    ├── film-schema.jar
    ├── app.jar
    └── app-install.zip
```

Les classes de `src/generated` sont créées à la compilation du schéma. Leurs noms et fichiers auxiliaires peuvent varier suivant le compilateur XMLBeans.

## 2. Prérequis

- **JDK 8** : `java -version` et `javac -version` doivent afficher Java 8.
- **Ant** : `ant -version`.
- **Apache XMLBeans 5.4.1** et les JAR de ses **dépendances d'exécution et de génération**, copiés dans `lib/`.
- **JUnit 3.8.2** : copier le JAR sous `lib/junit.jar`.

Téléchargement Apache : https://xmlbeans.apache.org/download/index.html

XMLBeans n'est **pas inclus dans le JDK 8** : contrairement à XJC/JAXB dans notre premier exemple, il faut fournir des JAR externes. Pour un environnement sans Internet, préparer et copier les dépendances sur une machine connectée. Les versions exactes des dépendances sont indiquées dans la distribution XMLBeans ou dans son POM. Le build Ant n'effectue **aucun téléchargement automatique**.

## 3. Comprendre les fichiers

| Fichier | Utilité |
|---|---|
| `film.xsd` | Définit un élément XML `film` avec `titre` et `annee` |
| `film.xsdconfig` | Demande à XMLBeans de générer les types du namespace dans `com.ganatan.cinema.generated` |
| `film.xml` | Exemple de XML conforme |
| `Main.java` | Crée un document XML typé puis renseigne ses champs |
| `FilmTest.java` | Vérifie les getters et setters du type XMLBeans généré |
| `build.xml` | Déclare la tâche Ant XMLBeans, compile, teste, crée les livrables |

Le code du `Main` utilise :

```java
FilmDocument document = FilmDocument.Factory.newInstance();
FilmDocument.Film film = document.addNewFilm();
film.setTitre("Alien");
film.setAnnee(1979);
```

À la différence de JAXB, les types XMLBeans représentent le **modèle XML** et sont accompagnés des métadonnées de schéma compilées dans `film-schema.jar`.

## 4. Les commandes

Exécuter depuis le répertoire contenant `build.xml` :

```bat
ant generate
ant compile
ant run
ant test
ant jar
```

Sortie attendue du programme :

```text
Alien (1979)
```

| Commande | Résultat |
|---|---|
| `ant generate` | Compile le XSD en types Java XMLBeans et en `dist/film-schema.jar` |
| `ant compile` | Compile `Main.java` avec XMLBeans et le schéma |
| `ant run` | Exécute `Main` avec le classpath de tous les JAR nécessaires |
| `ant test` | Exécute `FilmTest` avec JUnit 3 |
| `ant jar` | Produit `app.jar` et `app-install.zip` |
| `ant all` | Génération, compilation, tests et packaging |
| `ant clean` | Efface les résultats de compilation et de génération |

Pour exécuter depuis Windows sans Ant, après `ant jar`, utiliser un classpath comprenant **les deux JAR de dist et les dépendances de lib** :

```bat
java -cp "dist/app.jar;dist/film-schema.jar;lib/*" com.ganatan.cinema.Main
```

**Ne pas utiliser `java -jar dist/app.jar` seul** : les classes générées et les dépendances XMLBeans sont externes à `app.jar`.

## 5. IntelliJ IDEA

1. Ouvrir le dossier `java-ant-xmlbeans` avec IntelliJ.
2. Dans **Project Structure → Project**, sélectionner **JDK 1.8** et **Language level 8**.
3. Dans **Modules → Sources**, marquer `src/main` en **Sources**, `src/generated` en **Generated Sources** (ou Sources), et `test` en **Tests**. Ne pas configurer `src/misc` comme répertoire Java.
4. Dans **Modules → Dependencies**, ajouter les JAR de `lib` et, après génération, `dist/film-schema.jar`.
5. Exécuter **`ant generate`**, puis **Build → Rebuild Project**.
6. Lancer `Main` ou `FilmTest` directement avec le triangle vert.

Pour les tests IntelliJ, JUnit doit figurer dans les dépendances du module : la présence de `lib/junit.jar` ne suffit que pour les tâches Ant.

Si IntelliJ crée deux modules lors de l'import, vérifier les dossiers sources et le classpath du module utilisé ; éviter de supprimer des fichiers du disque en retirant un module redondant.

## 6. Dépannage

| Erreur | Explication / résolution |
|---|---|
| `xmlbeans-5.4.1.jar` absent | Copier XMLBeans dans `lib/` |
| `NoClassDefFoundError` pendant `generate` | Dépendance XMLBeans manquante dans `lib/` |
| `FilmDocument does not exist` | Exécuter `ant generate`, puis configurer `src/generated` et le schéma JAR |
| `cannot find symbol` | Vérifier package, sources IntelliJ et fichiers générés |
| `junit.framework.TestCase does not exist` | Installer `lib/junit.jar` et ajouter sa dépendance IntelliJ |
| `UnsupportedClassVersionError` | Vérifier le JDK et la compatibilité des JAR |
| Modification perdue dans `src/generated` | Modifier `film.xsd`, jamais les classes générées |

## 7. Différence JAXB / XMLBeans

| JAXB/XJC | Apache XMLBeans |
|---|---|
| Génère des classes de liaison Java/XML | Génère des types Java fortement liés au modèle XML |
| Exemple : `Film film = new Film()` | Exemple : `FilmDocument.Factory.newInstance()` |
| JAXB/XJC inclus dans de nombreux JDK 8 | Bibliothèque externe avec des dépendances |
| Mapping XML via annotations JAXB | XMLBeans nécessite son JAR de schéma compilé et sa bibliothèque |

**Remarque :** le code et la procédure sont fournis comme exemple de build ; leur exécution n'a pas été validée sur le poste de travail de l'utilisateur. Pour Apache XMLBeans, les dépendances exactes doivent être installées avant le premier `ant generate`.
