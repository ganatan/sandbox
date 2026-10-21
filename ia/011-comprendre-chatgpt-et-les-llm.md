# Comprendre ChatGPT, tokens et LLM

[Sommaire IA](README.md) · [Introduction niveau 10 ans](001-ia-expliquee-simplement.md)

## 1. L'histoire pour comprendre

Un grand modèle de langage apprend des régularités à partir de nombreux textes. Il traite des morceaux de texte appelés tokens ; il ne mémorise pas simplement un dictionnaire de réponses.

## 2. Exemple cinéma

Pour comprendre une première brique, on compte les mots et on prédit le mot qui suit à partir d'une toute petite phrase.

## 3. Ce que tu apprends vraiment

Ce programme est un modèle statistique rudimentaire, pas un Transformer ni un LLM. Les LLM utilisent embeddings, attention et réseaux de neurones entraînés à grande échelle.

## Mode d'emploi : expérience hors ligne

Créer un dossier vide, y enregistrer le code ci-dessous dans **Main.java**, puis exécuter :

```bash
javac Main.java
java Main
```

Le JDK 8 suffit : ni Maven, ni Ant, ni JAR externe, ni connexion Internet. Les données sont fictives. **Ne pas transférer d'informations confidentielles de la mission.**

## 4. Code Java 8 complet

```java
import java.util.HashMap;
import java.util.Map;
public class Main {
    public static void main(String[] args) {
        String[] mots = "alien dans espace alien dans vaisseau".split(" ");
        Map<String, Integer> suivants = new HashMap<String, Integer>();
        for (int i = 0; i < mots.length - 1; i++) {
            if ("dans".equals(mots[i])) {
                String suivant = mots[i + 1];
                Integer n = suivants.get(suivant);
                suivants.put(suivant, n == null ? 1 : n + 1);
            }
        }
        System.out.println("Après dans : " + suivants);
    }
}
```

## 5. Résultat attendu

```text
Après dans : {espace=1, vaisseau=1}
```

## 6. Exercices pour bien comprendre

Compter les mots après « alien » et comparer les fréquences. Lire ensuite les notions d'embedding et d'attention.

## 7. Réutilisation future sur BoxyMovies

Étudier chez soi la recherche textuelle et les modèles, sans prétendre exécuter un LLM moderne avec Java 8 seul.

## 8. À retenir

Commence par exécuter le programme sans modification. Vérifie chaque résultat à la main, change ensuite une valeur et observe. Un exemple réussi n'est pas une preuve qu'un modèle est performant en production.
