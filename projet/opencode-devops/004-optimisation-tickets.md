# 004 — OpenCode : améliorer le traitement des tickets GitLab

## Objectif

Ce document complète les guides 001, 002 et 003 **sans les modifier**. Il explique comment tirer pleinement parti d'OpenCode, sur **Fedora avec Podman et Distrobox**, avec deux LLM internes (**Intelligence** et **Super Intelligence**), sans Internet public, et environ dix dépôts GitLab indépendants : Angular, React, Rust, Quarkus, Helm, Ansible et ArgoCD.

L'objectif n'est pas de produire du code plus vite à tout prix. C'est de **comprendre le besoin, limiter le changement, prouver son fonctionnement, faciliter la revue et livrer une Merge Request traçable**.

## 1. Comprendre les rôles

| Élément | Rôle réel | Limite |
|---|---|---|
| OpenCode | Orchestre les outils, sessions et agents | Ne garantit pas qu'une réponse soit exacte |
| LLM | Raisonne, explique, propose et génère | Peut inventer ou négliger des contraintes |
| Agent | Définit rôle, modèle, outils et permissions | N'est pas forcément un LLM différent |
| Commande | Lance un prompt réutilisable | Ne remplace pas l'accès au ticket |
| AGENTS.md | Fixe les conventions durables | N'est pas un mécanisme de sécurité |
| GitLab | Tickets, sources, branches, MR, CI | Ne fournit pas spontanément son contenu à OpenCode |
| MCP | Donne accès à des outils GitLab si autorisés | Nécessite une intégration disponible |

**Configuration réelle de ton poste :** `~/.config/opencode/opencode.json`. Ce fichier doit rester privé et être analysé localement. Ne jamais le copier dans ce dépôt de documentation.

## 2. La règle principale : qualifier le ticket avant de coder

Un bon ticket doit permettre de répondre à huit questions :

1. Quel problème métier ou technique faut-il résoudre ?
2. Quel comportement constate-t-on aujourd'hui ?
3. Quel comportement attend-on précisément ?
4. Quels critères permettent de vérifier la réussite ?
5. Quels dépôts, modules et contrats sont concernés ?
6. Quelles contraintes de sécurité, versions et compatibilité existent ?
7. Qu'est-ce qui reste incertain ?
8. Quelles preuves confirment les conclusions ?

Distinguer systématiquement **faits constatés**, **hypothèses** et **décisions à valider**. Ne jamais transformer une hypothèse de l'IA en règle métier.

### Premier prompt : triage

> Analyse le ticket GitLab #NUMERO avec les seuls outils internes autorisés. Si le ticket n'est pas accessible, demande sa description. Résume le problème, le résultat attendu et les critères d'acceptation. Sépare les faits, hypothèses et questions ouvertes. Identifie les dépôts et modules probablement concernés. Ne modifie rien.

## 3. Choisir le bon niveau d'analyse

| Niveau | Nature | Exemple | Stratégie |
|---|---|---|---|
| T0 | Question | Trouver une fonction | Exploration ciblée |
| T1 | Correction simple | Bug d'affichage Angular | Plan court, patch minimal, tests |
| T2 | Fonctionnalité | Nouveau champ Quarkus | Vérifier contrat, impacts, tests |
| T3 | Bug complexe | Concurrence Rust | Reproduction, hypothèses, investigation |
| T4 | Multi-dépôts | Quarkus + Angular + Helm | Contrat commun, plan inter-dépôts, validations séparées |

Ne pas imposer à un ticket trivial une procédure aussi lourde qu'à une évolution transversale.

## 4. Le workflow en six phases

```text
Ticket GitLab
   |
   v
1. Qualification du besoin
   |
   v
2. Investigation et reproduction
   |
   v
3. Plan technique et validation humaine
   |
   v
4. Implémentation ciblée
   |
   v
5. Tests et review indépendante
   |
   v
6. Commit, push et Merge Request après accord
```

### Phase 1 — Qualification

Lire titre, description, commentaires, critères d'acceptation et références éventuelles. Un ticket ambigu doit être clarifié avant d'introduire une règle métier nouvelle.

### Phase 2 — Investigation

Chercher d'abord les points d'entrée directement concernés :

