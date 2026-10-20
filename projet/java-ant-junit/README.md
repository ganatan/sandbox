# Java 8 — Apache Ant, JUnit 3 et IntelliJ sous Windows

Application Java 8 minimale, sans Maven ni Gradle, compilée avec Apache Ant à partir de `build.xml`. Un test JUnit 3 vérifie le résultat de `Message.calculate()`. Le livrable est un JAR exécutable.

## 1. Arborescence

```text
java-ant-junit/
├── README.md
├── build.xml
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
    ├── app.jar
    ├── app.jar.MD5
    └── app-install.zip
```

`build/` et `dist/` sont générés par Ant. Le dossier `lib/` est présent sur GitHub, mais `junit.jar` doit être ajouté localement.

## 2. Classes Java

### src/Message.java

```java
public class Message {
    public int calculate() {
        return 1 + 2;
    }
}
```

### src/Main.java

```java
public class Main {
    public static void main(String[] args) {
        Message message = new Message();
        System.out.println(message.calculate());
    }
}
```

### src/MessageTest.java

```java
import junit.framework.TestCase;

public class MessageTest extends TestCase {
    public void testCalculate() {
        Message message = new Message();
        System.out.println("00000000001");
        assertEquals(3, message.calculate());
    }
}
```

L'instruction `System.out.println("00000000001")` rend l'exécution du test visible dans la console.

`TestCase` appartient à **JUnit 3**. Une méthode de test commence par `test` et `assertEquals` compare le résultat attendu à celui de la méthode testée.

## 3. Installer Java 8 sur Windows

Installer un **JDK 8**, et non un simple JRE.

Ouvrir `Win + R`, saisir `sysdm.cpl`, puis **Avancé → Variables d'environnement**.

Configurer les variables système :

| Variable | Exemple |
|---|---|
| `JAVA_HOME` | `C:\Program Files\Java\jdk1.8.0_XXX` |
| `Path` | `%JAVA_HOME%\bin` |

Adapter le dossier du JDK à celui réellement installé. `JAVA_HOME` pointe vers la racine du JDK, pas vers `bin`.

Ouvrir un **nouveau CMD** :

```bat
echo %JAVA_HOME%
java -version
javac -version
where java
```

`java` et `javac` doivent utiliser la version 8 du JDK.

## 4. Installer Apache Ant sur Windows

Télécharger l'archive **binaire ZIP** depuis le site officiel : https://ant.apache.org/bindownload.cgi

Exemple de fichier : `apache-ant-1.10.18-bin.zip` (Ant 1.10.18 fonctionne avec Java 8).

Décompresser l'archive et placer son contenu dans :

```text
C:\apache-ant\
├── bin\
│   └── ant.bat
└── lib\
```

Vérifier que le fichier `C:\apache-ant\bin\ant.bat` existe réellement, sans dossier intermédiaire supplémentaire.

Ouvrir `Win + R` → `sysdm.cpl` → **Avancé → Variables d'environnement**.

Créer une variable système :

| Nom | Valeur |
|---|---|
| `ANT_HOME` | `C:\apache-ant` |

Ajouter cette entrée à la variable système `Path` :

```text
%ANT_HOME%\bin
```

Fermer les anciens terminaux et ouvrir un nouveau **CMD** :

```bat
echo %ANT_HOME%
where ant
ant -version
```

Résultat attendu pour `where ant` :

```text
C:\apache-ant\bin\ant.bat
```

Sans modifier le `Path`, Ant peut aussi être lancé avec son chemin complet :

```bat
C:\apache-ant\bin\ant.bat -version
```

## 5. Installer JUnit 3 dans lib/

Télécharger **JUnit 3.8.2** :

https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar

Renommer `junit-3.8.2.jar` en `junit.jar`, puis le copier dans :

```text
D:\demo\java-ant-junit\lib\junit.jar
```

Le projet utilise ce chemin relatif : `lib/junit.jar`. Pas besoin de Maven.

## 6. Compiler et tester avec Apache Ant

Ouvrir un **CMD** dans le dossier qui contient `build.xml` :

```bat
cd /d D:\demo\java-ant-junit
```

| Commande | Action |
|---|---|
| `ant clean` | Supprime `build/` et `dist/` |
| `ant compile` | Compile `Main.java` et `Message.java` dans `build/classes/` |
| `ant compile-test` | Compile `MessageTest.java` dans `build/tests/` |
| `ant test` | Compile et exécute le test JUnit |
| `ant jar` | Crée `dist/app.jar`, `app.jar.MD5` et `app-install.zip` |
| `ant` | Compile, teste, puis crée le JAR |
| `ant -p` | Liste les cibles principales disponibles |

Exécution complète :

```bat
ant clean
ant
java -jar dist\app.jar
```

Résultat attendu de l'application :

```text
3
```

Après `ant jar`, le dossier `dist/` contient :

