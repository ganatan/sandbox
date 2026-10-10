# Installation et configuration Java

## Distribution

```bash
cat /etc/os-release
```

## Java installé

```bash
command -v java
```

## Version Java

```bash
java -version
```

## Version compilateur

```bash
javac -version
```

## Installer Debian Ubuntu

```bash
sudo apt update
sudo apt install openjdk-21-jdk
```

## Installer Fedora

```bash
sudo dnf install java-21-openjdk-devel
```

## Lister alternatives Debian

```bash
update-alternatives --list java
```

## Sélectionner la version

```bash
sudo update-alternatives --config java
```

## Chemin binaire Java

```bash
readlink -f "$(command -v java)"
```

## Définir JAVA_HOME pour la session

```bash
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
```

## Ajouter Java au PATH

```bash
export PATH="$JAVA_HOME/bin:$PATH"
```

## Afficher JAVA_HOME

```bash
echo "$JAVA_HOME"
```

## Compiler

```bash
javac Main.java
```

## Exécuter

```bash
java Main
```