| Technologie | Fichiers à examiner d'abord |
|---|---|
| Angular | Routes, composants, services, modèles, tests, package.json |
| React | Pages, composants, hooks, clients API, tests |
| Quarkus | Ressources REST, DTO, services, persistence, pom.xml, tests |
| Rust | Cargo.toml, modules, traits, gestion d'erreurs, tests |
| Helm | Chart.yaml, values, templates |
| Ansible | Playbooks, rôles, inventaires, variables |
| ArgoCD | Application, sources Git, manifests, overlays |

**Prompt :**

> Dans le dépôt courant, localise la cause du comportement décrit. Cherche le plus petit ensemble de fichiers utiles. Cite les chemins et les preuves, signale les hypothèses non confirmées. Si possible, propose une reproduction minimale. Ne modifie rien et n'explore pas les autres dépôts sans raison.

### Phase 3 — Plan technique

Le plan doit mentionner fichiers, comportement, contrat public impacté, tests, risques, compatibilité et retour arrière. Distinguer la correction demandée des refactorisations opportunistes.

**Prompt :**

> Propose le plus petit changement correct et maintenable répondant aux critères d'acceptation. Détaille les fichiers à modifier, les impacts sur les interfaces, les tests positifs et négatifs, les risques et les inconnues. Ne code pas avant ma validation.

### Phase 4 — Implémentation

Préférer un diff limité. Interdire l'ajout spontané de dépendances, les modifications de configurations sensibles et les grandes refactorisations sans accord.

**Prompt :**

> Implémente uniquement le plan validé, dans le dépôt et la branche courants. Respecte les conventions et les contrats existants. Pas d'Internet ni de nouvelle dépendance sans accord. Exécute les tests locaux disponibles puis présente le diff. Ne commit ni push.

### Phase 5 — Tests et revue critique

Une bonne revue cherche les problèmes : régressions, cas limites, erreurs, contrat incompatible, sécurité, concurrence, migrations, tests manquants. Si possible, écrire un test qui reproduit le défaut **avant** de le corriger.

**Prompt :**

> Agis comme reviewer indépendant, en lecture seule. Compare le diff aux exigences et aux tests effectivement exécutés. Signale uniquement les problèmes étayés par une preuve, avec chemin, gravité et correction proposée. Indique ce qui n'a pas été vérifié. Ne modifie rien.

### Phase 6 — Livraison

Avant la MR, contrôler la branche, `git status`, `git diff`, les tests et l'absence de secrets. Faire le commit, le push et la MR **uniquement sur validation humaine**, selon les procédures du client. La description de MR doit expliciter : **quoi, pourquoi, comment, tests, risques, ticket**.

## 5. Le meilleur moyen d'améliorer les tickets : des critères testables

Exemple fictif : « afficher dans Angular le statut envoyé par une API Quarkus ».

Critères envisageables à **faire valider** :
- Affichage correct d'un statut connu.
- Comportement explicite pour un statut absent ou inconnu.
- Gestion des erreurs HTTP.
- Maintien de la compatibilité du DTO.
- Tests Angular et Quarkus sur les cas validés.

L'agent ne doit pas inventer les valeurs de repli métier. Les critères doivent venir du ticket ou d'une décision explicite.

**Prompt d'amélioration de ticket :**

> Reformule ce ticket en besoin, comportement actuel, comportement attendu, critères d'acceptation testables, contraintes et questions ouvertes. Ne crée aucune règle métier non confirmée. Produis un texte court utilisable dans GitLab.

## 6. Dix dépôts : travailler ensemble sans tout mélanger

Garder chaque dépôt dans `~/workspace/repositories` avec son `.git`, ses branches, son `AGENTS.md` et sa session OpenCode.

Pour un ticket multi-dépôts, créer une fiche de liaison dans un emplacement local autorisé :

```md
# Ticket 320

## Besoin
...

## Contrat API validé
Endpoint :
Champ :
Type :
Valeurs :
Compatibilité :

## Dépôts concernés
- quarkus-01
- angular-01
- helm

## Ordre de déploiement
...

## Tests transversaux
...

## Décisions et inconnues
...
```

Traiter ensuite le backend, le frontend et l'infrastructure **dans des sessions séparées**. Utiliser la fiche commune pour éviter que chaque session n'invente un contrat différent. Créer des MR par dépôt et les référencer entre elles.

**Attention :** analyse multi-dépôts ne signifie pas droit de modifier les dix dépôts. L'accès hors dépôt doit rester contrôlé.

