# Archives et compression

## Créer une archive tar

```bash
tar -cf sauvegarde.tar dossier/
```

## Lister son contenu

```bash
tar -tf sauvegarde.tar
```

## Extraire tar

```bash
tar -xf sauvegarde.tar
```

## Créer tar.gz

```bash
tar -czf sauvegarde.tar.gz dossier/
```

## Extraire tar.gz

```bash
tar -xzf sauvegarde.tar.gz
```

## Extraire vers un dossier existant

```bash
tar -xzf sauvegarde.tar.gz -C /tmp/
```

## Créer tar.xz

```bash
tar -cJf sauvegarde.tar.xz dossier/
```

## Extraire tar.xz

```bash
tar -xJf sauvegarde.tar.xz
```

## Compresser un fichier

```bash
gzip fichier.log
```

## Décompresser gzip

```bash
gunzip fichier.log.gz
```

## Créer zip

```bash
zip -r sauvegarde.zip dossier/
```

## Lister zip

```bash
unzip -l sauvegarde.zip
```

## Extraire zip

```bash
unzip sauvegarde.zip
```

## Vérifier une archive gzip

```bash
gzip -t fichier.log.gz
```
