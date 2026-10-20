# Java 8 — Tutoriel progressif complet : Ant, JUnit et bibliothèques JAR

Ce tutoriel réunit les trois exemples de `sandbox/projet/` et permet de les recréer **fichier par fichier**, sans Maven, Gradle ou Spring. Plateforme : **Windows CMD**, **JDK 8**, **Apache Ant** et **JUnit 3.8.2**.

## Sommaire

1. Installer Java 8, Apache Ant et JUnit sur Windows
2. Niveau 1 : application simple et test dans `src/`
3. Niveau 2 : packages Java, séparation `src/` et `test/`
4. Niveau 3 : trois bibliothèques, copies de JAR et build par module
5. Configurer IntelliJ IDEA : modules, JUnit, dépendances, Compiler output et Run
6. Diagnostiquer les erreurs et vérifier les livrables

## 1. Préparer Windows

Installer un **JDK 8** puis télécharger le ZIP binaire d'Apache Ant : https://ant.apache.org/bindownload.cgi

Exemple : extraire Ant de façon à avoir `C:\apache-ant\bin\ant.bat`.

Depuis **Win + R → sysdm.cpl → Avancé → Variables d'environnement** :

| Nom | Exemple Windows |
|---|---|
| `JAVA_HOME` | `C:\Program Files\Java\jdk1.8.0_XXX` |
| `ANT_HOME` | `C:\apache-ant` |
| `Path` | Ajouter `%JAVA_HOME%\bin` et `%ANT_HOME%\bin` |

Adapter le chemin `JAVA_HOME` à votre installation réelle. Ouvrir ensuite un **nouveau CMD** :

```bat
echo %JAVA_HOME%
echo %ANT_HOME%
where java
where javac
where ant
java -version
javac -version
ant -version
```

Les commandes `java` et `javac` doivent pointer vers Java 8. JUnit 3.8.2 est téléchargeable ici : https://repo.maven.apache.org/maven2/junit/junit/3.8.2/junit-3.8.2.jar

Télécharger ce fichier et le **renommer `junit.jar`**. Il sera placé dans les `lib/` indiqués dans chaque niveau. Les fichiers JAR externes et les répertoires `build/` et `dist/` ne sont pas fournis par le dépôt : Ant produit ces derniers.

## 2. Niveau 1 — java-ant-junit

Une application avec deux classes applicatives et une classe de test dans `src/`, sans déclaration de package.

```text
java-ant-junit/
├── build.xml
├── lib/junit.jar
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

Créer `lib/` et `src/`, puis copier JUnit dans `lib/junit.jar`.

### `java-ant-junit/build.xml`

```xml
<project name="java-ant-junit" default="all" basedir=".">
    <property name="src.dir" location="src"/>
    <property name="build.dir" location="build"/>
    <property name="classes.dir" location="${build.dir}/classes"/>
    <property name="tests.dir" location="${build.dir}/tests"/>
    <property name="dist.dir" location="dist"/>
    <property name="junit.jar" location="lib/junit.jar"/>

    <target name="check-junit">
        <available file="${junit.jar}" property="junit.available"/>
        <fail unless="junit.available" message="Place JUnit 3.8.2 dans lib/junit.jar"/>
    </target>

    <target name="compile">
        <mkdir dir="${classes.dir}"/>
        <javac srcdir="${src.dir}" destdir="${classes.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <include name="Main.java"/>
            <include name="Message.java"/>
        </javac>
    </target>

    <target name="compile-test" depends="compile,check-junit">
        <mkdir dir="${tests.dir}"/>
        <javac srcdir="${src.dir}" destdir="${tests.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <include name="MessageTest.java"/>
            <classpath>
                <pathelement location="${classes.dir}"/>
                <pathelement location="${junit.jar}"/>
            </classpath>
        </javac>
    </target>

    <target name="test" depends="compile-test">
        <java classname="junit.textui.TestRunner" fork="true" failonerror="true">
            <arg value="MessageTest"/>
            <classpath>
                <pathelement location="${classes.dir}"/>
                <pathelement location="${tests.dir}"/>
                <pathelement location="${junit.jar}"/>
            </classpath>
        </java>
    </target>

    <target name="jar" depends="compile">
        <mkdir dir="${dist.dir}"/>
        <jar destfile="${dist.dir}/app.jar" basedir="${classes.dir}">
            <manifest>
                <attribute name="Main-Class" value="Main"/>
            </manifest>
        </jar>
        <checksum file="${dist.dir}/app.jar" algorithm="MD5" fileext=".MD5" forceOverwrite="true"/>
        <zip destfile="${dist.dir}/app-install.zip">
            <fileset dir="${dist.dir}">
                <include name="app.jar"/>
                <include name="app.jar.MD5"/>
            </fileset>
        </zip>
    </target>

    <target name="all" depends="test,jar"/>

    <target name="clean">
        <delete dir="${build.dir}"/>
        <delete dir="${dist.dir}"/>
    </target>
