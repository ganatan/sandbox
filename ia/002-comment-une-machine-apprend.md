# Comment une machine apprend

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Comme un enfant qui apprend avec des exemples, un programme peut chercher un seuil adapté. C'est de l'apprentissage supervisé : les exemples donnent des entrées et les bonnes réponses.

## 2. Exemple cinéma

Un spectateur aime les films notés 7, 8 et 9, mais pas ceux notés 2, 4 et 5.

## 3. Ce que tu apprends vraiment

Le programme cherche un seuil qui maximise le nombre de bonnes réponses sur six exemples. Ce score d'entraînement ne mesure pas encore la généralisation.

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
        double[] notes = {2, 4, 5, 7, 8, 9};
        int[] aime = {0, 0, 0, 1, 1, 1};
        double meilleur = 0;
        int scoreMax = -1;
        for (double seuil = 0; seuil <= 10; seuil += 0.5) {
            int score = 0;
            for (int i = 0; i < notes.length; i++) {
                int prediction = notes[i] >= seuil ? 1 : 0;
                if (prediction == aime[i]) score++;
            }
            if (score > scoreMax) {
                scoreMax = score;
                meilleur = seuil;
            }
        }
        System.out.println("Seuil : " + meilleur);
        System.out.println("Bonnes réponses : " + scoreMax);
    }
}
```

## 5. Résultat attendu

```text
Seuil : 5.5
Bonnes réponses : 6
```

## 6. Exercices pour bien comprendre

Changer les exemples, puis réserver des exemples jamais utilisés à l'entraînement.

## 7. Réutilisation future sur BoxyMovies

Apprendre un seuil de pertinence, sans confondre note du film et préférence individuelle.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
