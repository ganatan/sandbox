# Comprendre la conception d'une application d'IA

**Toi :** Si je voulais créer un véritable service basé sur l'IA, qu'est-ce que je devrais comprendre ?

**Moi :** D'abord, l'IA n'est qu'une composante d'un système. Une application sérieuse a aussi besoin de données, de règles métier, d'interfaces, de sécurité et d'évaluation. Restons sur les principes, sans programmation.

## Commencer par le problème, pas par le modèle

Imaginons un assistant qui répond à des questions sur une collection de films. Quel est le besoin ? Retrouver une date ? Comparer des œuvres ? Expliquer un contexte historique ? Une recherche traditionnelle peut suffire pour une date exacte. Une génération de texte peut être utile pour une synthèse, à condition de la vérifier.

**Toi :** L'IA ne doit donc pas tout faire ?

**Moi :** Exactement. Une bonne architecture confie les tâches déterministes à des mécanismes déterministes et réserve le modèle aux tâches où il apporte réellement une valeur.

## Les composants conceptuels

Une interface recueille la demande. Une couche applicative définit les permissions et l'objectif. Des sources de données fournissent les faits. Une recherche documentaire peut sélectionner des passages. Le modèle interprète et génère. Une couche de contrôle vérifie les sorties importantes et conserve, si nécessaire, une traçabilité.

## Choisir entre plusieurs stratégies

Un modèle déjà disponible convient à de nombreux usages généraux. Le RAG aide à exploiter une documentation changeante. Le fine-tuning peut aider à adapter un comportement récurrent. Des agents peuvent effectuer des actions, mais doivent avoir des permissions limitées et des points d'approbation pour les opérations sensibles.

## Mesurer la qualité

**Toi :** Comment savoir si mon assistant est bon ?

**Moi :** En le confrontant à un jeu de questions représentatif. On observe la justesse, la pertinence, la cohérence, la robustesse, les refus appropriés, la latence et le coût. On examine les erreurs, notamment celles qui semblent convaincantes.

Une démonstration réussie n'est pas une évaluation suffisante.

## Responsabilité et protection

Il faut protéger les données personnelles, respecter les droits d'accès, limiter la transmission d'informations confidentielles et définir qui est responsable des décisions. Les modèles et les fournisseurs évoluent ; une architecture doit anticiper ces changements.

## Notre conclusion

**Toi :** Qu'est-ce que je dois retenir de tout ce parcours ?

**Moi :** L'IA transforme des données en représentations et en décisions ou contenus grâce à des modèles entraînés. Les Transformers et les LLM sont des réalisations majeures de cette idée, pas une intelligence magique. La vraie compétence consiste à savoir ce qu'un système peut faire, ce qu'il ne sait pas garantir et comment le vérifier.

## À retenir

Définir un problème. Choisir l'approche adaptée. Fournir des données fiables. Mesurer les résultats. Prévoir la vérification humaine. Une IA utile est celle dont les capacités et les limites sont comprises.

**Pour continuer à apprendre :** reprendre chacun de ces douze chapitres et se demander, à chaque étape, quels exemples et quelles preuves permettraient de tester ce qui est avancé.