</project>
```

### `java-ant-junit/src/Main.java`

```java
public class Main {
    public static void main(String[] args) {
        Message message = new Message();
        System.out.println(message.calculate());
    }
}
```

### `java-ant-junit/src/Message.java`

```java
public class Message {
    public int calculate() {
        return 1 + 2;
    }
}
```

### `java-ant-junit/src/MessageTest.java`

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

### Compilation et exécution (CMD)

Se placer dans `java-ant-junit` et lancer :

```bat
ant clean
ant compile
ant test
ant jar
java -jar dist\app.jar
```

Le test doit afficher `00000000001` et vérifier `3`. L'application affiche `3`. `ant` seul effectue test puis livraison. Le `Main-Class` du manifeste est `Main`.

## 3. Niveau 2 — java-ant-junit-packages

On sépare le code applicatif des tests. Le package `com.example.starter` correspond aux dossiers `com/example/starter`.

```text
java-ant-junit-packages/
├── build.xml
├── lib/junit.jar
├── src/com/example/starter/
│   ├── Main.java
│   └── protocol/Message.java
├── test/com/example/starter/protocol/
│   └── MessageTest.java
├── build/{classes,tests}/
└── dist/{app.jar,app.jar.MD5,app-install.zip}
```

Créer les dossiers, placer `junit.jar` dans `lib/` et recopier intégralement les fichiers suivants.

### `java-ant-junit-packages/build.xml`

```xml
<project name="java-ant-junit-packages" default="all" basedir=".">
    <property name="src.dir" location="src"/>
    <property name="test.dir" location="test"/>
    <property name="build.dir" location="build"/>
    <property name="classes.dir" location="${build.dir}/classes"/>
    <property name="tests.dir" location="${build.dir}/tests"/>
    <property name="dist.dir" location="dist"/>
    <property name="junit.jar" location="lib/junit.jar"/>

    <target name="check-junit">
        <available file="${junit.jar}" property="junit.available"/>
        <fail unless="junit.available" message="Place JUnit 3.8.2 dans lib/junit.jar"/>
    </target>

    <target name="compile">
        <mkdir dir="${classes.dir}"/>
        <javac srcdir="${src.dir}" destdir="${classes.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false"/>
    </target>

    <target name="compile-test" depends="compile,check-junit">
        <mkdir dir="${tests.dir}"/>
        <javac srcdir="${test.dir}" destdir="${tests.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath>
                <pathelement location="${classes.dir}"/>
                <pathelement location="${junit.jar}"/>
            </classpath>
        </javac>
    </target>

    <target name="test" depends="compile-test">
        <java classname="junit.textui.TestRunner" fork="true" failonerror="true">
            <arg value="com.example.starter.protocol.MessageTest"/>
            <classpath>
                <pathelement location="${classes.dir}"/>
                <pathelement location="${tests.dir}"/>
                <pathelement location="${junit.jar}"/>
            </classpath>
        </java>
    </target>

    <target name="jar" depends="compile">
        <mkdir dir="${dist.dir}"/>
        <jar destfile="${dist.dir}/app.jar" basedir="${classes.dir}">
            <manifest>
                <attribute name="Main-Class" value="com.example.starter.Main"/>
            </manifest>
        </jar>
        <checksum file="${dist.dir}/app.jar" algorithm="MD5" fileext=".MD5" forceOverwrite="true"/>
        <zip destfile="${dist.dir}/app-install.zip">
            <fileset dir="${dist.dir}">
                <include name="app.jar"/>
                <include name="app.jar.MD5"/>
            </fileset>
        </zip>
    </target>

    <target name="all" depends="test,jar"/>

    <target name="clean">
        <delete dir="${build.dir}"/>
        <delete dir="${dist.dir}"/>
    </target>
