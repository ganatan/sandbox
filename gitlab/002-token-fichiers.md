# Token et fichiers

## 1. Principe

GitLab permet d'accéder à un dépôt Git avec SSH (clés) ou HTTPS (identifiants et token).

Un token est une chaîne secrète qui permet d'authentifier un utilisateur ou une application.

```bash
git clone https://gitlab.com/user01/mon-projet.git
```

Si Git demande des identifiants HTTPS :

```text
Username: user01
Password:
```

Dans `Password`, saisir le token GitLab, et non le mot de passe du compte.

## 2. Types de tokens

| Type | Utilisation |
|---|---|
| Personal Access Token (PAT) | Accès associé à un utilisateur |
| Project Access Token | Accès limité à un projet |
| Group Access Token | Accès aux ressources d'un groupe |
| Deploy Token | Accès à certains dépôts et registres |
| CI/CD Job Token | Authentification depuis un job GitLab CI/CD |

## 3. Créer un Personal Access Token

Sur https://gitlab.com :

1. Se connecter.
2. Cliquer sur son avatar, puis **Edit profile**.
3. Ouvrir **Access → Personal access tokens**.
4. Définir un nom et une date d'expiration.
5. Choisir les permissions nécessaires.
6. Générer le token et le conserver dans un endroit sécurisé.

Exemple de nom :

```text
gitlab-windows-user01
```

Exemple fictif de token :

```text
glpat-xxxxxxxxxxxxxxxxxxxx
```

Le token n'est généralement affiché qu'une seule fois.

## 4. Permissions (scopes)

| Scope | Fonction |
|---|---|
| `read_repository` | Lire et cloner les dépôts |
| `write_repository` | Lire et modifier les dépôts avec Git |
| `read_api` | Consulter les ressources autorisées via l'API |
| `api` | Accès étendu aux API selon les droits du compte |

Pour cloner uniquement :

```text
read_repository
```

Pour effectuer des `git push` :

```text
write_repository
```

Les droits du compte et du projet continuent de s'appliquer. Accorder uniquement les permissions nécessaires.

## 5. Cloner en HTTPS

```bash
git clone https://gitlab.com/user01/mon-projet.git
```

Saisir l'identifiant GitLab et le token lorsque Git les demande.

Ne pas mettre le token directement dans l'URL :

```text
https://user01:TOKEN@gitlab.com/user01/mon-projet.git
```

Cela peut exposer le secret dans l'historique, les configurations ou les journaux.

## 6. Gestion des identifiants sous Windows

Vérifier le gestionnaire configuré :

```bash
git config --global credential.helper
```

Si Git Credential Manager est installé :

```bash
git config --global credential.helper manager
git config --global --get credential.helper
```

Git Credential Manager peut gérer l'authentification via navigateur et stocker les identifiants dans le gestionnaire sécurisé Windows.

Éviter le stockage en clair :

```bash
git config --global credential.helper store
```

## 7. Manipuler les fichiers du dépôt

```bash
git clone https://gitlab.com/user01/mon-projet.git
cd mon-projet
echo "# Mon projet" > README.md
cat README.md
git status
git add README.md
git commit -m "Ajout du README"
git push
```

L'authentification HTTPS peut être demandée au moment du `push`.

## 8. Récupérer et modifier des fichiers

```bash
git pull
git ls-files
git diff
git diff --cached
git add .
git commit -m "Modification des fichiers"
git push
```

## 9. Exclure des fichiers avec .gitignore

Exemple de `.gitignore` :

```gitignore
node_modules/
dist/
build/
.env
.env.local
*.log
```

Un fichier déjà suivi n'est pas automatiquement retiré du suivi par `.gitignore`.

```bash
git rm --cached .env
git add .gitignore
git commit -m "Exclusion des fichiers sensibles"
```

Si un secret a déjà été publié, le révoquer ou le renouveler : le supprimer du dernier commit ne garantit pas sa disparition de l'historique.

## 10. Tokens dans GitLab CI/CD

Dans le projet GitLab :

```text
Settings
└── CI/CD
    └── Variables
```

Ajouter une variable :

```text
Key: GITLAB_TOKEN
Value: <token-secret>
```

Appliquer les protections et le masquage adaptés.

Exemple `.gitlab-ci.yml` :

```yaml
stages:
  - test

test-api:
  stage: test
  image: alpine:3.20
  script:
    - apk add --no-cache curl
    - curl --fail --silent --show-error --header "PRIVATE-TOKEN: $GITLAB_TOKEN" "$CI_API_V4_URL/projects/$CI_PROJECT_ID"
```

Préférer `CI_JOB_TOKEN` lorsque ses permissions suffisent.

## 11. API GitLab avec un token

Depuis Git Bash, saisir le token sans l'afficher :

```bash
read -rsp "Token GitLab : " GITLAB_TOKEN
echo
```

Informations sur l'utilisateur :

```bash
curl --fail --silent --show-error \
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/user"
```

Projets accessibles :

```bash
curl --fail --silent --show-error \
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/projects?membership=true"
```

Nettoyer la variable :

```bash
unset GITLAB_TOKEN
```

Ces appels nécessitent les permissions API appropriées.

## 12. Lire un fichier via l'API

```bash
curl --fail --silent --show-error \
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/projects/123456/repository/files/README.md/raw?ref=main"
```

- `123456` : identifiant du projet.
- `README.md` : chemin du fichier.
- `main` : branche.

Pour un sous-répertoire, encoder le chemin :

```text
docs%2Finstallation.md
```

Exemple de route :

```text
/api/v4/projects/123456/repository/files/docs%2Finstallation.md/raw?ref=main
```

## 13. Erreurs courantes

| Erreur | Cause possible |
|---|---|
| HTTP 401 | Token invalide, expiré ou absent |
| HTTP 403 | Permissions insuffisantes |
| HTTP 404 | Ressource inexistante ou inaccessible |
| Authentication failed | Échec de l'authentification HTTPS |
| You are not allowed to push code | Droits insuffisants ou branche protégée |

Diagnostic :

```bash
git remote -v
git config --list --show-origin
```

Ne jamais partager les secrets présents dans les configurations ou journaux.

## 14. Commandes essentielles

```bash
git clone https://gitlab.com/user01/mon-projet.git
git remote -v
git status
git add .
git commit -m "Modification"
git push
git pull
git ls-files
git diff
git config --global credential.helper manager
```

## 15. SSH ou HTTPS avec token ?

| Critère | SSH | HTTPS avec token |
|---|---|---|
| Authentification | Clé SSH | Token ou gestionnaire d'identifiants |
| Clone | Oui | Oui |
| Push | Oui | Oui |
| Automatisation | Oui | Oui |
| Expiration | Selon politique des clés | Généralement limitée dans le temps |
| Configuration locale | Clés et fichier SSH | Gestionnaire d'identifiants |

SSH convient bien aux opérations Git quotidiennes ; les tokens sont utiles pour l'API, les scripts et certaines automatisations CI/CD.

Documentation officielle : https://docs.gitlab.com/user/profile/personal_access_tokens/
