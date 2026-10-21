# Trouver des films similaires : 1-NN puis KNN

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Chercher les maisons les plus proches sur une carte : chaque film est un point, et ses voisins sont les films les plus proches selon la distance choisie.

## 2. Exemple cinéma

On cherche le vecteur le plus proche d'un film cible parmi trois films fictifs.

## 3. Ce que tu apprends vraiment

Ici, k=1 : c'est 1-NN. Pour k=3, il faudrait trier les distances et voter pour une classification étiquetée.

## Mode d'emploi : expérience hors ligne

Créer un dossier vide, y enregistrer le code ci-dessous dans **Main.java**, puis exécuter :

```bash
javac Main.java
java Main
```

Le JDK 8 suffit : ni Maven, ni Ant, ni JAR externe, ni connexion Internet. Les données sont fictives. **Ne pas transférer d'informations confidentielles de la mission.**

## 4. Code Java 8 complet

```java
public class Main {
    static double distance(double[] a, double[] b) {
        double somme = 0;
        for (int i = 0; i < a.length; i++) {
            double d = a[i] - b[i];
            somme += d * d;
        }
        return Math.sqrt(somme);
    }
    public static void main(String[] args) {
        String[] noms = {"Film A", "Film B", "Film C"};
        double[][] films = {{0.5, 0.8}, {0.75, 0.9}, {0.4, 0.3}};
        double[] cible = {0.7, 0.85};
        int index = -1;
        double minimum = Double.POSITIVE_INFINITY;
        for (int i = 0; i < films.length; i++) {
            double d = distance(films[i], cible);
            if (d < minimum) {
                minimum = d;
                index = i;
            }
        }
        System.out.println(noms[index]);
    }
}
```

## 5. Résultat attendu

```text
Film B
```

## 6. Exercices pour bien comprendre

Afficher chaque distance et ensuite implémenter k=3 avec trois étiquettes fictives.

## 7. Réutilisation future sur BoxyMovies

Faire une page « films similaires » à partir de genres, durée et année.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
