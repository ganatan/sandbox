# 006 — Exécuter OpenCode la nuit : cron, systemd et travaux autonomes contrôlés

## Objectif

Faire travailler **OpenCode pendant la nuit**, sur un poste **Fedora avec Podman et Distrobox**, en utilisant les deux modèles internes **Intelligence** et **Super Intelligence**, les dépôts GitLab locaux et les ressources de l'entreprise, **sans Internet public**.

Ce document est un guide opérationnel et surtout un **cahier des charges à donner à OpenCode pour qu'il prépare lui-même l'automatisation**. Il complète les documents 001 à 005, sans les remplacer.

> **Principe essentiel :** une exécution nocturne doit produire des rapports fiables et traçables, pas modifier les dix dépôts ni pousser du code sans supervision.

## 1. Vérifications avant de programmer une nuit

Le fait que le LLM soit « gratuit » pour toi ne signifie pas qu'il dispose d'une capacité illimitée : vérifier les quotas internes, les politiques du client, les créneaux autorisés et le comportement de l'infrastructure.

| Question | Pourquoi |
|---|---|
| Le poste reste-t-il allumé ? | Une machine arrêtée n'exécute rien |
| Fedora reste-t-il actif ou passe-t-il en veille ? | Cron et les timers ordinaires ne réveillent pas un poste en veille |
| Distrobox est-elle disponible ? | Le lancement doit entrer dans le bon environnement |
| Les modèles internes répondent-ils la nuit ? | Un VPN ou service peut être interrompu |
| L'entreprise autorise-t-elle les tâches IA nocturnes ? | Sécurité, conformité et capacités partagées |
| Le home et les dépôts sont-ils accessibles ? | Droits, montages et disques |
| Quel est le fuseau horaire ? | Les déclenchements doivent suivre la bonne heure locale |
| Quelles données peuvent être conservées ? | Éviter prompts, tickets sensibles et secrets dans les logs |

**Point de sécurité :** ne pas désactiver la veille du poste, conserver une session ouverte, activer un service persistant ou contourner une politique de verrouillage sans l'accord du client.

## 2. Quelles tâches confier à OpenCode la nuit ?

### À privilégier : lecture seule

1. Produire un résumé technique des changements Git locaux.
2. Analyser un module Angular, Quarkus ou Rust et rédiger une fiche d'architecture.
3. Réaliser une revue statique d'un diff déjà préparé.
4. Lister des risques ou incohérences à vérifier par un développeur.
5. Analyser les tickets GitLab déjà récupérés ou accessibles par un outil interne autorisé.
6. Générer des propositions de plans de traitement, sans les appliquer.
7. Préparer une synthèse de l'inventaire open source depuis un JSON structuré vérifié.
8. Produire un rapport des consommations OpenCode (cf. document 005).

### À ne pas automatiser par défaut

- Modification des branches de travail, refactorisation et corrections directement dans les dépôts.
- `git commit`, `git push`, création ou fusion de Merge Requests.
- Installation de dépendances ou appels Internet.
- Application de migrations de bases de données ou déploiements Kubernetes/ArgoCD.
- Exécution arbitraire d'instructions contenues dans les tickets.

Un ticket GitLab peut contenir une commande ou du texte trompeur : ses données ne doivent jamais se transformer en autorisations.

## 3. Première étape : vérifier que le mode non interactif fonctionne

Depuis **la Distrobox qui contient OpenCode** :

```bash
opencode --version
opencode run --help
opencode models
```

Sur les versions compatibles, `opencode run "..." ` lance un prompt sans ouvrir l'interface interactive. **Vérifier sur le binaire réellement installé** : les options diffèrent selon les versions.

Test minimal :

```bash
cd ~/workspace/repositories/NOM_DU_DEPOT
opencode run "Explique en cinq lignes l'objet de ce dépôt. Ne modifie aucun fichier."
```

Ce test valide le lancement, mais pas encore la sécurité. Pour une exécution nocturne, imposer **techniquement** les permissions de lecture seule, sans dépendre uniquement du texte du prompt.

## 4. Choisir le planificateur : systemd ou cron ?

