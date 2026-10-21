# Java 8 — Guide de secours IntelliJ, Ant, JUnit et JAR externes

## Le problème réel

En mission : **Java 8, Ant, environ dix bibliothèques dépendantes**, plusieurs centaines de classes de test, des JAR placés dans d'autres répertoires et un accès Internet insuffisant pour chercher des solutions.

Constats :

1. Les scripts Ant compilent et exécutent les tests.
2. Les `System.out.println` des tests ne sont pas visibles dans la sortie Ant.
3. Après avoir configuré `src`, `test` et JUnit dans IntelliJ, tu as réussi à exécuter une classe avec ses affichages.
4. En rouvrant ou en réimportant le dépôt d'origine, l'exécution directe ne fonctionne plus.

**But : retrouver et exécuter une classe JUnit précise, voir les affichages et comprendre pourquoi la configuration disparaît.**

> Le fait qu'Ant réussisse prouve que son propre classpath fonctionne. Il ne garantit rien sur les modules ou les classpaths IntelliJ.

---

## 1 — La carte du problème : quatre configurations indépendantes

| Élément | Contrôlé par | Peut différer des autres ? |
|---|---|---|
| Compilation Ant | `build.xml`, `javac`, `path`, `fileset` | Oui |
| Exécution des tests Ant | Tâche `junit`, classpath et fork Ant | Oui |
| Compilation IntelliJ | SDK, modules, Source Roots, Dependencies | Oui |
| Exécution JUnit IntelliJ | Run Configuration, module classpath, working directory, JRE | Oui |

Un fichier `build.xml` ne configure pas automatiquement tous les modules IntelliJ. De même, un JAR présent sur disque n'est pas automatiquement chargé par Java.

### Repères indispensables

- **Classpath** : ensemble de répertoires de classes et de fichiers JAR effectivement visibles par la JVM.
- **Sources Root** : répertoire contenant le code applicatif.
- **Test Sources Root** : répertoire contenant le code de test.
- **Module** : unité IntelliJ avec ses chemins de compilation et ses dépendances.
- **Working directory** : répertoire de départ utilisé pour résoudre les chemins relatifs.
- **Portée Test** : dépendance utilisée pour la compilation/exécution des tests du module.
- **Dépendance transitive** : JAR ou module requis indirectement par une autre bibliothèque.

---

## 2 — Diagnostic express, à suivre dans cet ordre

1. Relever **le nom complet** de la classe de test, avec son package.
2. Noter **le module qui contient le test** et les bibliothèques nécessaires.
3. Exécuter la classe par Ant ou vérifier qu'elle fait partie d'une suite Ant réussie.
4. Repérer **le `build.xml` réellement invoqué** ; plusieurs scripts peuvent avoir des rôles différents.
5. Vérifier le **JDK 8** dans IntelliJ et dans le terminal.
6. Vérifier que les dossiers `src` et `test` sont marqués correctement **dans le bon module**.
7. Vérifier la présence de JUnit dans les dépendances de test.
8. Vérifier **tous les modules et JAR** nécessaires, y compris dans des dossiers extérieurs.
9. Créer une configuration **JUnit → Class** et choisir le bon **Use classpath of module**.
10. Vérifier **Working directory**, options JVM, propriétés système et variables d'environnement.
11. Exécuter ; recopier **la première erreur** et son premier `Caused by`.
12. Si la configuration disparaît après réouverture, vérifier les fichiers `.idea`, `*.iml`, le mode de réimportation et la sauvegarde des configurations.

Ne pas changer dix paramètres à la fois : modifier un élément, retester, puis noter le résultat.

---

## 3 — Exécuter une classe précise avec IntelliJ

### Méthode A : depuis le fichier

1. Ouvrir le projet dans IntelliJ.
2. `Ctrl+N` : rechercher le **nom de la classe** (`MessageReceiverTest`).
3. Ouvrir le fichier.
4. Clic droit sur le nom de la classe → **Run**.
5. Observer la fenêtre **Run**, les résultats JUnit et la console.

S'il n'y a pas de bouton Run : vérifier la déclaration `test` comme Test Sources Root, la présence de JUnit, le SDK du module et les conventions de test de la version JUnit.