</project>
```

### `java-ant-junit-packages/src/com/example/starter/Main.java`

```java
package com.example.starter;

import com.example.starter.protocol.Message;

public class Main {
    public static void main(String[] args) {
        Message message = new Message();
        System.out.println(message.calculate());
    }
}
```

### `java-ant-junit-packages/src/com/example/starter/protocol/Message.java`

```java
package com.example.starter.protocol;

public class Message {
    public int calculate() {
        return 1 + 2;
    }
}
```

### `java-ant-junit-packages/test/com/example/starter/protocol/MessageTest.java`

```java
package com.example.starter.protocol;

import junit.framework.TestCase;

public class MessageTest extends TestCase {
    public void testCalculate() {
        Message message = new Message();
        System.out.println("00000000001");
        assertEquals(3, message.calculate());
    }
}
```

### Compilation et exécution

```bat
ant clean
ant test
ant jar
java -jar dist\app.jar
```

Le manifeste utilise maintenant `Main-Class: com.example.starter.Main`. `MessageTest` utilise `com.example.starter.protocol`. Le JAR exécutable n'inclut pas JUnit.

## 4. Niveau 3 — java-ant-junit-libraries

Trois modules avec un `build.xml` **dans chacun**, plus un `build.xml` racine pour les construire dans le bon ordre.

```text
java-ant-junit-libraries/
├── build.xml
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

Le JAR **JUnit 3.8.2** doit être présent physiquement dans chacun des répertoires `message1/lib/`, `message2/lib/` et `message3/lib/`. Les JAR `message1.jar` et `message2.jar` sont copiés automatiquement par Ant après la compilation des modules précédents.

| Module | Dépendances applicatives | Résultat du test |
|---|---|---|
| message1 | aucune | 1 + 2 = 3 |
| message2 | message1.jar | 3 + 3 = 6 |
| message3 | message1.jar et message2.jar | 6 + 4 = 10 |

### Build racine

### `java-ant-junit-libraries/build.xml`

```xml
<project name="java-ant-junit-libraries" default="all" basedir=".">
    <target name="jar">
        <ant dir="message1" target="jar" inheritAll="false"/>
        <ant dir="message2" target="jar" inheritAll="false"/>
        <ant dir="message3" target="jar" inheritAll="false"/>
    </target>
    <target name="compile" depends="jar"/>
    <target name="test" depends="jar">
        <ant dir="message1" target="test" inheritAll="false"/>
        <ant dir="message2" target="test" inheritAll="false"/>
        <ant dir="message3" target="test" inheritAll="false"/>
    </target>
    <target name="test-message1">
        <ant dir="message1" target="test" inheritAll="false"/>
    </target>
    <target name="test-message2" depends="build-message1">
        <ant dir="message2" target="test" inheritAll="false"/>
    </target>
    <target name="test-message3" depends="build-message2">
        <ant dir="message3" target="test" inheritAll="false"/>
    </target>
    <target name="build-message1">
        <ant dir="message1" target="jar" inheritAll="false"/>
    </target>
    <target name="build-message2" depends="build-message1">
        <ant dir="message2" target="jar" inheritAll="false"/>
    </target>
    <target name="all">
        <antcall target="jar"/>
        <antcall target="test"/>
    </target>
    <target name="clean">
        <ant dir="message3" target="clean" inheritAll="false"/>
        <ant dir="message2" target="clean" inheritAll="false"/>
        <ant dir="message1" target="clean" inheritAll="false"/>
    </target>
</project>
```

