# 02 — Fedora et découverte des dépôts

## 1. Vérifier le poste

Ouvrir un terminal Fedora :

```bash
cat /etc/os-release
pwd
echo "$HOME"
git --version
podman --version
distrobox --version
```

Si une commande manque, relever l'absence ; ne pas installer sans validation.

## 2. Préparer un espace local

```bash
mkdir -p ~/workspace/repositories
cd ~/workspace/repositories
pwd
```

Les Distrobox peuvent partager le `HOME` hôte, mais vérifier le montage depuis chacune avant de supposer que les dossiers sont communs :

```bash
distrobox list
```

Dans une Distrobox ouverte :

```bash
echo "$HOME"
ls ~/workspace/repositories
```

## 3. Repérer les dépôts GitLab

Faire d'abord une liste manuelle : dépôt, rôle, langage probable, fichiers de dépendances. Commencer par un seul dépôt.

Si autorisé, cloner dans `~/workspace/repositories` :

```bash
git clone <URL_DU_DEPOT_AUTORISE>
```

## 4. Examiner le dépôt

Dans le dépôt :

```bash
git status
git rev-parse HEAD
ls -la
find . -maxdepth 4 -type f \( -name 'package.json' -o -name 'package-lock.json' -o -name 'pom.xml' -o -name 'Cargo.toml' -o -name 'Cargo.lock' -o -name 'Chart.yaml' -o -name 'LICENSE*' \) -print
```

Le commit affiché par `git rev-parse HEAD` aide à retrouver l'état inspecté.

| Fichier | Information principale |
|---|---|
| `package.json` | Dépendances déclarées Node/Angular/React |
| `package-lock.json` | Versions résolues npm |
| `pom.xml` | Dépendances Maven/Java ; versions parfois héritées |
| `Cargo.toml` | Dépendances Rust |
| `Cargo.lock` | Versions verrouillées Rust |
| `Chart.yaml`, `values.yaml` | Déclarations Helm, pas preuve de déploiement |
| `LICENSE`, `NOTICE` | Notices de licence du projet |

La licence d'une dépendance ne se déduit pas toujours du manifeste principal : vérifier les métadonnées et licences du paquet correspondant.

## 5. OpenCode

```bash
command -v opencode
opencode --version
```

Si absent, utiliser uniquement la méthode d'installation approuvée. OpenCode exécuté localement peut quand même envoyer des données à un fournisseur de modèle distant.

Sur un dépôt **autorisé** :

```bash
opencode
```

Demander :

```text
Inspect this repository without modifying files. Identify manifests, direct dependencies and possible license evidence. For each finding cite its local source. Distinguish facts from assumptions.
```

Comparer sa réponse aux fichiers. Ne jamais considérer une réponse d'IA comme une preuve à elle seule.
