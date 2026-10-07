# Installation Java 8

## Installer le JDK

Installer un **JDK Java 8**.

Exemple de répertoire d'installation sous Windows :

```text
C:\Program Files\Java\jdk1.8.0_xxx
```

---

## JAVA_HOME

Créer la variable d'environnement :

```text
JAVA_HOME
```

Valeur :

```text
C:\Program Files\Java\jdk1.8.0_xxx
```

---

## Path

Ajouter dans la variable `Path` :

```text
%JAVA_HOME%\bin
```

---

## Vérification

Ouvrir un nouveau terminal :

```bash
java -version
javac -version
```

Résultat attendu :

```text
java version "1.8.0_xxx"
javac 1.8.0_xxx
```

---

## Variables essentielles

```text
JAVA_HOME=C:\Program Files\Java\jdk1.8.0_xxx
Path=%JAVA_HOME%\bin
```

`java` permet d'exécuter une application Java.

`javac` permet de compiler le code source Java.
