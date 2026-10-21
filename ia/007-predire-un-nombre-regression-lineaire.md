# Prédire un nombre : régression linéaire

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Dessine quelques points sur une feuille et cherche la droite qui les traverse au mieux. La droite sert ensuite à estimer une nouvelle valeur.

## 2. Exemple cinéma

On crée volontairement trois couples fictifs budget-recettes en unités arbitraires.

## 3. Ce que tu apprends vraiment

Une droite est y = ax + b. Avec des données simples, on peut apprendre a et b par les moindres carrés, plutôt que de les choisir.

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
    public static void main(String[] args) {
        double[] budgets = {1, 2, 3};
        double[] recettes = {3, 5, 7};
        double mx = 0, my = 0;
        for (int i = 0; i < budgets.length; i++) {
            mx += budgets[i];
            my += recettes[i];
        }
        mx /= budgets.length;
        my /= recettes.length;
        double numerateur = 0, denominateur = 0;
        for (int i = 0; i < budgets.length; i++) {
            numerateur += (budgets[i] - mx) * (recettes[i] - my);
            denominateur += (budgets[i] - mx) * (budgets[i] - mx);
        }
        double a = numerateur / denominateur;
        double b = my - a * mx;
        System.out.println("a = " + a);
        System.out.println("b = " + b);
        System.out.println("Prédiction pour 4 = " + (a * 4 + b));
    }
}
```

## 5. Résultat attendu

```text
a = 2.0
b = 1.0
Prédiction pour 4 = 9.0
```

## 6. Exercices pour bien comprendre

Ajouter du bruit aux données et comparer la prédiction aux valeurs observées.

## 7. Réutilisation future sur BoxyMovies

Étudier des prévisions exploratoires de box-office, sans supposer que le budget suffit.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