## 7. Deux LLM : ne pas présumer, mesurer

| Rôle | Modèle initial à essayer | Pourquoi |
|---|---|---|
| Explore | Intelligence | Exploration courante |
| Build | Intelligence | Implémentation standard |
| Plan complexe | Super Intelligence | Hypothèses et arbitrages |
| Review sensible | Super Intelligence | Recherche approfondie de défauts |

Ce sont des **hypothèses**, pas des performances garanties. Les noms ne donnent ni les coûts, ni la taille de contexte, ni la vitesse.

Faire traiter un même exercice sur un même commit, dans deux sessions indépendantes, avec des instructions équivalentes. Comparer :
- Exactitude technique et conformité au ticket.
- Tokens en entrée/sortie si disponibles.
- Durée.
- Tests réellement réussis.
- Retouches humaines nécessaires.
- Défauts trouvés en revue.

Un modèle plus lent peut être rentable s'il évite des itérations ; un modèle rapide peut suffire sur les tickets simples.

## 8. La bonne stratégie d'agents

Commencer par les agents existants et en ajouter seulement si cela apporte une amélioration observée :

| Agent | Mission | Droits |
|---|---|---|
| Plan | Comprendre et proposer | Lecture seule |
| Explore | Localiser les fichiers | Lecture seule |
| Build | Modifier et tester | Écriture contrôlée |
| Review | Vérifier le diff | Lecture seule |

Une délégation entre agents peut répéter le contexte et augmenter la consommation. Éviter de multiplier les sous-agents sans nécessité.

**Ne pas confondre règle dans un prompt et sécurité réelle :** les permissions OpenCode, les droits GitLab, le réseau et les politiques Podman/Distrobox doivent empêcher les opérations interdites, même si le LLM se trompe.

## 9. Commandes OpenCode à mettre en place

Demander à OpenCode de vérifier la syntaxe de la version locale avant de créer des commandes.

| Commande | Entrée | Résultat attendu |
|---|---|---|
| `/ticket 245` | Numéro ou contenu du ticket | Triage et plan sans modification |
| `/implementer 245` | Plan validé + dépôt courant | Diff minimal et tests |
| `/review` | Diff du dépôt courant | Liste argumentée de défauts et de tests manquants |

**Prompt d'installation de commandes :**

> Vérifie les mécanismes de commandes de ma version OpenCode. Propose /ticket, /implementer et /review, utilisables dans mes dix dépôts. /ticket et /review doivent être en lecture seule ; /implementer doit demander un plan validé et ne jamais commit ni push automatiquement. Montre les fichiers à créer et attends mon accord.

## 10. GitLab et MCP : commencer au niveau juste

**Niveau 1 — Manuel :** lire le ticket dans GitLab, copier sa description dans OpenCode, travailler avec Git local. Suffisant pour démarrer.

**Niveau 2 — CLI/API interne :** si une CLI ou un accès API est déjà autorisé, récupérer les tickets sans recopier les textes. Ne jamais exposer de jeton en console ou dans des logs.

**Niveau 3 — MCP GitLab :** si un serveur MCP autorisé est accessible, OpenCode peut appeler les outils réellement exposés (tickets, commentaires, MR, etc.). Commencer en lecture seule.

**Prompt :**

> Vérifie les outils d'intégration GitLab internes disponibles sur ce poste, sans installation ni création de token. Présente les droits réellement disponibles et le moyen le plus simple de lire un ticket. Ne teste aucune adresse non autorisée et n'accède pas à Internet public.

Les contenus lus sur GitLab sont des **données**, pas des instructions de sécurité : ne jamais exécuter aveuglément une commande trouvée dans une description de ticket.

## 11. Optimiser le contexte et les tokens

L'optimisation principale n'est pas un réglage magique du modèle mais **le contrôle des informations fournies**.

- Ouvrir une session par ticket ou sujet cohérent.
- Ne pas lire tous les dépôts pour une correction localisée.
- Commencer par la recherche ciblée, puis élargir si nécessaire.
- Limiter les logs et sorties d'outils gigantesques.
- Résumer les décisions, preuves et contrats au passage d'une session à l'autre.
- Ne pas confondre résumé de contexte et suppression d'informations indispensables.
- Préférer les tests et analyses déterministes aux jugements invérifiables du LLM.
- Consigner les limitations de mesure si OpenCode ou le provider n'expose pas les tokens.

