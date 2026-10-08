# Création d'un starter Java 8

## Création du projet

Dans IntelliJ IDEA : `New Project` → `Java`.

- **Name** : `java-starter`
- **Location** : `D:\demo`
- **Build system** : `IntelliJ`
- **JDK** : `1.8` (Java 8)
- **Add sample code** : coché

Cliquer sur `Create`.

## Main.java

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java 8");
    }
}
```

## Attention

**Toujours vérifier que le JDK sélectionné est Java 8 (`1.8`).** Sinon, le code d'exemple généré peut employer une syntaxe incompatible avec Java 8.

Ne pas sélectionner Maven ou Gradle.

Utiliser la déclaration classique `public static void main(String[] args)`, compatible Java 8.
