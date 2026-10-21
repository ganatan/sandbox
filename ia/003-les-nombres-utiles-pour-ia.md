# Les nombres utiles pour l'IA

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Imagine une règle graduée. Les statistiques résument une collection ; les distances mesurent la ressemblance ; les nombres sont les outils de base.

## 2. Exemple cinéma

Comparer les notes de trois films, puis mesurer la distance entre deux paires de caractéristiques normalisées.

## 3. Ce que tu apprends vraiment

Moyenne = somme / nombre ; distance euclidienne = racine de la somme des écarts au carré.

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
    static double moyenne(double[] a) {
        double somme = 0;
        for (double x : a) somme += x;
        return somme / a.length;
    }
    static double distance(double[] a, double[] b) {
        double somme = 0;
        for (int i = 0; i < a.length; i++) {
            double d = a[i] - b[i];
            somme += d * d;
        }
        return Math.sqrt(somme);
    }
    public static void main(String[] args) {
        System.out.println("Moyenne : " + moyenne(new double[]{6, 8, 10}));
        System.out.println("Distance : " + distance(new double[]{0, 0}, new double[]{3, 4}));
    }
}
```

## 5. Résultat attendu

```text
Moyenne : 8.0
Distance : 5.0
```

## 6. Exercices pour bien comprendre

Ajouter variance, min-max et gestion des tableaux vides.

## 7. Réutilisation future sur BoxyMovies

Comparer des films en évitant que les budgets écrasent les notes dans les distances.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
