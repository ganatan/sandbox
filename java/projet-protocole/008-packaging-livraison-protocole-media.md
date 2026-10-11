# 008 - Packaging et Livraison Protocole Media

## Objectif

Préparer une livraison Media Protocol V1 avec trois JAR :

- `media-protocol.jar` : bibliothèque du protocole.
- `media-emitter.jar` : application émettrice UDP.
- `media-receiver.jar` : application réceptrice UDP.

Java 8, sans Maven ni dépendance externe.

## 1. Prérequis

- [004 - Implémentation Protocole Media](004-implementation-protocole-media.md)
- [005 - Implémentation Media Emitter](005-implementation-media-emitter.md)
- [006 - Implémentation Media Receiver](006-implementation-media-receiver.md)
- [007 - Tests et Validation Protocole Media](007-tests-validation-protocole-media.md)

## 2. Structure des projets

```text
media-protocol/
├── src/
└── build/

media-emitter/
├── src/
├── lib/
└── build/

media-receiver/
├── src/
├── lib/
└── build/
```

## 3. Compilation du protocole

Depuis `media-protocol`.

Windows CMD :

```bat
mkdir build\classes
javac -d build/classes src/*.java
```

Linux :

```bash
mkdir -p build/classes
javac -d build/classes src/*.java
```

Générer le JAR :

```bash
jar cf build/media-protocol.jar -C build/classes .
```

## 4. Compilation de l'émetteur

Depuis `media-emitter`.

Windows CMD :

```bat
mkdir lib
copy ..\media-protocol\build\media-protocol.jar lib\
mkdir build\classes
javac -cp lib/media-protocol.jar -d build/classes src/Main.java
jar cfe build/media-emitter.jar Main -C build/classes .
```

Linux :

```bash
mkdir -p lib build/classes
cp ../media-protocol/build/media-protocol.jar lib/
javac -cp lib/media-protocol.jar -d build/classes src/Main.java
jar cfe build/media-emitter.jar Main -C build/classes .
```

## 5. Compilation du récepteur

Depuis `media-receiver`.

Windows CMD :

```bat
mkdir lib
copy ..\media-protocol\build\media-protocol.jar lib\
mkdir build\classes
javac -cp lib/media-protocol.jar -d build/classes src/Main.java
jar cfe build/media-receiver.jar Main -C build/classes .
```

Linux :

```bash
mkdir -p lib build/classes
cp ../media-protocol/build/media-protocol.jar lib/
javac -cp lib/media-protocol.jar -d build/classes src/Main.java
jar cfe build/media-receiver.jar Main -C build/classes .
```

## 6. Structure de livraison

```text
media-protocol-release/
├── lib/
│   └── media-protocol.jar
├── media-emitter.jar
└── media-receiver.jar
```

## 7. Assemblage de la livraison

Depuis le répertoire parent des trois projets.

Windows CMD :

```bat
mkdir media-protocol-release
mkdir media-protocol-release\lib
copy media-protocol\build\media-protocol.jar media-protocol-release\lib\
copy media-emitter\build\media-emitter.jar media-protocol-release\
copy media-receiver\build\media-receiver.jar media-protocol-release\
```

Linux :

```bash
mkdir -p media-protocol-release/lib
cp media-protocol/build/media-protocol.jar media-protocol-release/lib/
cp media-emitter/build/media-emitter.jar media-protocol-release/
cp media-receiver/build/media-receiver.jar media-protocol-release/
```

## 8. Exécution sous Windows

Depuis `media-protocol-release`.

Terminal 1 — Receiver :

```bat
java -cp "media-receiver.jar;lib/media-protocol.jar" Main
```

Terminal 2 — Emitter :

```bat
java -cp "media-emitter.jar;lib/media-protocol.jar" Main
```

Résultat attendu côté Receiver :

```text
Media Receiver UDP
Port : 5000

Source : 127.0.0.1:54321
Taille : 16 octets
Binary : 4D 50 01 01 00 00 00 08 00 00 00 01 00 00 07 E8
Media  : Media{id=1, year=2024}
```

Le port source est variable.

## 9. Exécution sous Linux

Terminal 1 — Receiver :

```bash
java -cp "media-receiver.jar:lib/media-protocol.jar" Main
```

Terminal 2 — Emitter :

```bash
java -cp "media-emitter.jar:lib/media-protocol.jar" Main
```

Sous Windows, le séparateur de classpath est `;`. Sous Linux, il est `:`.

## 10. Configuration externe

| Variable | Application | Valeur par défaut |
|---|---|---|
| UDP_ADDRESS | Emitter | 127.0.0.1 |
| UDP_PORT | Emitter / Receiver | 5000 |

Windows CMD :

```bat
set UDP_ADDRESS=127.0.0.1
set UDP_PORT=5000
```

Linux :

```bash
export UDP_ADDRESS=127.0.0.1
export UDP_PORT=5000
```

## 11. Vérification des JAR

Depuis `media-protocol-release` :

```bash
jar tf lib/media-protocol.jar
jar tf media-emitter.jar
jar tf media-receiver.jar
```

## 12. Archive de livraison

Sous Linux, depuis le répertoire parent :

```bash
tar -czf media-protocol-release.tar.gz media-protocol-release/
```

Sous Windows PowerShell, depuis le répertoire parent :

```powershell
Compress-Archive -Path media-protocol-release -DestinationPath media-protocol-release.zip
```

## 13. Vérification après déploiement

```bash
java -version
```

Sur la machine cible, vérifier Java 8, la disponibilité du port UDP 5000, les règles réseau et les trois JAR.

## 14. Points d'attention

- Les applications ont chacune une classe `Main` dans le package par défaut. C'est acceptable pour cet exemple, exécuté en processus séparés.
- `media-protocol.jar` doit être accessible dans le classpath des applications.
- Pour une compatibilité Java 8, compiler avec JDK 8 ou avec un compilateur récent configuré pour cibler Java 8.
- Une livraison industrielle devra être versionnée et accompagnée de ses résultats de validation.
- Les commandes indiquées assemblent une livraison pédagogique ; leur exécution effective reste à vérifier.

## 15. À retenir

- `javac` compile les fichiers source.
- `jar` génère les archives.
- `-cp` indique les dépendances.
- La bibliothèque du protocole reste séparée et partagée.
- Les variables d'environnement permettent une configuration sans recompilation.
- Une archive ZIP ou TAR.GZ facilite le transfert entre machines.

## Conclusion

Notre parcours couvre désormais la réception de la documentation fournisseur, l'analyse, l'architecture, l'implémentation, les tests et le packaging de Media Protocol V1.