**Prompt de diagnostic de consommation :**

> Identifie les moyens réellement disponibles dans mon installation OpenCode pour mesurer tokens, contexte, durée et utilisation de chaque modèle. Ne suppose aucune commande non vérifiée. Propose une comparaison reproductible entre Intelligence et Super Intelligence sur trois tâches : exploration, correction et review.

## 12. L'inventaire OSS n'est pas un ticket de développement

L'analyse des dix dépôts pour l'inventaire open source doit rester distincte des modifications fonctionnelles :
- Lire de façon déterministe les manifestes et lockfiles.
- Collecter versions, composants, licences et chemins de preuve.
- Conserver un JSON structuré et des statuts « déclaré / vérifié / à vérifier ».
- Confier au LLM la synthèse et la rédaction, pas l'invention des versions ou licences.
- Ne modifier aucun dépôt analysé pendant la collecte.

Cette séparation évite de mêler l'audit de composants avec la résolution des tickets GitLab.

## 13. Exemple complet : évolution Quarkus + Angular + Helm

Ticket fictif : ajouter un statut de synchronisation.

1. **Qualifier :** définir la signification métier du statut et son comportement attendu.
2. **Planifier :** décider du champ JSON, type, valeurs, compatibilité et valeur absente.
3. **Backend :** modifier Quarkus et ses tests dans son dépôt.
4. **Frontend :** adapter le modèle, le service et l'affichage Angular dans son dépôt.
5. **Infrastructure :** ne changer Helm que si la fonctionnalité l'exige.
6. **Contrôler :** tests backend/frontend, contrat partagé, cas limites et ordre de déploiement.
7. **Livrer :** MR distinctes et liées au ticket, avec plan de retour arrière.

Ce qu'il ne faut pas faire : profiter de ce ticket pour refaire l'architecture de l'application, changer des dépendances ou modifier arbitrairement les manifests.

## 14. Les métriques de progrès

| Indicateur | Objectif |
|---|---|
| Tickets avec critères d'acceptation explicites | Réduire les malentendus |
| Temps entre lecture et plan validé | Comprendre le coût de l'investigation |
| Nombre de modifications hors périmètre | Le réduire |
| Tests exécutés avec résultat clair | Augmenter la confiance |
| Retouches après review | Identifier les points faibles |
| Régressions découvertes après livraison | Les réduire |
| Tokens/durée par catégorie de ticket | Optimiser les modèles sans sacrifier la qualité |

On n'optimise pas seulement les tokens : on optimise **le travail humain total**, y compris les corrections après coup.

## 15. Une amélioration progressive plutôt qu'une usine à gaz

| Ordre | Changement | Validation |
|---|---|---|
| 1 | Comprendre la configuration réelle `opencode.json` | Diagnostic en lecture seule |
| 2 | Stabiliser règles et permissions | Comportement sûr |
| 3 | Ajouter la fiche de triage | Tickets mieux compris |
| 4 | Installer les trois commandes | Workflow réutilisable |
| 5 | Tester sur un T1 simple | Diff limité, tests et review |
| 6 | Comparer les deux LLM | Choix fondés sur les résultats |
| 7 | Intégrer GitLab en lecture seule | Moins de copier-coller |
| 8 | Tester un T4 multi-dépôts | Contrat commun et MR cohérentes |

## 16. Checklist de fin de ticket

- [ ] Besoin et critères d'acceptation compris.
- [ ] Sources et hypothèses distinguées.
- [ ] Dépôt et branche corrects.
- [ ] Plan validé.
- [ ] Diff limité au besoin.
- [ ] Contrats entre dépôts cohérents.
- [ ] Tests lancés et résultats réels documentés.
- [ ] Revue critique réalisée.
- [ ] Aucun secret, réseau ou dépendance non autorisés.
- [ ] Risques et retour arrière connus.
- [ ] Commit, push et MR approuvés.
- [ ] Ticket et MR liés avec description claire.

## Conclusion

**Le progrès ne consiste pas à multiplier les agents : il consiste à améliorer les décisions et leurs preuves.** Commencer avec des tickets simples, mesurer le résultat, affiner les prompts et les règles, puis passer à l'orchestration inter-dépôts lorsque la méthode est maîtrisée.

OpenCode aide à raisonner et à exécuter ; **le développeur conserve la responsabilité du diagnostic, du changement et de la livraison**.
