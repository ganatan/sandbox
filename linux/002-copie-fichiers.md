# Copie de fichiers Linux

## Copier un fichier

```bash
cp fichier.txt copie.txt
```

## Copier un fichier dans un répertoire

```bash
cp fichier.txt /tmp/
```

## Copier plusieurs fichiers

```bash
cp fichier1.txt fichier2.txt /tmp/
```

## Copier un répertoire

```bash
cp -r source/ destination/
```

## Copier un répertoire en conservant les attributs

```bash
cp -a source/ destination/
```

## Copier en demandant confirmation avant écrasement

```bash
cp -i fichier.txt copie.txt
```

## Copier en affichant les opérations

```bash
cp -v fichier.txt copie.txt
```

## Copier uniquement si le fichier source est plus récent

```bash
cp -u fichier.txt copie.txt
```

## Copier tous les fichiers d'un répertoire

```bash
cp source/* destination/
```

## Copier le contenu complet d'un répertoire, fichiers cachés inclus

```bash
cp -a source/. destination/
```

## Copier un fichier vers un serveur distant avec SCP

```bash
scp fichier.txt user@serveur:/tmp/
```

## Copier un fichier depuis un serveur distant avec SCP

```bash
scp user@serveur:/tmp/fichier.txt .
```

## Copier un répertoire vers un serveur distant

```bash
scp -r dossier/ user@serveur:/tmp/
```

## Copier un fichier avec une clé SSH

```bash
scp -i ~/.ssh/id_ed25519 fichier.txt user@serveur:/tmp/
```

## Synchroniser deux répertoires avec rsync

```bash
rsync -av source/ destination/
```

## Synchroniser vers un serveur distant

```bash
rsync -av source/ user@serveur:/tmp/destination/
```

## Synchroniser uniquement les fichiers modifiés

```bash
rsync -avu source/ destination/
```

## Simuler une synchronisation sans rien modifier

```bash
rsync -avn source/ destination/
```

## Synchroniser en supprimant les fichiers absents de la source

```bash
rsync -av --delete source/ destination/
```

## Copier un fichier en conservant les permissions et dates

```bash
cp -p fichier.txt copie.txt
```

## Différences essentielles

- `cp` : copie locale.
- `scp` : copie entre machines via SSH.
- `rsync` : synchronisation de fichiers et répertoires, locale ou distante.