| Solution | Avantages | Limites |
|---|---|---|
| `systemd --user` + timer | Journaux, statut, dépendances, timeout, reprise contrôlée, intégration Fedora | Persistant sans session uniquement avec configuration autorisée |
| `cron` / `crontab` | Simple, connu, planification directe | Environnement minimal, diagnostic et supervision moins intégrés |
| GitLab CI interne | Exécution sur runner central, historique et logs CI | Demande runner, permissions et politique d'utilisation |
| Script manuel | Très sûr pour le premier essai | Pas de lancement automatique |

**Recommandation :** commencer par un script manuel, puis un **timer systemd utilisateur**, si le client l'autorise. Utiliser cron si c'est le standard de l'entreprise.

Ne pas créer simultanément cron **et** un timer pour le même travail : cela pourrait lancer deux sessions et doubler les tokens.

## 5. Emplacement et organisation conseillés

Sur le home partagé Fedora / Distrobox, sous réserve des règles du client :

```text
~/workspace/
├── repositories/
│   ├── frontend-angular/
│   ├── backend-quarkus/
│   └── backend-rust/
└── tools/
    └── opencode-nightly/
        ├── prompts/
        │   ├── review.md
        │   └── tickets.md
        ├── bin/
        │   └── run-nightly.sh
        ├── reports/
        └── logs/
```

Les prompts sont des fichiers séparés pour faciliter les évolutions et les audits. Les résultats et logs doivent rester dans **un répertoire local autorisé** ; ne jamais committer automatiquement les rapports internes dans un dépôt personnel.

## 6. Cahier des charges du script nocturne

Le script à faire générer par OpenCode doit :

1. Définir un PATH explicite et vérifier le binaire `opencode`.
2. Se lancer dans la bonne Distrobox avec le même utilisateur et le même HOME.
3. Vérifier que les services internes requis répondent, **sans tenter d'adresse non autorisée**.
4. Travailler depuis le dépôt choisi et sur une branche connue.
5. Refuser de démarrer si le prérequis de lecture seule n'est pas satisfait.
6. Empêcher les chevauchements avec un verrou (par exemple `flock`).
7. Imposer une durée maximale (`timeout`) et un nombre limité de dépôts.
8. Choisir un modèle disponible et un agent effectivement configuré.
9. Écrire un rapport daté et un statut d'exécution clair.
10. Faire remonter les erreurs (code de retour non nul, horodatage et cause).
11. Éviter l'impression des variables sensibles, des jetons et du contenu brut des conversations.
12. Ne jamais modifier le fichier `~/.config/opencode/opencode.json`.
13. Ne jamais exécuter de commit, push, MR ou déploiement.
14. Prévoir un mode `dry-run` et un lancement manuel.
15. Prévoir une rétention limitée des journaux et rapports.

**Attention :** un agent nommé « plan » ou une phrase « lecture seule » ne suffisent pas si les outils ou permissions autorisent les écritures. L'isolation doit être effective et testée.

## 7. Déclenchement depuis Fedora vers Distrobox

Le planificateur peut être installé sur **l'hôte Fedora**, puis appeler un script dans la Distrobox, en respectant les montages et la configuration du client.

Exemple de principe, à vérifier manuellement :

```bash
distrobox enter NOM_DISTROBOX -- bash -lc 'command -v opencode && opencode --version'
```

Ne pas supposer que `cron` existe dans la Distrobox, ni que le conteneur continue à tourner lorsque le terminal est fermé. Le déclencheur côté Fedora est souvent plus prévisible.

Vérifier le répertoire courant, le PATH, la configuration chargée et les identifiants techniques des modèles dans **ce mode non interactif**. Ne pas supposer que la session interactive et la session planifiée ont le même environnement.

## 8. Exemple de planification cron

**Exemple indicatif : chaque nuit à 02 h 00**, fuseau local du système.

```cron
0 2 * * * /usr/bin/bash /home/UTILISATEUR/workspace/tools/opencode-nightly/bin/run-nightly.sh
```

