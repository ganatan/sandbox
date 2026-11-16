# 003 — Configuration OpenCode sur Fedora / Distrobox

## 1. Fichier réel du poste client

**Le fichier de configuration principal utilisé sur le poste est :**

```bash
~/.config/opencode/opencode.json
```

Ce chemin est une **information confirmée pour notre environnement**. Ne pas le remplacer par `opencode.jsonc` dans les procédures.

```bash
ls -l ~/.config/opencode/opencode.json
python3 -m json.tool ~/.config/opencode/opencode.json >/dev/null
```

La deuxième commande valide la syntaxe JSON, si Python est disponible. Ne pas publier le contenu brut : il peut contenir des URL internes, des identifiants ou des secrets.

Le fichier réel du client **n'est pas connu de cette documentation**. Il faut le faire analyser localement par OpenCode, sans copier de secrets dans un dépôt public.

## 2. Ce que peut contenir opencode.json

| Clé usuelle | But | Précaution |
|---|---|---|
| `model` | Modèle principal, au format fournisseur/modèle | Conserver les identifiants internes réels |
| `small_model` | Modèle secondaire, si disponible | Ne pas inventer un troisième modèle |
| `provider` | Fournisseur et éventuel endpoint interne | Ne pas exposer URL sensibles ou tokens |
| `agent` | Modèles, prompts et outils des agents | Adapter à la version installée |
| `permission` | Permissions pour commandes, édition et réseau | Refuser ou confirmer les actions sensibles |
| `mcp` | Connexion à des serveurs MCP approuvés | Commencer par lecture seule pour GitLab |
| `instructions` | Sources de règles supplémentaires | Éviter les règles contradictoires |
| `compaction` | Compression des longues sessions | Mesurer son impact sur la qualité |

Ces noms sont des éléments de configuration fréquents, **pas une preuve qu'ils existent ou sont valables pour notre version**.

`AGENTS.md` est un fichier d'instructions distinct : ce n'est pas le fichier `opencode.json`.

## 3. Vérification locale : où est lancé OpenCode ?

Dans Fedora, puis dans la Distrobox concernée :

```bash
echo "$HOME"
command -v opencode
opencode --version
ls -l ~/.config/opencode/opencode.json
```

Dans Distrobox, le HOME est souvent partagé avec Fedora, mais il faut vérifier. Ne jamais modifier en parallèle deux configurations supposées identiques.

Faire une sauvegarde locale **dans un emplacement approuvé par le client** avant toute édition. Éviter d'ajouter le fichier réel à Git.

## 4. Prompt de diagnostic à saisir directement dans OpenCode

> Analyse le fichier exact ~/.config/opencode/opencode.json sur mon poste Fedora/Distrobox, sans en divulguer les valeurs sensibles. Décris chaque clé présente, son rôle et son effet. Vérifie quelle configuration est réellement chargée, le modèle par défaut, les deux modèles disponibles « Intelligence » et « Super Intelligence », les agents, permissions, MCP, options de contexte et consommation de tokens. Compare uniquement avec la syntaxe disponible dans ma version locale d'OpenCode. Aucun Internet, aucune installation, aucune écriture ni changement de configuration. Propose ensuite les cinq optimisations prioritaires et leurs risques.

**Livrable attendu :** tableau « clé actuelle / rôle / problème potentiel / proposition / accord nécessaire ».

## 5. Répartition initiale des modèles : hypothèse à tester

| Fonction | Modèle pressenti | Justification |
|---|---|---|
| Analyse complexe / plan | Super Intelligence | Comparer la qualité du raisonnement |
| Exploration de code | Intelligence | Tester la vitesse et le coût |
| Implémentation simple | Intelligence | Tester la précision |
| Review des changements importants | Super Intelligence | Tester la détection des défauts |

Aucun des deux noms ne donne la fenêtre de contexte, la tarification, la vitesse ou les capacités réelles. Tester à scénario comparable avant de fixer les rôles.

## 6. Exemple de structure, non prêt à copier

Ce bloc illustre uniquement les thèmes à examiner. Les valeurs fictives ne correspondent pas au client.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "FOURNISSEUR_INTERNE/IDENTIFIANT_MODELE",
  "small_model": "FOURNISSEUR_INTERNE/IDENTIFIANT_MODELE_SECONDAIRE",
  "agent": {},
  "permission": {},
  "mcp": {},
  "compaction": {
    "auto": true
  }
}
```

**Ne pas remplacer le fichier du poste par cet exemple.** Il omet volontairement l'authentification interne et les règles réelles. Le schéma distant n'est pas nécessaire au fonctionnement hors ligne et sa disponibilité n'est pas garantie.

## 7. Procédure de modification sécurisée

1. Faire un diagnostic **en lecture seule**.
2. Vérifier les règles imposées par le client et qui possède le fichier.
3. Sauvegarder la version actuelle dans un emplacement local autorisé, sans la committer.
4. Demander un **diff minimal** à OpenCode, adapté à la version.
5. Examiner le diff et les impacts (modèles, secrets, MCP, permissions).
6. Autoriser la modification ; vérifier la syntaxe JSON.
7. Relancer OpenCode si nécessaire, tester `/models` et les agents.
8. Revenir à la sauvegarde en cas de régression, après autorisation.

Prompt de mise à jour :

> À partir du diagnostic validé, propose un patch minimal de ~/.config/opencode/opencode.json. Préserve entièrement la configuration du provider et les secrets internes, ainsi que les règles de sécurité. Affiche le diff anonymisé avant d'écrire. Ne change rien avant mon accord. Vérifie la syntaxe JSON et teste les comportements autorisés après modification.

## 8. Ce qui appartient à la configuration globale ou au dépôt

| Emplacement | Contenu |
|---|---|
| `~/.config/opencode/opencode.json` | Configuration globale locale réellement utilisée |
| `~/.config/opencode/AGENTS.md` | Règles générales, si prises en charge localement |
| `~/workspace/repositories/NOM/AGENTS.md` | Conventions propres au dépôt |
| `~/workspace/repositories/NOM/opencode.json` | Éventuelles surcharges spécifiques, si justifiées |
| `~/workspace/repositories/NOM/.git/` | Historique Git indépendant |

Ne jamais committer le fichier de configuration global réel ou ses informations sensibles dans le dépôt de documentation `sandbox`.

## 9. Vérification finale

- [ ] Chemin confirmé : `~/.config/opencode/opencode.json`.
- [ ] OpenCode a analysé le fichier sans afficher les secrets.
- [ ] Les identifiants des deux modèles sont connus localement.
- [ ] Les permissions sensibles sont vérifiées.
- [ ] La configuration GitLab/MCP respecte la politique interne.
- [ ] Toute modification a été approuvée et testée.

Voir aussi [001-demarrage.md](./001-demarrage.md) et [002-installation-details.md](./002-installation-details.md).