### Méthode B : configuration nommée et reproductible

`Run → Edit Configurations → + → JUnit`

| Champ | Exemple |
|---|---|
| Name | `Test MessageReceiver` |
| Test kind | **Class** |
| Class | `com.exemple.message.MessageReceiverTest` |
| Use classpath of module | Module contenant cette classe ou son classpath complet |
| JRE | JDK 8 |
| Working directory | Répertoire attendu par le test |

La classe doit être accessible dans le module retenu. Si les JAR de la bibliothèque N utilisent la bibliothèque N−1, vérifier les dépendances des deux, et ainsi de suite.

### Méthode C : rechercher parmi des centaines de tests

- `Ctrl+N` : recherche par nom de classe.
- `Ctrl+Shift+N` : recherche par fichier.
- Double `Shift` : Search Everywhere.
- Clic droit sur un package : lancer toutes les classes de tests de ce package.
- Préférer une Run Configuration nommée pour les tests utilisés souvent.

### Méthode D : exécuter une seule méthode

Dans une configuration JUnit, choisir **Test kind → Method**, puis classe et méthode. Pour ton besoin actuel, choisir **Class** afin d'exécuter toutes les méthodes de **cette seule classe**.

---

## 4 — Configurer correctement les dix modules

Dans `File → Project Structure` :

### Project

- **Project SDK** : JDK 8.
- **Project language level** : 8 si applicable.

### Modules → Sources

Pour **chaque module** concerné :

- `src` → **Sources**.
- `test` → **Tests**.
- `build`, `dist`, `out` → ne pas les marquer comme sources ; les exclure si ce sont seulement des sorties générées.
- Vérifier le chemin des sources réel : parfois `src/main/java` et `src/test/java`, mais ne pas supposer que c'est le cas.
- Vérifier le **package** de la classe et la structure des dossiers.

### Modules → Dependencies

- SDK du module : Java 8.
- Dépendance JUnit : présente dans le module test.
- Bibliothèques Java internes : dépendances entre modules **ou** JAR construits et ajoutés.
- JAR externes : `+ → JARs or Directories`, chemin correct.
- Portée **Test** pour JUnit ; `Compile` si la bibliothèque est nécessaire au code de production.
- Si IntelliJ propose l'export d'une dépendance, vérifier la visibilité dans les modules consommateurs ; ne pas supposer que toutes les transitivités sont automatiques.

**Ne pas mélanger sans nécessité** un module de sources et le JAR compilé de ce même module, car cela peut créer des classes dupliquées.

---

## 5 — Les JAR dans d'autres répertoires

Exemples :

```text
D:\work\repo\Message10\test\...
D:\work\shared\jars\common.jar
D:\vendor\legacy\protocol.jar
D:\work\repo\Message9\dist\message9.jar
```

Les chemins peuvent être absolus, relatifs ou définis par des propriétés Ant. Sur un nouveau poste ou après un clone, les chemins absolus peuvent être invalides.

### Vérifier sur Windows CMD

```bat
dir D:\work\shared\jars
dir D:\vendor\legacy
dir D:\work\repo\Message9\dist
```

### Vérifier sur Linux

```bash
ls -l /work/shared/jars
ls -l /work/vendor/legacy
ls -l /work/repo/Message9/dist
```

Si un JAR manque, déterminer s'il doit être fourni par l'équipe, généré par un autre projet ou présent dans un répertoire partagé. **Ne pas substituer une version arbitraire.**

### Dépendances transitives

```text
Message10Test
  -> Message10
     -> Message9
        -> Message8
           -> common.jar
              -> autre.jar
```

Le chargement de `Message10` peut échouer à l'exécution si `autre.jar` est absent, même si la classe de test compile.

### Ordre et doublons

Deux JAR contenant la même classe peuvent provoquer l'utilisation d'une version inattendue. Retirer les doublons lorsque c'est possible ; aligner les versions et les classpaths entre Ant et IntelliJ.

---

## 6 — JUnit 3 et JUnit 4 : ne pas les confondre

### JUnit 3

```java
import junit.framework.TestCase;

public class MessageTest extends TestCase {

    public void testMessage() {
        System.out.println("TEST MESSAGE");
        assertEquals(2, 1 + 1);
    }
}
```