### Module message1 — fichiers complets

### `java-ant-junit-libraries/message1/build.xml`

```xml
<project name="message1" default="all" basedir=".">
    <property name="src.dir" location="src"/>
    <property name="test.dir" location="test"/>
    <property name="classes.dir" location="build/classes"/>
    <property name="tests.dir" location="build/tests"/>
    <property name="dist.dir" location="dist"/>
    <path id="runtime.path">
        <fileset dir="lib" includes="*.jar" excludes="junit.jar"/>
    </path>
    <path id="test.path">
        <path refid="runtime.path"/>
        <pathelement location="${classes.dir}"/>
        <pathelement location="${tests.dir}"/>
        <pathelement location="lib/junit.jar"/>
    </path>
    <target name="dependencies">
        <mkdir dir="lib"/>

    </target>

    <target name="compile" depends="dependencies">
        <mkdir dir="${classes.dir}"/>
        <javac srcdir="${src.dir}" destdir="${classes.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="runtime.path"/>
        </javac>
    </target>
    <target name="check-junit">
        <available file="lib/junit.jar" property="junit.available"/>
        <fail unless="junit.available" message="Installer JUnit 3.8.2 dans message1/lib/junit.jar"/>
    </target>
    <target name="compile-test" depends="compile,check-junit">
        <mkdir dir="${tests.dir}"/>
        <javac srcdir="${test.dir}" destdir="${tests.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="test.path"/>
        </javac>
    </target>
    <target name="test" depends="compile-test">
        <java classname="junit.textui.TestRunner" fork="true" failonerror="true">
            <arg value="com.example.starter.protocol.Message1Test"/>
            <classpath refid="test.path"/>
        </java>
    </target>
    <target name="jar" depends="compile">
        <mkdir dir="${dist.dir}"/>
        <jar destfile="${dist.dir}/message1.jar" basedir="${classes.dir}"/>
        <checksum file="${dist.dir}/message1.jar" algorithm="MD5" fileext=".MD5" forceOverwrite="true"/>
        <zip destfile="${dist.dir}/message1-install.zip">
            <fileset dir="${dist.dir}">
                <include name="message1.jar"/>
                <include name="message1.jar.MD5"/>
            </fileset>
            <fileset dir="lib">
                <include name="message*.jar"/>
            </fileset>
        </zip>
    </target>
    <target name="all" depends="test,jar"/>
    <target name="clean">
        <delete dir="build"/>
        <delete dir="dist"/>

    </target>
</project>
```

### `java-ant-junit-libraries/message1/src/com/example/starter/protocol/Message1.java`

```java
package com.example.starter.protocol;

public class Message1 {
    public int calculate() {
        return 1 + 2;
    }
}
```

### `java-ant-junit-libraries/message1/test/com/example/starter/protocol/Message1Test.java`

```java
package com.example.starter.protocol;

import junit.framework.TestCase;

public class Message1Test extends TestCase {
    public void testCalculate() {
        Message1 message = new Message1();
        System.out.println("00000000001");
        assertEquals(3, message.calculate());
    }
}
```

### Module message2 — fichiers complets

### `java-ant-junit-libraries/message2/build.xml`

