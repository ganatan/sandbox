# Prédire oui ou non : classification

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Un arbitre dit dans quelle équipe appartient chaque joueur. Un classificateur attribue une catégorie, par exemple oui ou non.

## 2. Exemple cinéma

Une note est transformée en label « recommandé » avec un seuil appris sur des exemples.

## 3. Ce que tu apprends vraiment

Il faut distinguer une règle fixée par le programmeur d'un seuil appris. Les erreurs se décomposent en faux positifs et faux négatifs.

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
    static int classe(double note, double seuil) {
        return note >= seuil ? 1 : 0;
    }
    public static void main(String[] args) {
        double[] notes = {2, 4, 8, 9};
        int[] attendu = {0, 0, 1, 1};
        int corrects = 0;
        for (int i = 0; i < notes.length; i++) {
            int obtenu = classe(notes[i], 6);
            if (obtenu == attendu[i]) corrects++;
            System.out.println(notes[i] + " -> " + obtenu);
        }
        System.out.println("Corrects : " + corrects + "/4");
    }
}
```

## 5. Résultat attendu

```text
2.0 -> 0
4.0 -> 0
8.0 -> 1
9.0 -> 1
Corrects : 4/4
```

## 6. Exercices pour bien comprendre

Créer un faux positif en modifiant les labels et calculer précision et rappel.

## 7. Réutilisation future sur BoxyMovies

Classer des films selon un objectif éditorial explicite.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