- Hériter de `TestCase`.
- Méthodes publiques commençant par `test`.
- Une version JUnit 3 compatible doit être dans le classpath.

### JUnit 4

```java
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class MessageTest {

    @Test
    public void testMessage() {
        System.out.println("TEST MESSAGE");
        assertEquals(2, 1 + 1);
    }
}
```

- Annotation `@Test`.
- `junit-4.x.jar`, et selon le JAR utilisé, **Hamcrest** doit aussi être disponible pour les assertions et certains composants.
- Ne pas supposer que des JAR JUnit 3 et JUnit 4 sont interchangeables.
- L'intégration IntelliJ doit reconnaître le framework ; si elle propose de télécharger JUnit, refuser si ce n'est pas autorisé et référencer le JAR déjà disponible.

---

## 7 — Pourquoi `System.out.println` est invisible avec Ant

Un test peut s'exécuter correctement mais son flux standard ne pas apparaître là où tu regardes.

Les causes les plus courantes :

1. La tâche `junit` capture les sorties.
2. Le rapport est écrit dans un fichier plutôt que dans la console.
3. Le formateur utilise `usefile="true"`.
4. Ant est exécuté depuis une fenêtre différente de celle consultée.
5. Le test n'est pas exécuté directement mais par une suite ou une tâche intermédiaire.
6. Le test est lancé dans une JVM séparée avec sa propre configuration.
7. Le niveau de verbosité ou une redirection masque une partie de la sortie.
8. Le `println` n'est jamais atteint, malgré la réussite d'autres tests.

### Exemple de tâche Ant — sortie visible dans la console

```xml
<target name="test">
    <junit fork="true"
           printsummary="yes"
           haltonfailure="no"
           showoutput="true">
        <classpath>
            <pathelement location="build/classes"/>
            <pathelement location="build/test-classes"/>
            <fileset dir="lib">
                <include name="*.jar"/>
            </fileset>
        </classpath>
        <formatter type="plain" usefile="false"/>
        <test name="com.exemple.message.MessageTest"/>
    </junit>
</target>
```

**Adapter les chemins à ton projet.** Si JUnit ou les dépendances sont stockés ailleurs, ajouter les chemins adéquats au classpath. La cible suppose que les classes et les tests sont déjà compilés.

- `showoutput="true"` : demande d'afficher les sorties standard/erreur capturées par les tests.
- `printsummary="yes"` : bilan des résultats, **pas** équivalent aux `println`.
- `formatter type="plain" usefile="false"` : affichage du rapport texte dans la console.
- `fork="true"` : exécution dans une JVM séparée, utile pour isoler certains paramètres mais nécessitant le bon classpath.

Selon le contexte, le flux imprimé et les rapports peuvent entraîner des affichages redondants. Commencer avec `showoutput="true"`, puis choisir le formateur adapté.

### Si le résultat se trouve dans un fichier

Chercher les rapports Ant : `TEST-*.txt`, `TEST-*.xml`, répertoires `reports`, `test-results`, `build` ou chemins définis par `todir`. Le chemin dépend du `build.xml`.

### Augmenter le diagnostic Ant

```bat
ant -p
ant -verbose test
ant -debug test
```

Attention : `test` est un **nom de cible d'exemple**. Utiliser le vrai nom trouvé avec `ant -p`. Les sorties de `-debug` sont volumineuses et peuvent divulguer des chemins ou paramètres internes.

---

## 8 — Exécuter une seule classe depuis Ant

### Option 1 : classe fixée dans `build.xml`

```xml
<test name="com.exemple.message.MessageTest"/>
```

### Option 2 : sélectionner via une propriété

```xml
<property name="test.class" value="com.exemple.message.MessageTest"/>

<target name="test-one">
    <junit fork="true" printsummary="yes" showoutput="true" haltonfailure="yes">
        <classpath>
            <pathelement location="build/classes"/>
            <pathelement location="build/test-classes"/>
            <fileset dir="lib">
                <include name="*.jar"/>
            </fileset>
        </classpath>
        <formatter type="plain" usefile="false"/>
        <test name="${test.class}"/>
    </junit>
</target>
```

Commande :