```xml
<project name="message2" default="all" basedir=".">
    <property name="src.dir" location="src"/>
    <property name="test.dir" location="test"/>
    <property name="classes.dir" location="build/classes"/>
    <property name="tests.dir" location="build/tests"/>
    <property name="dist.dir" location="dist"/>
    <path id="runtime.path">
        <fileset dir="lib" includes="*.jar" excludes="junit.jar"/>
    </path>
    <path id="test.path">
        <path refid="runtime.path"/>
        <pathelement location="${classes.dir}"/>
        <pathelement location="${tests.dir}"/>
        <pathelement location="lib/junit.jar"/>
    </path>
    <target name="dependencies" depends="check-dependencies">
        <mkdir dir="lib"/>
        <copy file="../message1/dist/message1.jar" todir="lib" overwrite="true"/>
    </target>
    <target name="check-dependencies">
        <available file="../message1/dist/message1.jar" property="message1.available"/>
        <fail unless="message1.available" message="Construire message1 depuis la racine avec ant jar"/>
    </target>

    <target name="compile" depends="dependencies">
        <mkdir dir="${classes.dir}"/>
        <javac srcdir="${src.dir}" destdir="${classes.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="runtime.path"/>
        </javac>
    </target>
    <target name="check-junit">
        <available file="lib/junit.jar" property="junit.available"/>
        <fail unless="junit.available" message="Installer JUnit 3.8.2 dans message2/lib/junit.jar"/>
    </target>
    <target name="compile-test" depends="compile,check-junit">
        <mkdir dir="${tests.dir}"/>
        <javac srcdir="${test.dir}" destdir="${tests.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="test.path"/>
        </javac>
    </target>
    <target name="test" depends="compile-test">
        <java classname="junit.textui.TestRunner" fork="true" failonerror="true">
            <arg value="com.example.starter.protocol.Message2Test"/>
            <classpath refid="test.path"/>
        </java>
    </target>
    <target name="jar" depends="compile">
        <mkdir dir="${dist.dir}"/>
        <jar destfile="${dist.dir}/message2.jar" basedir="${classes.dir}"/>
        <checksum file="${dist.dir}/message2.jar" algorithm="MD5" fileext=".MD5" forceOverwrite="true"/>
        <zip destfile="${dist.dir}/message2-install.zip">
            <fileset dir="${dist.dir}">
                <include name="message2.jar"/>
                <include name="message2.jar.MD5"/>
            </fileset>
            <fileset dir="lib">
                <include name="message*.jar"/>
            </fileset>
        </zip>
    </target>
    <target name="all" depends="test,jar"/>
    <target name="clean">
        <delete dir="build"/>
        <delete dir="dist"/>
        <delete file="lib/message1.jar"/>
    </target>
</project>
```

### `java-ant-junit-libraries/message2/src/com/example/starter/protocol/Message2.java`

```java
package com.example.starter.protocol;

public class Message2 {
    public int calculate() {
        return new Message1().calculate() + 3;
    }
}
```

### `java-ant-junit-libraries/message2/test/com/example/starter/protocol/Message2Test.java`

```java
package com.example.starter.protocol;

import junit.framework.TestCase;

public class Message2Test extends TestCase {
    public void testCalculate() {
        Message2 message = new Message2();
        System.out.println("00000000001");
        assertEquals(6, message.calculate());
    }
}
```

### Module message3 — fichiers complets

### `java-ant-junit-libraries/message3/build.xml`

