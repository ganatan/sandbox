# Java 8 — Logging maison, Ant et JUnit 3

Projet autonome reproduisant, **à titre pédagogique**, les huit noms de classes et d'interfaces du package `log` évoqués dans le projet industriel. Leur implémentation ici est inventée pour l'exemple : elle ne présume pas du code de l'équipe.

## Arborescence

```text
java-ant-junit-logging/
├── src/com/ganatan/cinema/
│   ├── Main.java
│   └── log/
│       ├── DefaultLogger.java
│       ├── DefaultLoggerFactory.java
│       ├── InterfaceLogger.java
│       ├── InterfaceLoggerFactory.java
│       ├── InterfaceLoggerFactoryWithIgnore.java
│       ├── LoggerFactory.java
│       ├── LoggerFactoryThreads.java
│       └── LogLevel.java
├── test/com/ganatan/cinema/log/LoggingTest.java
├── lib/junit.jar (à ajouter pour les tests)
├── build.xml
└── dist/ (généré par Ant)
```

## Pourquoi huit éléments ?

| Élément | Responsabilité dans cet exemple |
|---|---|
| `InterfaceLogger` | Contrat `log`, `debug`, `info`, `warn`, `error` |
| `DefaultLogger` | Affiche les messages sur la console |
| `LogLevel` | Seuil `DEBUG`, `INFO`, `WARN`, `ERROR` |
| `InterfaceLoggerFactory` | Contrat de création d'un logger |
| `DefaultLoggerFactory` | Fabrique un `DefaultLogger` avec un seuil donné |
| `LoggerFactory` | Point d'accès global à la factory |
| `InterfaceLoggerFactoryWithIgnore` | Décorateur qui masque les messages contenant un texte défini |
| `LoggerFactoryThreads` | Factory propre au thread courant via `ThreadLocal`, repli sur la factory globale |

La conception utilise les patterns **Factory**, **Decorator** et `ThreadLocal`. Aucun Log4j/SLF4J/JAXB n'est utilisé ; les messages vont sur `System.out`.

## Prérequis

- JDK **8**
- Apache **Ant**
- Pour les tests : JUnit **3.8.2** dans `lib/junit.jar`

```bash
java -version
javac -version
ant -version
```

## Lancer l'application

À la racine de ce dossier :

```bash
ant compile
ant run
```

Sortie attendue :

```text
[INFO] [Main] Demarrage du catalogue
[DEBUG] [Main] Chargement du film Alien
[ERROR] [Main] Erreur de demonstration
[INFO] [Main] Film visible
```

Le message du thread au niveau `INFO` est filtré lorsque le seuil est `ERROR`. Le message contenant `SECRET` est supprimé par le décorateur.

## Tests et distribution

Après ajout du JAR JUnit :

```bash
ant test
ant jar
ant all
```

Pour exécuter le livrable :

```bash
java -jar dist/app.jar
```

`dist/` contient `app.jar`, `app.jar.MD5` et `app-install.zip`.

Pour nettoyer :

```bash
ant clean
```

## IntelliJ

1. Ouvrir le répertoire du projet.
2. **Project Structure → Project** : sélectionner JDK 8.
3. **Modules → Sources** : marquer `src` comme **Sources Root** et `test` comme **Test Sources Root**.
4. Pour lancer les tests depuis IntelliJ, ajouter `lib/junit.jar` dans **Modules → Dependencies**.
5. Démarrer `Main` avec le triangle vert ou `ant run`.

Les tests Ant connaissent leur classpath depuis `build.xml` ; IntelliJ doit recevoir sa configuration propre pour lancer `LoggingTest` directement.

## Modifier le comportement

- Pour filtrer davantage : remplacer `LogLevel.DEBUG` par `LogLevel.WARN`.
- Pour supprimer un message : ajuster le texte transmis à `InterfaceLoggerFactoryWithIgnore`.
- Pour personnaliser les logs d'un thread : utiliser `LoggerFactoryThreads.setFactoryForCurrentThread(...)` puis appeler **toujours** `clearFactoryForCurrentThread()` dans un `finally`, surtout en présence d'un pool de threads.

**Limites :** exemple synchrone sur console, pas de rotation de fichiers, pas de configuration XML, pas d'intégration à Log4j. Une vraie bibliothèque industrielle peut avoir des signatures et des comportements totalement différents.