```bat
ant -Dtest.class=com.exemple.message.MessageTest test-one
```

Ne fonctionne que si la cible `test-one` est réellement définie, les tests déjà compilés et tous les JAR nécessaires sur le classpath.

### Option 3 : exécution directe de JUnit

JUnit 4 (si les JAR existants conviennent) :

```bat
java -cp "build\classes;build\test-classes;D:\work\shared\jars\junit-4.jar;D:\work\shared\jars\hamcrest-core.jar;D:\vendor\legacy\protocol.jar" org.junit.runner.JUnitCore com.exemple.message.MessageTest
```

JUnit 3 :

```bat
java -cp "build\classes;build\test-classes;D:\work\shared\jars\junit.jar;D:\vendor\legacy\protocol.jar" junit.textui.TestRunner com.exemple.message.MessageTest
```

Remplacer les noms et ajouter **toutes** les dépendances du module et de leurs dépendances.

Sous Linux, utiliser le séparateur `:` entre entrées du classpath ; sous Windows, le séparateur est `;`. Les séparateurs de chemins du système sont indépendants de la version de Java.

### Test rapide pour distinguer IntelliJ et Ant

Si une même classe fonctionne par `java -cp` mais échoue depuis IntelliJ, comparer les classpaths, la JVM, le répertoire de travail, les propriétés et les variables d'environnement.

---

## 9 — Pourquoi tout cesse de marcher après avoir rouvert le dépôt

C'est un cas prioritaire de ton problème.

### Cause A : la configuration IntelliJ était locale et temporaire

- La configuration créée automatiquement n'est pas nécessairement conservée comme configuration projet partagée.
- Vérifier `Run → Edit Configurations`.
- Enregistrer les configurations nécessaires comme **fichiers projet** quand la version d'IntelliJ le permet.
- Vérifier l'emplacement proposé par l'IDE et les fichiers `.idea/runConfigurations` ou `.run` selon la version et la configuration.

### Cause B : les fichiers `.idea` ou `*.iml` ont disparu

- Après un clone, IntelliJ peut ne pas retrouver la même définition de modules.
- Les réglages locaux ne sont pas obligatoirement versionnés dans Git.
- Une réimportation Ant ou un nouvel `Open` peut reconstruire différemment les modules.
- Vérifier que tu as ouvert **le dossier racine approprié**, pas un sous-projet isolé.

### Cause C : nouveaux chemins vers les JAR

- Le projet précédemment testé pointait vers des chemins absolus.
- Les JAR existent dans l'ancien workspace mais pas dans le nouveau.
- Les références de bibliothèques du module ne correspondent plus.

### Cause D : mauvais module dans la Run Configuration

- La classe existe mais le module sélectionné ne contient pas ses classes ni ses dépendances.
- La configuration vise un ancien nom de module.
- L'exécution utilise un classpath incomplet.

### Cause E : les répertoires marqués ne sont pas conservés

- `src` et `test` doivent être reconnus **sur chaque module**.
- Vérifier que `test` n'est pas marqué `Excluded`.
- Inspecter les fichiers `*.iml` si leur gestion est autorisée.

### Cause F : les sorties compilées ont disparu

Les dossiers `build` ou `dist` sont souvent ignorés par Git et donc absents d'un clone frais. Recompiler les modules dans le bon ordre avant de lancer les tests.

### Cause G : réouverture avec un JDK différent

- IntelliJ peut avoir modifié le SDK de projet ou de module.
- L'Ant lancé depuis le terminal peut utiliser un JDK différent d'IntelliJ.
- Recontrôler `java -version`, `javac -version`, `Project SDK` et `JRE` de la configuration de test.

### Procédure après réouverture

1. Vérifier l'emplacement réel du projet.
2. Vérifier les modules.
3. Vérifier `src` et `test`.
4. Vérifier SDK Java 8.
5. Vérifier dépendances entre modules.
6. Vérifier JUnit et JAR externes.
7. Vérifier les chemins de sorties.
8. Recompiler.
9. Recréer ou corriger **une seule** configuration JUnit nommée.
10. Exécuter et comparer avec Ant.

---

## 10 — Catalogue des messages d'erreur et solutions