Le script doit utiliser les chemins absolus et les commandes disponibles sur Fedora. Remplacer `UTILISATEUR` par le chemin réel, sans le deviner.

Commandes utiles :

```bash
command -v crontab
crontab -l
crontab -e
```

Créer l'entrée uniquement après validation du client et **après un essai manuel réussi**. Une cron ne lance pas un poste éteint ou endormi.

## 9. Exemple de timer systemd utilisateur

Avec l'accord du client, OpenCode pourra générer :

```text
~/.config/systemd/user/opencode-nightly.service
~/.config/systemd/user/opencode-nightly.timer
```

Exemple de service, à adapter :

```ini
[Unit]
Description=OpenCode nightly analysis

[Service]
Type=oneshot
ExecStart=%h/workspace/tools/opencode-nightly/bin/run-nightly.sh
TimeoutStartSec=45min
```

Exemple de timer :

```ini
[Unit]
Description=Run OpenCode nightly

[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=false
Unit=opencode-nightly.service

[Install]
WantedBy=timers.target
```

`Persistent=false` évite un rattrapage automatique après une période d'arrêt. Pour limiter les ressources et ne pas lancer plusieurs travaux simultanément, garder **un seul service** et un verrou dans le script.

Commandes de diagnostic :

```bash
systemctl --user daemon-reload
systemctl --user list-timers
systemctl --user status opencode-nightly.timer
journalctl --user -u opencode-nightly.service -n 50
```

Activation **uniquement après validation** :

```bash
systemctl --user enable --now opencode-nightly.timer
```

Un timer utilisateur peut dépendre de la session ouverte. `loginctl enable-linger` modifie les conditions de fonctionnement en absence de session et requiert une autorisation explicite : ne pas l'activer automatiquement.

## 10. Faire travailler Intelligence et Super Intelligence intelligemment

Ne pas supposer que « gratuit la nuit » implique un nombre illimité de requêtes.

| Travail nocturne | Modèle à tester | Format |
|---|---|---|
| Synthèse d'un dépôt | Intelligence | Rapport court |
| Lecture de tickets et classification | Intelligence | Tableau des faits |
| Revue de diff complexe | Super Intelligence | Risques avec preuves |
| Analyse d'architecture transversale | Super Intelligence | Plan et inconnues |
| Mesure de consommation | Aucun LLM si possible | Outil déterministe |

Le choix doit être confirmé par les tests du document 005. Le modèle léger n'est pas forcément plus économe en tokens : vérifier les chiffres.

## 11. Exécution sur dix dépôts

**Ne pas lancer les dix dépôts en parallèle au départ.** Utiliser une liste explicite et approuvée, traiter les projets **séquentiellement**, limiter le temps par dépôt, puis produire un rapport récapitulatif.

Exemple de séquence :

```text
02:00  Validation de l'environnement
02:02  Analyse dépôt Angular
02:xx  Analyse dépôt Rust
02:xx  Analyse dépôt Quarkus
...    Résumé et métriques
fin    Code de retour + journaux
```

Les horaires après le début ne sont pas des garanties. Le timeout global empêche que le processus tourne indéfiniment.

Un même fichier `AGENTS.md` global peut s'appliquer à tous, tandis que chaque dépôt garde ses conventions propres. Une session distincte évite de mélanger les contextes.

## 12. Rapport à consulter le matin

```md
# OpenCode — Rapport nocturne

Date :
État : succès / partiel / échec
Durée totale :
Modèles réellement utilisés :
Dépôts analysés :

## Résumé

## Changements constatés

## Tickets analysés

## Risques et points à vérifier

## Tests et limites

## Consommation de tokens
Source :
Input :
Output :
Cache :
Reasoning :
Données indisponibles :

## Erreurs

## Actions proposées
Aucune action automatique effectuée.
```

Les propositions doivent être vérifiées avant création d'un ticket, modification de code ou réponse GitLab.

## 13. Prompts à donner à OpenCode sur ton poste

### Prompt A — Diagnostic nocturne (lecture seule)

