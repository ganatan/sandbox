# Transformers et mécanisme d'attention

**Toi :** Pourquoi le mot « Transformer » revient-il partout ?

**Moi :** Parce que cette architecture, publiée en 2017, a profondément influencé les modèles modernes de langage et de nombreux autres systèmes.

## Le problème du contexte

Prenons « Le réalisateur a téléphoné à l'acteur parce qu'il avait une question ». Pour interpréter « il », il faut tenir compte de plusieurs éléments. Une phrase n'est pas simplement une succession de mots indépendants.

Les anciens modèles séquentiels traitaient souvent les éléments les uns après les autres. Les Transformers ont introduit une manière particulièrement efficace de faire interagir les représentations de différents éléments.

## L'attention

**Toi :** Est-ce que la machine se concentre comme nous ?

**Moi :** C'est une métaphore. L'**attention** calcule des poids qui déterminent dans quelle mesure les représentations de différents éléments contribuent au traitement d'un élément donné.

Pour le dire simplement : chaque élément peut rechercher des informations utiles dans les autres éléments accessibles. Les calculs utilisent des représentations appelées, en anglais, *queries*, *keys* et *values*.

## Pourquoi plusieurs têtes ?

L'**attention multi-têtes** permet de réaliser plusieurs interactions en parallèle, avec des transformations différentes. On ne peut pas supposer que chaque tête correspond à une catégorie linguistique stable et clairement identifiable.

## L'ordre des mots

**Toi :** Si tous les mots se regardent, comment connaître leur ordre ?

**Moi :** Le Transformer utilise des informations de position. Les mécanismes exacts varient selon les modèles.

Dans un modèle génératif autorégressif, un masque causal empêche un élément de consulter directement les éléments futurs pendant la prédiction.

## Le Transformer n'est pas toute l'IA

Il possède aussi d'autres transformations, notamment des couches dites *feed-forward*, ainsi que des mécanismes de normalisation et de connexions résiduelles. Il existe différentes familles : encodeurs, décodeurs et encodeurs-décodeurs.

## À retenir

Le Transformer repose sur des représentations numériques et des mécanismes d'attention qui font interagir les éléments d'une séquence. Il constitue une architecture ; ce n'est ni une base de connaissances infaillible ni une preuve de conscience.

**Question suivante :** comment cette architecture devient-elle un chatbot ?
