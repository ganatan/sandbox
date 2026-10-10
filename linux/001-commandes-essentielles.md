# Commandes essentielles Linux

## Répertoire courant

```bash
pwd
```

## Lister les fichiers

```bash
ls
```

## Lister les fichiers avec détails

```bash
ls -l
```

## Afficher les fichiers cachés

```bash
ls -la
```

## Changer de répertoire

```bash
cd /home/user
```

## Revenir au répertoire parent

```bash
cd ..
```

## Revenir au répertoire personnel

```bash
cd ~
```

## Créer un répertoire

```bash
mkdir projets
```

## Créer une arborescence

```bash
mkdir -p projets/java/src
```

## Créer un fichier vide

```bash
touch fichier.txt
```

## Copier un fichier

```bash
cp fichier.txt copie.txt
```

## Copier un répertoire

```bash
cp -r source destination
```

## Déplacer un fichier

```bash
mv fichier.txt /tmp/
```

## Renommer un fichier

```bash
mv ancien.txt nouveau.txt
```

## Supprimer un fichier

```bash
rm fichier.txt
```

## Supprimer un répertoire vide

```bash
rmdir dossier
```

## Supprimer un répertoire et son contenu

```bash
rm -r dossier
```

## Afficher le contenu d'un fichier

```bash
cat fichier.txt
```

## Lire un fichier page par page

```bash
less fichier.txt
```

## Afficher les premières lignes

```bash
head -n 10 fichier.txt
```

## Afficher les dernières lignes

```bash
tail -n 10 fichier.txt
```

## Suivre un fichier de logs

```bash
tail -f application.log
```

## Rechercher un fichier

```bash
find . -name "*.java"
```

## Rechercher du texte dans un fichier

```bash
grep "ERROR" application.log
```

## Rechercher du texte récursivement

```bash
grep -r "ERROR" .
```

## Afficher les permissions

```bash
ls -l fichier.txt
```

## Modifier les permissions

```bash
chmod 755 script.sh
```

## Rendre un script exécutable

```bash
chmod +x script.sh
```

## Modifier le propriétaire

```bash
sudo chown user:user fichier.txt
```

## Afficher l'utilisateur courant

```bash
whoami
```

## Afficher les informations système

```bash
uname -a
```

## Afficher les processus

```bash
ps aux
```

## Surveiller les processus

```bash
top
```

## Rechercher un processus

```bash
ps aux | grep java
```

## Arrêter un processus

```bash
kill 1234
```

## Afficher l'espace disque

```bash
df -h
```

## Afficher la taille d'un répertoire

```bash
du -sh dossier
```

## Afficher la mémoire

```bash
free -h
```

## Afficher les interfaces réseau

```bash
ip addr
```

## Tester la connexion réseau

```bash
ping google.com
```

## Afficher les ports en écoute

```bash
ss -tuln
```

## Tester une URL HTTP

```bash
curl http://localhost:3000
```

## Télécharger un fichier

```bash
wget https://example.com/fichier.zip
```

## Se connecter en SSH

```bash
ssh user@serveur
```

## Copier un fichier vers un serveur

```bash
scp fichier.txt user@serveur:/tmp/
```

## Afficher les variables d'environnement

```bash
printenv
```

## Définir une variable d'environnement

```bash
export APPLICATION_NAME=demo
```

## Afficher une variable

```bash
echo "$APPLICATION_NAME"
```

## Afficher l'historique des commandes

```bash
history
```

## Afficher le chemin d'une commande

```bash
which java
```

## Afficher l'aide d'une commande

```bash
man ls
```

## Exécuter une commande en administrateur

```bash
sudo ls /root
```

## Afficher la date

```bash
date
```

## Afficher le nom de la machine

```bash
hostname
```

## Compresser un répertoire

```bash
tar -czf archive.tar.gz dossier/
```

## Décompresser une archive

```bash
tar -xzf archive.tar.gz
```

## Exécuter un script Bash

```bash
bash script.sh
```

## Effacer le terminal

```bash
clear
```