```xml
<project name="message3" default="all" basedir=".">
    <property name="src.dir" location="src"/>
    <property name="test.dir" location="test"/>
    <property name="classes.dir" location="build/classes"/>
    <property name="tests.dir" location="build/tests"/>
    <property name="dist.dir" location="dist"/>
    <path id="runtime.path">
        <fileset dir="lib" includes="*.jar" excludes="junit.jar"/>
    </path>
    <path id="test.path">
        <path refid="runtime.path"/>
        <pathelement location="${classes.dir}"/>
        <pathelement location="${tests.dir}"/>
        <pathelement location="lib/junit.jar"/>
    </path>
    <target name="dependencies" depends="check-dependencies">
        <mkdir dir="lib"/>
        <copy file="../message1/dist/message1.jar" todir="lib" overwrite="true"/>
        <copy file="../message2/dist/message2.jar" todir="lib" overwrite="true"/>
    </target>
    <target name="check-dependencies">
        <available file="../message1/dist/message1.jar" property="message1.available"/>
        <fail unless="message1.available" message="Construire message1 depuis la racine avec ant jar"/>
        <available file="../message2/dist/message2.jar" property="message2.available"/>
        <fail unless="message2.available" message="Construire message2 depuis la racine avec ant jar"/>
    </target>

    <target name="compile" depends="dependencies">
        <mkdir dir="${classes.dir}"/>
        <javac srcdir="${src.dir}" destdir="${classes.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="runtime.path"/>
        </javac>
    </target>
    <target name="check-junit">
        <available file="lib/junit.jar" property="junit.available"/>
        <fail unless="junit.available" message="Installer JUnit 3.8.2 dans message3/lib/junit.jar"/>
    </target>
    <target name="compile-test" depends="compile,check-junit">
        <mkdir dir="${tests.dir}"/>
        <javac srcdir="${test.dir}" destdir="${tests.dir}" source="1.8" target="1.8" encoding="UTF-8" includeantruntime="false">
            <classpath refid="test.path"/>
        </javac>
    </target>
    <target name="test" depends="compile-test">
        <java classname="junit.textui.TestRunner" fork="true" failonerror="true">
            <arg value="com.example.starter.protocol.Message3Test"/>
            <classpath refid="test.path"/>
        </java>
    </target>
    <target name="jar" depends="compile">
        <mkdir dir="${dist.dir}"/>
        <jar destfile="${dist.dir}/message3.jar" basedir="${classes.dir}"/>
        <checksum file="${dist.dir}/message3.jar" algorithm="MD5" fileext=".MD5" forceOverwrite="true"/>
        <zip destfile="${dist.dir}/message3-install.zip">
            <fileset dir="${dist.dir}">
                <include name="message3.jar"/>
                <include name="message3.jar.MD5"/>
            </fileset>
            <fileset dir="lib">
                <include name="message*.jar"/>
            </fileset>
        </zip>
    </target>
    <target name="all" depends="test,jar"/>
    <target name="clean">
        <delete dir="build"/>
        <delete dir="dist"/>
        <delete file="lib/message1.jar"/>
        <delete file="lib/message2.jar"/>
    </target>
</project>
```

### `java-ant-junit-libraries/message3/src/com/example/starter/protocol/Message3.java`

```java
package com.example.starter.protocol;

public class Message3 {
    public int calculate() {
        return new Message2().calculate() + 4;
    }
}
```

### `java-ant-junit-libraries/message3/test/com/example/starter/protocol/Message3Test.java`

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

### Construction sous Windows

Depuis la **racine** `java-ant-junit-libraries/` :

```bat
ant clean
ant jar
ant test
```

Ou lancer `ant` pour construire les JAR, puis exécuter les tests.

Tests ciblés :

```bat
ant test-message1
ant test-message2
ant test-message3
```

Pour construire à la main les trois modules, dans l'ordre, depuis la racine :

```bat
ant -f message1\build.xml jar
ant -f message2\build.xml jar
ant -f message3\build.xml jar
```

Attention : chaque `build.xml` utilise `basedir="."`, qui est résolu par Ant depuis l'emplacement du fichier build ; les chemins relatifs des copies dépendent du bon ordre de construction.

Le `dist/` de chaque bibliothèque contient son JAR, son `.MD5` et son `-install.zip`. Le ZIP de message2 inclut aussi `message1.jar`; celui de message3 inclut `message1.jar` et `message2.jar`. Ce sont des bibliothèques **sans méthode main et sans Main-Class** : on les utilise via un classpath ou depuis d'autres applications, pas avec `java -jar message3.jar`.

## 5. Configuration IntelliJ IDEA sous Windows

### SDK et sorties

Dans **File → Project Structure** (`Ctrl + Alt + Shift + S`), choisir **JDK 8**. Dans **Project → Compiler output**, renseigner un chemin, par exemple `D:\demo\mon-projet\out`. Dans **Modules → Paths**, utiliser **Inherit project compile output path**.

Cette configuration supprime notamment :

