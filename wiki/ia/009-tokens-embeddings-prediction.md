# Tokens, embeddings et prédiction

**Toi :** Pourquoi ne pas simplement travailler sur des mots ?

**Moi :** Parce que les langues comportent des mots rares, des terminaisons, des chiffres et des caractères très divers. Le **tokeniseur** découpe le texte en unités : parfois un mot, parfois une partie de mot ou un signe.

## Les tokens

Une phrase courte peut correspondre à plusieurs tokens. Le découpage dépend du tokeniseur et de la langue ; il n'existe pas un nombre universel de caractères par token.

Chaque token est associé à un identifiant numérique. Cet identifiant n'exprime pas à lui seul le sens.

## Les embeddings

**Toi :** Comment passer d'un numéro à une idée ?

**Moi :** Le modèle transforme les identifiants en **vecteurs numériques**, appelés embeddings. Pendant le traitement, ces représentations sont enrichies par le contexte et les différentes couches.

Imagine une carte où certaines représentations occupent des régions proches pour des raisons d'usage ou de signification. C'est une image intuitive, pas une carte stable de tous les concepts humains.

## Pourquoi le contexte importe

Le mot « avocat » peut désigner une profession ou un aliment. Sa représentation contextualisée peut différer fortement selon la phrase. Il ne suffit donc pas d'attribuer une définition fixe à chaque mot.

## Prédire le token suivant

Le modèle calcule des scores, puis des probabilités sur les tokens candidats. La stratégie de génération influence le choix : on peut privilégier les sorties les plus probables ou introduire une part de variation.

**Toi :** Si le prochain token est prédit, pourquoi la réponse peut-elle développer un raisonnement ?

**Moi :** Parce que répéter cette opération produit des séquences complexes, qui peuvent contenir des étapes de résolution. Mais une explication générée après coup n'est pas nécessairement une description fiable de tous les mécanismes internes ayant produit la réponse.

## À retenir

Le token est une unité de traitement. L'embedding est une représentation numérique apprise. Le contexte transforme cette représentation. Le modèle prédit des suites probables sans disposer d'un contrôle automatique de vérité.

**Question suivante :** comment adapte-t-on un modèle à une entreprise ou à un besoin précis ?
