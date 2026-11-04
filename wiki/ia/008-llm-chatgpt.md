# LLM : comment fonctionne un assistant comme ChatGPT

**Toi :** Quand je pose une question à ChatGPT, que se passe-t-il ?

**Moi :** Ton texte est d'abord converti en unités appelées tokens. Le modèle calcule ensuite une distribution de probabilités sur les tokens possibles pour la suite. Un mécanisme de génération choisit un token, puis recommence avec le contexte mis à jour.

## Pourquoi la réponse a-t-elle du sens ?

Parce que l'entraînement sur de grandes quantités de données permet d'apprendre des régularités grammaticales, sémantiques et conceptuelles très élaborées. Un modèle peut ainsi expliquer, reformuler ou parfois résoudre un problème inédit.

**Toi :** Tu récupères donc une phrase existante dans un énorme catalogue ?

**Moi :** Généralement non. La réponse est produite pendant la génération. Le modèle n'est pas un moteur de recherche qui retrouverait systématiquement un passage intact. Il peut néanmoins mémoriser certaines séquences ou reproduire des erreurs.

## Les grandes étapes de préparation

Le **préentraînement** apprend des régularités générales à partir de données. Un **post-entraînement** peut ensuite orienter le système vers les instructions, la conversation, la sûreté et les préférences humaines, par différentes méthodes de supervision ou d'optimisation.

## Le contexte d'une conversation

Le modèle traite une quantité limitée d'informations dans sa **fenêtre de contexte** : message, historique pertinent, consignes et éventuellement documents fournis.

**Toi :** Une conversation longue devient-elle un apprentissage définitif ?

**Moi :** Pas automatiquement. Utiliser un contexte pendant une réponse est distinct de modifier les poids du modèle. Une mémoire externe ou un autre mécanisme du produit peut éventuellement réintroduire des informations ultérieurement.

## Les outils ne sont pas le modèle

Un assistant peut parfois appeler des outils : recherche web, calcul, exécution ou consultation de fichiers, selon les capacités disponibles. La réponse finale peut donc combiner génération et informations obtenues par ces outils.

## À retenir

Un LLM génère une séquence de tokens conditionnée par son contexte. Sa fluidité vient de l'entraînement et de son architecture ; elle ne garantit pas la vérité. L'accès à des sources externes dépend des outils réellement disponibles.

**Question suivante :** que représentent exactement les tokens et les embeddings ?