| Erreur / symptôme | Causes probables | Vérification |
|---|---|---|
| `package org.junit does not exist` | JUnit absent du classpath de compilation | Modules → Dependencies, Ant javac classpath |
| `package junit.framework does not exist` | JUnit 3 absent | Vérifier JAR utilisé |
| `cannot find symbol` | Classe absente, import, version, source non compilée | Dépendances, imports, sorties |
| `ClassNotFoundException` | Classe recherchée absente du classpath | Package, dossier classes, JAR |
| `NoClassDefFoundError` | Classe requise absente ou problème lors de son initialisation | Premier `Caused by`, dépendances transitives |
| `NoSuchMethodError` | Versions incompatibles à l'exécution | Doublons et ordre des JAR |
| `NoSuchFieldError` | Incompatibilité binaire | Aligner les versions |
| `UnsupportedClassVersionError` | Bytecode compilé avec un Java plus récent | Vérifier JDK 8 et version du JAR |
| `ClassCastException` | Types ou classloaders incompatibles | Origine réelle des classes |
| `ExceptionInInitializerError` | Échec d'un initialiseur statique | Examiner la cause initiale |
| `UnsatisfiedLinkError` | Bibliothèque native manquante ou incompatible | `java.library.path`, architecture 32/64 bits |
| `No tests found` | Mauvais framework, nom/annotation, classe, module | JUnit 3 vs 4, package |
| `No runnable methods` | Méthodes non reconnues par le moteur JUnit choisi | `@Test` ou `testXxx` |
| `initializationError` | Chargement ou initialisation de la classe de test en échec | Trace complète, JUnit, constructeurs |
| `java.lang.AssertionError` | Assertion échouée | Valeur attendue / observée |
| `FileNotFoundException` | Working directory ou fichier absent | Chemin relatif et existence |
| `AccessDeniedException` | Droits insuffisants | Permissions et fichiers verrouillés |
| `BindException: Address already in use` | Port réseau déjà occupé | Configuration, processus et port |
| `ConnectException` | Service attendu inaccessible | Adresse, port, service |
| `SocketTimeoutException` | Réponse réseau non reçue dans le délai | Délais et disponibilité |
| `OutOfMemoryError` | Mémoire insuffisante | Taille heap et usage |
| `StackOverflowError` | Récursion trop profonde ou boucle d'appels | Trace d'appels |
| `Circular dependency` | Modules ou cibles formant un cycle | Dessiner le graphe des dépendances |
| `taskdef class ... cannot be found` | Ant ne voit pas la bibliothèque de sa tâche | Classpath d'Ant et JAR requis |
| `junit task not found` | Support JUnit de la version Ant incomplet | Vérifier les JAR Ant-JUnit déjà installés |
| `Unable to find a javac compiler` | Ant s'exécute avec un JRE au lieu d'un JDK ou configuration invalide | JAVA_HOME et Java utilisé par Ant |
| Tests OK mais rien dans la console | Sortie capturée ou écrite en fichier | `showoutput`, `formatter`, `todir` |
| Tests OK sous Ant, KO sous IntelliJ | SDK / classpath / working directory différents | Comparaison systématique |
| Tests KO après réouverture | Modules, Run Config ou références locales perdues | Section 9 |

Une erreur peut avoir plusieurs causes. **Toujours conserver le message complet et chercher le premier problème causal**, pas uniquement la dernière ligne.

---

## 11 — Vérifications JVM et JAR utiles hors ligne

### JDK et Ant

Windows CMD :

```bat
where java
where javac
where ant
java -version
javac -version
ant -version
echo %JAVA_HOME%
echo %CLASSPATH%
```

Linux :

```bash
which java
which javac
which ant
java -version
javac -version
ant -version
echo "$JAVA_HOME"
echo "$CLASSPATH"
```

### Vérifier le contenu d'un JAR

```bat
jar tf D:\work\shared\jars\common.jar
jar tf D:\work\shared\jars\junit.jar
```

Rechercher un nom de classe sous Windows :

```bat
jar tf D:\work\shared\jars\common.jar | findstr Message
```

Sous Linux :

```bash
jar tf /work/shared/jars/common.jar | grep Message
```

### Vérifier la version bytecode

