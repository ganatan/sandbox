# Comprendre les neurones artificiels

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Imagine une équipe qui donne des avis : chacun a une importance (un poids). On additionne les avis et on décide. Un neurone artificiel fait ce calcul avec des nombres.

## 2. Exemple cinéma

Deux caractéristiques simples entrent dans un neurone : appréciation de la science-fiction et note.

## 3. Ce que tu apprends vraiment

Un neurone calcule z = w1×x1 + w2×x2 + b. Le perceptron peut ajuster ses poids à partir d'exemples.

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
    static int predire(double x1, double x2, double[] w) {
        return w[0] * x1 + w[1] * x2 + w[2] >= 0 ? 1 : 0;
    }
    public static void main(String[] args) {
        double[][] x = {{0, 0}, {0, 1}, {1, 0}, {1, 1}};
        int[] y = {0, 0, 0, 1};
        double[] w = {0, 0, 0};
        for (int e = 0; e < 10; e++) {
            for (int i = 0; i < x.length; i++) {
                int erreur = y[i] - predire(x[i][0], x[i][1], w);
                w[0] += erreur * x[i][0];
                w[1] += erreur * x[i][1];
                w[2] += erreur;
            }
        }
        for (double[] point : x) {
            System.out.println(predire(point[0], point[1], w));
        }
    }
}
```

## 5. Résultat attendu

```text
0
0
0
1
```

## 6. Exercices pour bien comprendre

Tester la règle OR, puis découvrir pourquoi XOR nécessite plus qu'un perceptron monocouche.

## 7. Réutilisation future sur BoxyMovies

Comprendre les poids avant d'étudier un réseau multicouche.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
