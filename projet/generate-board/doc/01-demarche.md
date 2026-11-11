# 01 — Notre démarche

## Pourquoi ?

Un environnement informatique utilise des logiciels Open Source sur les postes, dans les applications et dans l'infrastructure.

Notre mission est de répondre à six questions simples :

1. Quel composant est utilisé ?
2. Quelle est sa version ?
3. Quelle licence s'applique à cette version ?
4. D'où vient l'information ?
5. Dans quel contexte le composant est-il utilisé ou distribué ?
6. Que reste-t-il à vérifier ?

## Notre choix

- **Maintenant :** découverte manuelle, dépôt par dépôt, et saisie dans `code/data.json`.
- **Rapports :** OpenCode lit le JSON et les modèles Markdown ; il produit le rapport et le glossaire.
- **Langues :** anglais original, traductions françaises suffixées `-fr`.
- **Archives :** `REV001`, `REV002`, `REV003`… Chaque livraison contient cinq fichiers.
- **Plus tard :** programmes ou API pour remplir le même JSON automatiquement.

Pas de base de données ni de programme de génération pour cette première phase.

## Trois périmètres distincts

| Périmètre | Exemples | Comment l'observer |
|---|---|---|
| Poste de travail | Fedora, Git, Podman, Distrobox | Commandes système |
| Applications et dépendances | Angular, OpenJDK, React, Rust | Dépôts et manifestes |
| Infrastructure | Kafka, Redis, Kubernetes, Grafana | Helm et configurations, puis environnement si autorisé |

Des postes supposés identiques ne sont pas automatiquement des postes **vérifiés** identiques. Tester d'abord un poste représentatif.

## Étapes

1. Identifier les dépôts pertinents.
2. Étudier un dépôt et ses manifestes.
3. Relever les logiciels, versions et licences.
4. Noter la source et les incertitudes.
5. Compléter `code/data.json`.
6. Préparer une nouvelle révision.
7. Générer avec OpenCode.
8. Contrôler les chiffres et les licences avant diffusion.

## Ce que le rapport ne prouve pas

Le rapport ne certifie ni conformité juridique ni certification ISO. Il est fondé sur les informations disponibles et leur niveau de vérification. Le terme SBOM dans le nom ne signifie pas qu'un fichier SPDX normalisé a été produit.

SPDX / ISO/IEC 5962 encadre un format d'échange ; OpenChain / ISO/IEC 5230 porte sur les processus de conformité ; ISO 9001 et ISO 10013 inspirent la maîtrise documentaire, sans imposer notre numérotation.

## Règles de confidentialité

Ne pas copier de code, noms de dépôts, URLs internes, secrets ou configuration professionnelle dans le dépôt public d'exercice. Avant d'utiliser OpenCode sur un dépôt réel, vérifier que le modèle IA, son hébergement et les transferts de données sont autorisés.
