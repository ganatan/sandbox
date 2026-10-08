# Program Arguments

## Création d'une configuration

Si aucune configuration n'existe :

1. Ouvrir `Run` → `Edit Configurations`.
2. Cliquer sur `Add New Configuration` (`+`).
3. Sélectionner `Application`.
4. Renseigner `Name` : `java-starter`.
5. Sélectionner `Main class` : `Main`.
6. Cliquer sur `Apply` puis `OK`.

## Ajout des arguments

1. Ouvrir `Run` → `Edit Configurations`.
2. Sélectionner `java-starter`.
3. Dans `Program arguments`, saisir :

```text
Interstellar 2026
```

Si le champ n'apparaît pas : `Modify options` → `Program arguments`.

4. Cliquer sur `Apply` puis `OK`.
5. Exécuter avec `Run`.

## Main.java — For each

```java
public class Main {
    public static void main(String[] args) {
        for (String arg : args) {
            System.out.println(arg);
        }
    }
}
```

## Main.java — For classique

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.println("argument:" + args[i]);
        }
    }
}
```

## Résultat — For classique

```text
argument:Interstellar
argument:2026
```

## Principe

Les arguments sont accessibles dans `String[] args` :

- `args[0]` : `Interstellar`
- `args[1]` : `2026`
- `args.length` : `2`

Pour transmettre une valeur contenant des espaces, utiliser des guillemets.
