# Représenter un film avec des nombres

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Une fiche de film est un portrait. Pour que la machine calcule, on convertit ce portrait en vecteur, une liste ordonnée de nombres.

## 2. Exemple cinéma

Science-fiction, horreur et comédie deviennent trois colonnes : 1 si le genre s'applique, 0 sinon.

## 3. Ce que tu apprends vraiment

L'ordre des colonnes doit rester identique ; durée et année peuvent être normalisées séparément. Ce codage est dit multi-hot.

## Mode d'emploi : expérience hors ligne

Créer un dossier vide, y enregistrer le code ci-dessous dans **Main.java**, puis exécuter :

```bash
javac Main.java
java Main
```

Le JDK 8 suffit : ni Maven, ni Ant, ni JAR externe, ni connexion Internet. Les données sont fictives. **Ne pas transférer d'informations confidentielles de la mission.**

## 4. Code Java 8 complet

```java
import java.util.Arrays;
public class Main {
    static double[] film(boolean sf, boolean horreur, boolean comedie) {
        return new double[]{sf ? 1 : 0, horreur ? 1 : 0, comedie ? 1 : 0};
    }
    public static void main(String[] args) {
        double[] alien = film(true, true, false);
        double[] comedie = film(false, false, true);
        System.out.println("Alien : " + Arrays.toString(alien));
        System.out.println("Comédie : " + Arrays.toString(comedie));
    }
}
```

## 5. Résultat attendu

```text
Alien : [1.0, 1.0, 0.0]
Comédie : [0.0, 0.0, 1.0]
```

## 6. Exercices pour bien comprendre

Ajouter un genre action et vérifier que tous les vecteurs ont la même longueur.

## 7. Réutilisation future sur BoxyMovies

Préparer des vecteurs de genres destinés à la recherche de films similaires.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