```text
The output path is not specified for module ...
```

**Pourquoi ?** Le `build.xml` connaît `build/classes`, `build/tests` et `dist`, mais le compilateur natif d'IntelliJ possède sa propre configuration : il ne reprend pas automatiquement la destination Ant.

### Sources et tests

Dans **Modules → Sources** :

- Niveau 1 : `src/` en **Sources Root**. Comme `MessageTest.java` se trouve aussi dans `src/`, JUnit doit être accessible au scope **Compile** pour le compilateur IntelliJ.
- Niveau 2 : `src/` en **Sources Root**, `test/` en **Test Sources Root** ; JUnit au scope **Test**.
- Niveau 3 : créer/importer trois modules `message1`, `message2`, `message3`. Dans chacun, marquer `src/` **Sources Root** et `test/` **Test Sources Root**.

### Ajouter les bibliothèques dans IntelliJ

**File → Project Structure → Modules → Dependencies → + → JARs or Directories**.

| Module | JAR à déclarer | Scope |
|---|---|---|
| java-ant-junit (niveau 1) | `lib/junit.jar` | Compile |
| java-ant-junit-packages (niveau 2) | `lib/junit.jar` | Test |
| message1 | `message1/lib/junit.jar` | Test |
| message2 | `message2/lib/junit.jar` | Test |
| message2 | `message2/lib/message1.jar` | Compile |
| message3 | `message3/lib/junit.jar` | Test |
| message3 | `message3/lib/message1.jar` | Compile |
| message3 | `message3/lib/message2.jar` | Compile |

Pour le niveau 3, **exécuter `ant jar` avant de configurer les dépendances internes** afin de disposer physiquement des JAR dans les dossiers `lib/`.

**Ant :** placer les JAR au bon endroit fonctionne parce que leur utilisation est déclarée dans les classpaths des `build.xml`.

**IntelliJ :** placer les JAR sur le disque ne suffit pas : il faut les déclarer dans **Modules → Dependencies** pour que l'IDE reconnaisse `TestCase`, `assertEquals` et les classes des bibliothèques précédentes.

### Icône Run devant les tests

Vérifier que les tests héritent de `junit.framework.TestCase`, que la méthode ressemble à `public void testCalculate()`, que JUnit est déclaré avec le bon scope et que `test/` est marqué comme racine de tests lorsqu'il est séparé. Ensuite, clic sur le triangle vert devant la classe ou la méthode.

## 6. Vérifications et erreurs courantes

| Problème | Contrôle à effectuer |
|---|---|
| `ant` inconnu | Vérifier `ANT_HOME`, `Path` et redémarrer CMD |
| `javac` inconnu | Installer un **JDK** et vérifier `JAVA_HOME` |
| `TestCase` en rouge dans IntelliJ | Ajouter `junit.jar` dans **Modules → Dependencies** |
| Pas d'icône Run pour un test | Vérifier la dépendance JUnit, le dossier de test et la signature de la méthode |
| `Message1` non résolu dans message2 | Construire message1 et vérifier `message2/lib/message1.jar` |
| `Message2` non résolu dans message3 | Construire message2 et vérifier `message3/lib/message2.jar` |
| `The output path is not specified` | Configurer **Project → Compiler output** et **Modules → Paths** |
| Le JAR attendu manque | Lancer `ant jar` depuis le répertoire approprié |

Vérification MD5 d'un livrable depuis CMD :

```bat
certutil -hashfile message3\dist\message3.jar MD5
type message3\dist\message3.jar.MD5
```

Comparer les valeurs hexadécimales. Le MD5 sert ici à détecter une modification accidentelle, **pas** à garantir l'authenticité cryptographique du fichier.

## Références des trois projets

- [Niveau 1 — java-ant-junit](java-ant-junit/README.md)
- [Niveau 2 — java-ant-junit-packages](java-ant-junit-packages/README.md)
- [Niveau 3 — java-ant-junit-libraries](java-ant-junit-libraries/README.md)
