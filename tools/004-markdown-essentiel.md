# 004 - Markdown Essentiel

## Objectif

Apprendre à écrire un fichier de documentation technique `.md`, lisible sur GitHub, dans VS Code ou dans un éditeur Markdown.

Markdown est un langage de balisage léger. Un fichier `README.md` est généralement la page d'accueil documentaire d'un projet.

## 1. Créer un fichier

Créer un fichier `README.md` ou `001-installation.md`, puis l'ouvrir avec VS Code.

```text
projet/
├── README.md
└── docs/
    └── 001-installation.md
```

## 2. Titres

```markdown
# Titre principal
## Section
### Sous-section
#### Détail
```

Utiliser un seul titre principal `#` par document, puis des `##` et `###` dans l'ordre.

## 3. Paragraphes et mise en forme

```markdown
Un paragraphe simple.

Un deuxième paragraphe.

**Texte important**
*Texte en italique*
~~Texte barré~~
`ByteBuffer`
```

Laisser une ligne vide entre les paragraphes.

## 4. Listes

```markdown
- Java 8
- UDP
- Protocole binaire

1. Compiler
2. Exécuter
3. Vérifier
```

Pour une liste de tâches :

```markdown
- [x] Documentation
- [ ] Implémentation
- [ ] Validation
```

## 5. Liens

```markdown
[Documentation Java](https://docs.oracle.com/javase/8/docs/)
[Installation](docs/001-installation.md)
[Retour à l'accueil](../README.md)
```

Préférer les chemins relatifs pour les liens entre fichiers d'un même dépôt.

## 6. Images

```markdown
![Schéma de l'architecture](images/architecture.png)
```

Renseigner un texte alternatif utile. Une image doit être présente à l'emplacement indiqué.

## 7. Blocs de code

Indiquer le langage après les trois accents graves pour activer la coloration syntaxique.

Exemple Java :

````markdown
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour");
    }
}
```
````

Exemple de commande :

````markdown
```bash
javac Main.java
java Main
```
````

Langages utiles : `java`, `bash`, `powershell`, `json`, `xml`, `yaml`, `sql`, `text`.

## 8. Tableaux

```markdown
| Élément | Fonction |
|---|---|
| `javac` | Compile Java |
| `java` | Exécute Java |
| `jar` | Crée une archive JAR |
```

Aligner une colonne à droite avec `---:` ou au centre avec `:---:`.

Pour de longues explications, préférer des paragraphes plutôt que des tableaux trop larges sur mobile.

## 9. Arborescences

Utiliser un bloc `text` :

````markdown
```text
media-protocol/
├── src/
│   └── Main.java
└── README.md
```
````

## 10. Citations et séparateurs

```markdown
> Important : vérifier les commandes avant de les exécuter.

---
```

## 11. Caractères spéciaux

Les caractères `#`, `*`, `_`, `[`, `]` peuvent avoir un sens en Markdown.

Utiliser un accent grave pour du code court, ou un antislash pour afficher certains caractères littéralement.

Exemple :

```markdown
\*ce texte n'est pas en italique\*
```

## 12. Exemple complet de documentation

Le contenu suivant peut être copié dans `001-java-starter.md` :

````markdown
# 001 - Java Starter

## Objectif

Créer et exécuter une application Java 8 minimale.

## Projet

```text
java-starter/
└── Main.java
```

## Code Java

`Main.java` :

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour");
    }
}
```

## Compilation

```bash
javac Main.java
```

## Exécution

```bash
java Main
```

## Résultat attendu

```text
Bonjour
```

## À retenir

- `javac` compile le fichier source.
- `java` lance la classe compilée.
````

## 13. README de navigation

Créer un sommaire avec des liens vers les tutoriels :

```markdown
# Java 8

- [001 - Installation](installation/001-installation.md)
- [002 - Compilation](compilation/002-compilation.md)
```

Pour afficher deux colonnes sur GitHub :

```markdown
| | |
|---|---|
| [Java](java/README.md) | [Linux](linux/README.md) |
| [Tools](tools/README.md) | [GitLab](gitlab/README.md) |
```

## 14. Prévisualisation dans VS Code

1. Ouvrir le fichier `.md`.
2. Utiliser `Ctrl+Shift+V` pour afficher l'aperçu Markdown.
3. Vérifier les titres, les blocs de code et les liens.
4. Faire un `git diff` avant le commit.

## 15. Bonnes pratiques

- Un document = un objectif clair.
- Utiliser un titre, un objectif, un exemple, les commandes, le résultat attendu et une synthèse.
- Préférer des titres courts, des chemins relatifs et des exemples reproductibles.
- Préciser le système concerné : Windows CMD, PowerShell ou Linux.
- Afficher le résultat attendu sans prétendre qu'il a été exécuté.
- Vérifier le rendu sur mobile et la validité des liens.
- Éviter les fichiers trop longs quand plusieurs tutoriels autonomes suffisent.

## 16. Commandes Git

```bash
git status
git diff
git add README.md
git commit -m "docs: ajouter documentation Markdown"
```

## À retenir

Markdown permet de créer facilement une documentation lisible, versionnée et collaborative, sans outil de mise en page.

Références : https://commonmark.org/help/ et https://docs.github.com/en/get-started/writing-on-github