```bat
javap -verbose -classpath build\classes com.exemple.message.Message | findstr "major version"
```

Pour du bytecode Java 8, **major version = 52**. Lancer cette commande uniquement si la classe existe bien dans le classpath.

### Savoir d'où une classe est chargée

Dans les options JVM d'une exécution Java 8 :

```text
-verbose:class
```

Le journal indique les classes chargées et aide à découvrir quel JAR a fourni une version inattendue. Très verbeux : retirer après le diagnostic.

---

## 12 — Vérifier un build Ant qui appelle d'autres builds

Sur un dépôt à dix bibliothèques, `ant test` peut lancer d'autres cibles, d'autres fichiers de build ou plusieurs projets.

Rechercher dans les fichiers `build.xml` :

- `<ant ...>` et `<subant ...>`.
- `<import ...>` et `<include ...>`.
- `<property file="...">`.
- `<path>`, `<pathconvert>`, `<fileset>`, `<pathelement>`.
- `<javac>`, `<junit>`, `<batchtest>`, `<formatter>`.
- `depends="..."`, `fork`, `dir`, `todir`.

Les fichiers `.properties` peuvent définir des chemins vers d'autres dépôts. Il faut identifier **le chemin finalement résolu**, et non seulement celui visible dans le fichier principal.

---

## 13 — Les différences entre un test JUnit et un test d'intégration

Un test qui ouvre un socket, utilise une base de données, lit un fichier sur un partage ou lance une commande système peut échouer même avec tous les JAR présents.

Vérifier :

- Ports TCP/UDP et adresses attendues.
- Fichiers de configuration externes.
- Working directory.
- Variables d'environnement.
- Propriétés `-D...`.
- Répertoires temporaires et droits d'accès.
- Fuseau horaire et locale.
- Service tiers disponible ou simulation requise.
- Tests dépendants de l'ordre d'exécution.
- Tests qui modifient un même fichier ou port en parallèle.

**Ne pas modifier des ports, identifiants, secrets ou fichiers de mission pour faire artificiellement passer les tests.**

---

## 14 — Fiche de diagnostic à remplir sans Internet

```text
Nom du dépôt :
Dossier ouvert dans IntelliJ :
Module contenant la classe :
Package + classe de test :
Version Java terminal :
Version Java IntelliJ :
Version Ant :
JUnit 3 ou 4 :
Chemin du JAR JUnit :
Autres JAR nécessaires :
Dépendances entre modules :
Nom de la cible Ant :
Commande Ant exacte :
Résultat Ant :
System.out visible sous Ant : oui / non
System.out visible sous IntelliJ : oui / non
Test direct IntelliJ : oui / non
Working directory :
Configuration conservée après réouverture : oui / non
Première erreur complète :
Premier Caused by :
Dernière modification effectuée :
Résultat après modification :
```

---

## 15 — Plan de secours recommandé pour la mission

**Étape 1 :** garder Ant comme référence de build et de tests pour le projet professionnel.

**Étape 2 :** faire afficher un test connu dans Ant via `showoutput="true"`, sans casser les scripts partagés (adapter un fichier de travail autorisé).

**Étape 3 :** monter le graphe des dix bibliothèques et identifier les chemins de JAR réellement nécessaires à une classe de test.

**Étape 4 :** faire fonctionner **une seule** classe dans IntelliJ avec la bonne configuration JUnit.

**Étape 5 :** fermer puis rouvrir le projet **sans modifier le dépôt**. Vérifier si les modules, JAR et configurations sont conservés.

**Étape 6 :** si l'import IntelliJ se perd, conserver une procédure locale documentée et réexécuter la vérification. Toute modification versionnée du projet professionnel doit être conforme aux règles de l'équipe.

**Étape 7 :** seulement ensuite, multiplier les classes de test individuelles à lancer.

### Règle finale

**Ant OK + IntelliJ KO → comparer SDK, classpath, modules, fichiers de configuration et répertoire de travail.**

**Ant OK + `println` invisible → inspecter la tâche JUnit, la capture des sorties et les fichiers de rapport.**

**Tout fonctionnait avant réouverture → inspecter la persistance des paramètres IntelliJ et les chemins externes avant de toucher au code Java.**
