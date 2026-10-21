# Faire des groupes avec K-means

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Imagine des billes sur une table : on pose deux centres, chaque bille va vers le plus proche, puis les centres se déplacent au milieu de leur groupe.

## 2. Exemple cinéma

Six films fictifs sont représentés par deux chiffres chacun.

## 3. Ce que tu apprends vraiment

L'algorithme alterne affectation et recalcul des centres ; K est choisi avant d'exécuter l'algorithme. Attention aux groupes vides.

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
    static double distance2(double[] a, double[] b) {
        double x = a[0] - b[0], y = a[1] - b[1];
        return x * x + y * y;
    }
    public static void main(String[] args) {
        double[][] points = {{1, 1}, {1, 2}, {2, 1}, {8, 8}, {8, 9}, {9, 8}};
        double[][] centres = {{1, 1}, {8, 8}};
        int[] groupe = new int[points.length];
        for (int iteration = 0; iteration < 5; iteration++) {
            double[][] sommes = new double[2][2];
            int[] comptes = new int[2];
            for (int i = 0; i < points.length; i++) {
                int g = distance2(points[i], centres[0]) <= distance2(points[i], centres[1]) ? 0 : 1;
                groupe[i] = g;
                sommes[g][0] += points[i][0];
                sommes[g][1] += points[i][1];
                comptes[g]++;
            }
            for (int g = 0; g < 2; g++) {
                if (comptes[g] > 0) {
                    centres[g][0] = sommes[g][0] / comptes[g];
                    centres[g][1] = sommes[g][1] / comptes[g];
                }
            }
        }
        for (int g : groupe) System.out.println("Groupe " + g);
    }
}
```

## 5. Résultat attendu

```text
Groupe 0
Groupe 0
Groupe 0
Groupe 1
Groupe 1
Groupe 1
```

## 6. Exercices pour bien comprendre

Changer les centres initiaux et chercher une situation où un groupe devient vide.

## 7. Réutilisation future sur BoxyMovies

Découvrir des familles statistiques de films sans labels préalables.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
