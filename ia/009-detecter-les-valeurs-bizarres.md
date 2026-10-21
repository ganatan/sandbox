# Détecter les valeurs bizarres : anomalies

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Dans une classe où tous les élèves mesurent environ la même taille, une valeur gigantesque attire l'attention. Ce n'est pas forcément une erreur, seulement une anomalie.

## 2. Exemple cinéma

Cinq budgets fictifs sont proches de 20 ; un budget de 900 est très éloigné.

## 3. Ce que tu apprends vraiment

Pour éviter qu'une anomalie déforme trop la moyenne, on utilise ici la médiane et un écart absolu simple.

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
    public static void main(String[] args) {
        double[] budgets = {20, 25, 27, 28, 30, 900};
        double[] tries = budgets.clone();
        Arrays.sort(tries);
        double mediane = (tries[2] + tries[3]) / 2.0;
        for (double budget : budgets) {
            if (Math.abs(budget - mediane) > 100) {
                System.out.println("À vérifier : " + budget);
            }
        }
    }
}
```

## 5. Résultat attendu

```text
À vérifier : 900.0
```

## 6. Exercices pour bien comprendre

Changer le seuil et voir les faux positifs. Chercher ensuite l'écart interquartile.

## 7. Réutilisation future sur BoxyMovies

Repérer des budgets ou recettes inhabituels pour vérification humaine.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
