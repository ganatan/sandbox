# Propagation des exceptions Java 8

## Principe

Une exception déclenchée avec `throw` peut être propagée entre plusieurs méthodes jusqu'à un `catch`.

- `throw` : déclenche une exception.
- `throws` : déclare une exception pouvant être propagée.
- `catch` : intercepte l'exception et permet de gérer l'affichage.

## Main.java

```java
public class Main {

    public static void main(String[] args) {
        try {
            afficherFilm("Inception");
        } catch (Exception e) {
            System.out.println("Impossible d'afficher le film : " + e.getMessage());
        }
    }

    public static void afficherFilm(String titre) throws Exception {
        String film = rechercherFilm(titre);
        System.out.println("Film : " + film);
    }

    public static String rechercherFilm(String titre) throws Exception {
        if (titre.equals("Inception")) {
            throw new Exception("Film introuvable dans le catalogue");
        }

        return titre;
    }
}
```

## Résultat

```text
Impossible d'afficher le film : Film introuvable dans le catalogue
```

## Propagation

```text
rechercherFilm()
    |
    | throw new Exception(...)
    v
afficherFilm()
    |
    | throws Exception
    v
main()
    |
    | catch (Exception e)
    v
Message explicite
```

## Compilation

```bash
javac Main.java
```

## Exécution

```bash
java Main
```

## Commandes essentielles

```java
throw new Exception("Film introuvable");
```

Déclenche une exception.

```java
public static void afficherFilm() throws Exception
```

Déclare que la méthode peut transmettre une exception à son appelant.

```java
catch (Exception e) {
    System.out.println(e.getMessage());
}
```

Intercepte l'exception et récupère son message.

## À retenir

- Une exception peut traverser plusieurs méthodes.
- Elle interrompt l'exécution normale jusqu'à un gestionnaire `catch`.
- Elle n'a pas besoin d'être interceptée dans chaque méthode.
- Le `catch` final permet de présenter un message adapté.
- Les détails techniques peuvent être conservés dans les logs.

Pour une exception *checked* comme `Exception`, il faut utiliser `throws` ou gérer l'exception avec `catch`.

Pour une exception *unchecked* comme `IllegalArgumentException`, `throws` n'est pas obligatoire.