> Je veux automatiser une analyse OpenCode nocturne sur mon poste client Fedora avec Podman et Distrobox, sans Internet public. Notre configuration réelle est dans ~/.config/opencode/opencode.json. Vérifie d'abord la version, opencode run, les modèles Intelligence et Super Intelligence, le chemin du binaire, la disponibilité des services LLM internes, le fonctionnement de Distrobox, la présence de cron et de systemd --user, ainsi que les règles de sécurité applicables. Ne modifie rien. Explique les limites : veille du poste, absence de session, quotas LLM, permissions et journaux. Propose une solution minimale, de préférence systemd user si autorisé. Attends ma validation.

### Prompt B — Générer le script, le service et les tests

> Sur la base du diagnostic validé, crée dans ~/workspace/tools/opencode-nightly un script robuste et des modèles de configuration pour une exécution nocturne. Le script doit fonctionner depuis Fedora en entrant dans la Distrobox existante, exécuter des prompts en lecture seule sur les seuls dépôts autorisés, empêcher les chevauchements, appliquer timeout et gestion des erreurs, et écrire un rapport daté. N'installe rien, ne modifie aucun dépôt ni ~/.config/opencode/opencode.json et ne programme aucun lancement avant validation. Fournis un mode dry-run et des tests d'intégration locaux. Montre les fichiers et le plan avant toute écriture.

### Prompt C — Planifier à 02 h 00 après validation

> Le script a passé ses tests manuels. Propose un timer systemd utilisateur à 02 h 00 (heure locale), avec journalisation, aucune relance après absence, et aucun double lancement. Compare avec une crontab avant de choisir. Ne l'active pas encore ; affiche les commandes d'installation, vérification, désactivation et suppression. Attends mon approbation.

### Prompt D — Bilan du matin

> Lis uniquement les rapports et statistiques nocturnes autorisés. Résume les résultats, erreurs, tickets susceptibles de nécessiter une intervention et limites de mesure. N'invente aucun chiffre, n'exécute aucune correction et n'envoie aucune donnée sur un service externe.

## 14. Procédure de validation

1. Vérifier les politiques du client et la disponibilité nocturne du LLM.
2. Exécuter le Prompt A.
3. Tester `opencode run` manuellement dans Distrobox.
4. Faire générer le script avec le Prompt B.
5. Valider sécurité, permissions et `dry-run`.
6. Lancer une seule analyse de dépôt, sous supervision, et lire les journaux.
7. Choisir **un seul** planificateur avec le Prompt C.
8. Vérifier le premier rapport le matin, et les tokens du document 005.
9. Étendre progressivement à plusieurs dépôts.
10. Désactiver immédiatement si les règles client changent ou si les résultats sont incorrects.

## 15. Critères d'acceptation

- [ ] Aucune dépendance à Internet public.
- [ ] Exécution compatible avec le binaire OpenCode réellement installé.
- [ ] Fedora, Podman, Distrobox et HOME corrects.
- [ ] Disponibilité et autorisation nocturne confirmées.
- [ ] Aucun changement silencieux de code ou de configuration.
- [ ] Lecture seule garantie par des permissions techniques.
- [ ] Verrou anti-concurrence, timeout et codes de retour.
- [ ] Aucun secret ni conversation complète dans les journaux.
- [ ] Rapport daté et état d'exécution visibles le matin.
- [ ] Suivi des tokens disponible quand la source le permet.
- [ ] Cron **ou** systemd, pas les deux.
- [ ] Possibilité simple de désactiver le lancement.
- [ ] Aucun commit/push/MR/déploiement automatique.

## Conclusion

La nuit est un bon moment pour préparer le travail du lendemain : **recherche, analyse, revue, synthèse, inventaire et métriques**. La bonne architecture n'est pas « laisser un agent tout faire » mais **un déclenchement maîtrisé, des accès limités, des rapports exploitables et des décisions prises le matin par le développeur**.

Ressources techniques externes de référence, à consulter uniquement hors du réseau client si celui-ci interdit Internet :
- OpenCode CLI : https://opencode.ai/docs/cli/commands/
- Fedora / systemd : documentation de la version installée via `man systemd.timer`, `man systemd.service`, `man systemctl`.
