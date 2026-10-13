# Clé SSH GitLab

## 1. Principe

SSH (Secure Shell) permet de s'authentifier auprès de GitLab sans saisir son mot de passe à chaque opération Git.

- **Clé privée** : conservée uniquement sur l'ordinateur.
- **Clé publique** : enregistrée dans le compte GitLab.

```bash
git clone git@gitlab.com:utilisateur/projet.git
```

## 2. Vérifier SSH sous Windows

Ouvrir PowerShell ou Git Bash.

```bash
ssh -V
git --version
```

Si `ssh` n'est pas reconnu dans PowerShell, vérifier l'installation du client OpenSSH de Windows.

## 3. Générer une clé SSH

Depuis Git Bash, en local :

```bash
mkdir -p ~/.ssh
ssh-keygen -t ed25519 -C "user01@gmail.com" -f ~/.ssh/gitlab-user01
```

Exemple de fichiers créés :

```text
C:\Users\chend\.ssh\
├── gitlab-user01
└── gitlab-user01.pub
```

| Fichier | Rôle |
|---|---|
| `gitlab-user01` | Clé privée : ne jamais la partager |
| `gitlab-user01.pub` | Clé publique à enregistrer sur GitLab |

- `-t ed25519` : algorithme Ed25519.
- `-C` : commentaire d'identification.
- `-f` : nom et chemin des fichiers.

Une phrase secrète (passphrase) est recommandée pour protéger la clé privée.

## 4. Ajouter la clé publique sur GitLab

Depuis Git Bash :

```bash
cat ~/.ssh/gitlab-user01.pub
```

Depuis PowerShell :

```powershell
Get-Content "$HOME\.ssh\gitlab-user01.pub"
```

Copier la ligne complète, qui commence par :

```text
ssh-ed25519 AAAA...
```

Sur le site https://gitlab.com :

1. Se connecter à son compte.
2. Ouvrir son avatar, puis **Edit profile**.
3. Aller dans **Access → SSH Keys** (libellé variable selon la version).
4. Cliquer sur **Add new key**.
5. Coller la clé publique et enregistrer.

Ne jamais transmettre le fichier de clé privée.

## 5. Configurer SSH en local

Créer ou modifier le fichier suivant :

```text
C:\Users\chend\.ssh\config
```

Le nom est `config`, sans extension `.txt`.

```sshconfig
Host gitlab-user01
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/gitlab-user01
    IdentitiesOnly yes
```

| Directive | Fonction |
|---|---|
| `Host` | Alias local de connexion |
| `HostName` | Adresse réelle du serveur GitLab |
| `User` | Utilisateur SSH GitLab : `git` |
| `IdentityFile` | Chemin de la clé privée |
| `IdentitiesOnly` | N'utiliser que les identités configurées |

## 6. Tester la connexion

```bash
ssh -T git@gitlab-user01
```

À la première connexion, vérifier l'empreinte de la clé d'hôte avec celle publiée par GitLab avant de confirmer :

```text
yes
```

Exemple de réponse attendue :

```text
Welcome to GitLab, @user01!
```

## 7. Cloner un dépôt

Sur GitLab, ouvrir le projet et copier son URL SSH.

URL SSH standard :

```text
git@gitlab.com:user01/mon-projet.git
```

Avec l'alias SSH configuré :

```bash
git clone git@gitlab-user01:user01/mon-projet.git
```

## 8. Utiliser Git

```bash
cd mon-projet
git remote -v
git add .
git commit -m "Mise à jour documentation"
git push
git pull
```

Lorsque le dépôt utilise une URL distante SSH, les opérations réseau Git utilisent automatiquement SSH.

## 9. Passer un dépôt existant en SSH

```bash
git remote -v
git remote set-url origin git@gitlab-user01:user01/mon-projet.git
git remote -v
git ls-remote origin
```

## 10. Diagnostiquer les problèmes

Connexion détaillée :

```bash
ssh -vT git@gitlab-user01
```

Configuration SSH effective :

```bash
ssh -G gitlab-user01
```

Tester une clé explicitement :

```bash
ssh -i ~/.ssh/gitlab-user01 -o IdentitiesOnly=yes -T git@gitlab.com
```

Erreur possible :

```text
Permission denied (publickey).
```

Vérifier que la clé publique est enregistrée sur le bon compte GitLab, que `IdentityFile` pointe vers la clé privée correspondante et que la clé est valide.

Si l'authentification SSH fonctionne mais que le clonage échoue, vérifier l'URL et les droits d'accès au projet.

## 11. Plusieurs comptes GitLab

```sshconfig
Host gitlab-user01
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/gitlab-user01
    IdentitiesOnly yes

Host gitlab-user02
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/gitlab-user02
    IdentitiesOnly yes
```

Tester chaque compte :

```bash
ssh -T git@gitlab-user01
ssh -T git@gitlab-user02
```

La clé SSH sert à l'authentification. Les paramètres `git config user.name` et `git config user.email` déterminent, séparément, l'identité inscrite dans les commits.

## 12. Commandes essentielles

```bash
ssh -V
ssh-keygen -t ed25519 -C "user01@gmail.com" -f ~/.ssh/gitlab-user01
cat ~/.ssh/gitlab-user01.pub
ssh -T git@gitlab-user01
ssh -vT git@gitlab-user01
git clone git@gitlab-user01:user01/mon-projet.git
git remote -v
git ls-remote origin
```

Documentation officielle : https://docs.gitlab.com/user/ssh/
