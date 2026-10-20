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

## Configurer IntelliJ IDEA sous Windows

**Ant et IntelliJ ont deux classpaths distincts.** Un JAR présent dans `lib/` et déclaré dans `build.xml` est exploitable par Ant, mais IntelliJ ne l'ajoute pas automatiquement aux dépendances de son compilateur. C'est notamment pourquoi un test peut fonctionner avec `ant test` sans afficher l'icône verte **Run** dans l'éditeur.

### 1. Préparer les JAR

Installer **JUnit 3.8.2**, et non JUnit 4 ou 5, dans les trois dossiers :

```text
message1/lib/junit.jar
message2/lib/junit.jar
message3/lib/junit.jar
```

Depuis la racine du projet, exécuter d'abord :

```bat
ant jar
```

Ant construit les bibliothèques dans l'ordre et copie automatiquement les JAR internes :

```text
message1/lib/junit.jar
message2/lib/junit.jar
message2/lib/message1.jar
message3/lib/junit.jar
message3/lib/message1.jar
message3/lib/message2.jar
```

Le simple dépôt des JAR suffit **pour Ant parce que les fichiers build.xml les déclarent dans leurs classpaths**. Ce ne serait pas suffisant sans cette configuration.

### 2. Déclarer trois modules dans IntelliJ

Ouvrir le projet dans IntelliJ IDEA. Dans **File → Project Structure** (`Ctrl + Alt + Shift + S`), vérifier que `message1`, `message2`, `message3` sont bien reconnus comme trois modules. Si ce n'est pas le cas, utiliser **Modules → + → Import Module** pour importer ou créer un module Java pour chaque dossier.

Dans **Project**, choisir le **JDK 8** comme SDK du projet.

Dans **Modules → Sources**, configurer pour chacun des trois modules :

| Répertoire | Marquage |
|---|---|
| `message1/src`, `message2/src`, `message3/src` | **Sources Root** (bleu) dans leurs modules respectifs |
| `message1/test`, `message2/test`, `message3/test` | **Test Sources Root** (vert) dans leurs modules respectifs |

Ne pas marquer `com/` ou `protocol/` comme racine : la racine des packages est bien `src/` ou `test/`.

### 3. Ajouter les dépendances de chaque module

Aller dans **Project Structure → Modules → Dependencies**. Choisir le module concerné, cliquer sur **+ → JARs or Directories**, sélectionner les JAR physiques dans son `lib/`, puis configurer leur **Scope** :

| Module IntelliJ | Fichier JAR | Scope |
|---|---|---|
| `message1` | `message1/lib/junit.jar` | **Test** |
| `message2` | `message2/lib/junit.jar` | **Test** |
| `message2` | `message2/lib/message1.jar` | **Compile** |
| `message3` | `message3/lib/junit.jar` | **Test** |
| `message3` | `message3/lib/message1.jar` | **Compile** |
| `message3` | `message3/lib/message2.jar` | **Compile** |

Pourquoi ces scopes ?

- **Test** : JUnit sert à compiler et exécuter `MessageXTest` uniquement.
- **Compile** : les classes `Message2` et `Message3` utilisent des classes des bibliothèques précédentes.

Dans cette démonstration, on choisit des **JAR** comme dépendances pour reproduire une livraison Java 8 sans Maven. IntelliJ permet également des dépendances entre modules, mais c'est une autre configuration.

Après modification, cliquer sur **Apply → OK**. Lorsqu'Ant reconstruit un JAR, il le recopie à la même adresse dans `lib/`.

### 4. Définir le répertoire de sortie d'IntelliJ

Si IntelliJ indique :

```text
The output path is not specified for module message1
```

Ouvrir **File → Project Structure → Project → Compiler output** et choisir, par exemple, le chemin absolu :

```text
D:\\demo\\java-ant-junit-libraries\\out
```

Dans **Modules → Paths**, sélectionner **Inherit project compile output path** pour les trois modules, puis **Apply → OK**.

| Build | Configuration | Répertoire de sortie |
|---|---|---|
| Ant | `messageX/build.xml` | `messageX/build/classes` et `messageX/build/tests` |
| IntelliJ | Project Structure | `out/` (sous-répertoires gérés par l'IDE) |
| Livraison Ant | `messageX/build.xml` | `messageX/dist/` |

Le réglage du **Compiler output** IntelliJ n'est pas tiré automatiquement du `build.xml`.

### 5. Lancer un test avec l'icône Run

Ouvrir, par exemple :

```text
message3/test/com/example/starter/protocol/Message3Test.java
```

```java
package com.example.starter.protocol;

import junit.framework.TestCase;

public class Message3Test extends TestCase {
    public void testCalculate() {
        Message3 message = new Message3();
        System.out.println("00000000001");
        assertEquals(10, message.calculate());
    }
}
```

IntelliJ devrait reconnaître cette méthode de test JUnit 3 et afficher l'icône verte dans la marge. Sélectionner **Run 'Message3Test.testCalculate()'**.

Résultat attendu : l'affichage `00000000001` et **un test réussi**.

Pour vérifier sans utiliser les configurations de tests IntelliJ, dans CMD à la racine :

```bat
ant test-message1
ant test-message2
ant test-message3
```

### 6. Diagnostic

| Symptôme | Cause ou vérification |
|---|---|
| `package junit.framework does not exist` | JAR JUnit absent des dépendances IntelliJ du module ou mauvais scope |
| `TestCase` / `assertEquals` en rouge | Vérifier `junit.jar` et son scope **Test** |
| Pas d'icône verte Run | Vérifier JUnit, `test/` en **Test Sources Root**, signature `public void test...`, prise en charge JUnit dans l'IDE |
| `Message1` ou `Message2` non résolu | Construire avec `ant jar`, puis déclarer les JAR internes avec scope **Compile** |
| `The output path is not specified` | Configurer **Project → Compiler output** et **Modules → Paths** |
| `ant test` fonctionne, mais pas Run dans IntelliJ | Ant a son classpath ; vérifier séparément la configuration des modules IntelliJ |
| Test d'IntelliJ lancé avec un mauvais Java | Vérifier le **Project SDK**, le **Module SDK** et le **JRE** de la Run Configuration |

**À retenir :** pour Ant, `lib/` + le classpath du `build.xml` ; pour IntelliJ, `Project Structure → Modules → Dependencies`, les racines `src/test` et le chemin de sortie du compilateur.