| Fichier | Utilité |
|---|---|
| `app.jar` | Application Java exécutable (`Main-Class: Main`) |
| `app.jar.MD5` | Somme de contrôle MD5 du JAR (intégrité, pas sécurité cryptographique) |
| `app-install.zip` | Archive de livraison contenant `app.jar` et `app.jar.MD5` |

Pour afficher le MD5 et vérifier le JAR sous Windows CMD :

```bat
type dist\app.jar.MD5
certutil -hashfile dist\app.jar MD5
```

Comparer les deux valeurs hexadécimales. Pour installer, décompresser `app-install.zip` puis lancer `java -jar app.jar` dans le dossier extrait. `ant clean` supprime les anciens livrables.

Le test JUnit affiche un succès lorsqu'il passe, avec un bilan du type `OK (1 test)`. S'il échoue, `ant test` retourne une erreur et la cible `ant` ne génère pas le JAR.

`build.xml` distingue la compilation applicative de celle des tests. JUnit n'est pas inclus dans `dist/app.jar` car l'application n'en a pas besoin à l'exécution.

## 7. Configurer JUnit dans IntelliJ IDEA

Lorsqu'on ouvre le projet dans IntelliJ, le fichier `lib/junit.jar` peut être présent sur le disque sans être déclaré comme dépendance du module IntelliJ.

Symptômes dans `MessageTest.java` :

```text
package junit.framework does not exist
cannot find symbol class TestCase
cannot find symbol method assertEquals
```

Pour corriger :

1. Ouvrir **File → Project Structure** (raccourci Windows : `Ctrl + Alt + Shift + S`).
2. Ouvrir **Modules → Dependencies**.
3. Cliquer sur **+ → JARs or Directories**.
4. Sélectionner `D:\demo\java-ant-junit\lib\junit.jar`.
5. Choisir le scope **Compile** pour ce projet où `MessageTest.java` se trouve dans `src/`.
6. Cliquer sur **Apply → OK**.

Le scope `Test` convient lorsque les sources de test sont dans une racine marquée **Test Sources**. Ici, toutes les classes sont dans `src/`, donc le scope **Compile** évite une erreur de compilation IntelliJ.

Vérifier aussi dans **Project Structure → Project** que le SDK sélectionné est bien **JDK 8**.

**Important :** ajouter JUnit dans IntelliJ ne configure pas Ant ; ajouter JUnit dans `build.xml` ne configure pas automatiquement le compilateur interne d'IntelliJ. Les deux systèmes ont leur classpath.

Pour construire avec Ant dans IntelliJ, ouvrir son **Terminal**, s'assurer que la commande `ant` est reconnue, puis lancer `ant test` ou `ant`. Ce terminal utilise le `build.xml` du projet.

## 8. Corriger le chemin de sortie IntelliJ

Si IntelliJ affiche :

```text
The output path is not specified for module java-ant-junit
```

Cela concerne **le compilateur interne d'IntelliJ**, pas Apache Ant. Le fichier `build.xml` connaît déjà les dossiers `build/classes/`, `build/tests/` et `dist/`, mais IntelliJ n'importe pas automatiquement ces propriétés.

Pour corriger dans IntelliJ sous Windows :

1. Aller dans **File → Project Structure** (`Ctrl + Alt + Shift + S`).
2. Sous **Project**, définir **Compiler output** sur `D:\\demo\\java-ant-junit\\out`.
3. Sous **Modules → Paths**, sélectionner **Inherit project compile output path**.
4. Valider avec **Apply → OK**.

Le dossier `out/` peut être créé par le compilateur IntelliJ. Cela n'affecte pas le build Ant : pour compiler avec Ant, utiliser le terminal IntelliJ et `ant` ou `ant test`.

## 9. Comprendre le build

| IntelliJ | Apache Ant |
|---|---|
| Compile avec le système de build de l'IDE | Compile avec les cibles `build.xml` |
| Dépendances configurées dans **Modules → Dependencies** | Dépendances configurées via le classpath Ant |
| Affiche les erreurs dans l'éditeur | Affiche les erreurs dans CMD/Terminal |
| Peut créer son propre dossier `out/` | Produit `build/` et `dist/` |

Le dossier `out/`, s'il apparaît, est généré par IntelliJ et ne remplace pas le dossier `build/` d'Ant.

## 10. En cas de problème

| Erreur | Vérification |
|---|---|
| `ant n'est pas reconnu` | `ANT_HOME`, `Path`, nouveau terminal, `where ant` |
| `JAVA_HOME is set incorrectly` | `JAVA_HOME` doit pointer vers le dossier du JDK 8 |
| `lib/junit.jar` introuvable | Vérifier le nom et le dossier du fichier |
| `package junit.framework does not exist` dans IntelliJ | Ajouter le JAR au module IntelliJ avec le scope **Compile** |
| Tests Ant en échec | Vérifier `ant test` et `MessageTest.java` |
| `Unable to access jarfile dist\app.jar` | Lancer `ant jar` depuis la racine du projet |

Ce projet reste volontairement minimal : **trois classes, un fichier `build.xml`, une bibliothèque JUnit, un JAR exécutable, son MD5 et une archive ZIP**.
