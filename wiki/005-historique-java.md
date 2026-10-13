# 005 - Historique de Java : versions 8 à 27 et écosystème

## Objectif

Comprendre l'évolution de Java, les versions du JDK de Java 8 à Java 27, les outils de compilation, les serveurs d'applications et les pratiques de livraison.

## 1. Origines de Java

| Année | Événement |
|---|---|
| 1991 | Début du projet Green chez Sun Microsystems |
| 1995 | Présentation publique de Java |
| 1996 | JDK 1.0 |
| 2004 | Java 5 : generics, enums, annotations |
| 2006 | Lancement du processus d'ouverture du code de Java |
| 2010 | Acquisition de Sun Microsystems par Oracle |
| 2014 | Java 8 : lambdas et streams |
| 2017 | Java 9 : modules |
| 2018 | Adoption d'un cycle de versions tous les six mois |
| 2023 | Java 21 LTS |
| 2025 | Java 25 LTS |
| 2026 | Java 27 |

Java est un langage, mais aussi une plateforme de développement et d'exécution.

## 2. JDK, JRE et JVM

```text
Main.java
   |
   | javac
   v
Main.class (bytecode)
   |
   | java
   v
JVM
   |
   v
Windows / Linux / macOS
```

| Terme | Rôle |
|---|---|
| JDK (Java Development Kit) | Outils de développement : javac, java, jar, javadoc, etc. |
| JRE (Java Runtime Environment) | Environnement d'exécution avec la JVM et les bibliothèques nécessaires |
| JVM (Java Virtual Machine) | Machine virtuelle qui exécute le bytecode |

Les distributions récentes du JDK ne livrent généralement plus un JRE séparé. Le JDK permet aussi l'exécution.

```bash
java -version
javac -version
jar --version
```

Sur Java 8, la commande `jar --version` n'est pas disponible : utiliser `jar` pour afficher l'aide.

## 3. Versions Java 8 à Java 27

Une version LTS bénéficie d'une maintenance prolongée **selon le distributeur** (Oracle, Eclipse Temurin, Amazon Corretto, etc.). Une version non-LTS suit normalement le rythme semestriel.

| Version | Année | Support | Évolution représentative |
|---|---|---|---|
| Java 8 | 2014 | LTS | Lambdas, Stream API, Optional, java.time |
| Java 9 | 2017 | Non-LTS | JPMS, JShell, collections immuables pratiques |
| Java 10 | 2018 | Non-LTS | `var` pour variables locales |
| Java 11 | 2018 | LTS | HTTP Client standard, lancement de fichiers source |
| Java 12 | 2019 | Non-LTS | Switch expressions (preview) |
| Java 13 | 2019 | Non-LTS | Text Blocks (preview) |
| Java 14 | 2020 | Non-LTS | Switch expressions définitives, records (preview) |
| Java 15 | 2020 | Non-LTS | Text Blocks définitifs, sealed classes (preview) |
| Java 16 | 2021 | Non-LTS | Records définitifs, pattern matching pour instanceof |
| Java 17 | 2021 | LTS | Sealed classes définitives |
| Java 18 | 2022 | Non-LTS | UTF-8 par défaut, serveur web minimal |
| Java 19 | 2022 | Non-LTS | Virtual Threads (preview) |
| Java 20 | 2023 | Non-LTS | Poursuite des previews de concurrence et de patterns |
| Java 21 | 2023 | LTS | Virtual Threads, Sequenced Collections |
| Java 22 | 2024 | Non-LTS | Foreign Function & Memory API définitive |
| Java 23 | 2024 | Non-LTS | Commentaires Javadoc en Markdown |
| Java 24 | 2025 | Non-LTS | Class-File API, Stream Gatherers |
| Java 25 | 2025 | LTS | Compact Source Files, Scoped Values |
| Java 26 | 2026 | Non-LTS | Évolutions des API et de la JVM |
| Java 27 | 2026 | Non-LTS | Nouvelle version semestrielle du JDK |

Les fonctionnalités en *preview* requièrent l'activation explicite des fonctionnalités expérimentales et ne doivent pas être confondues avec les fonctionnalités finalisées.

Références des changements précis de chaque version : [OpenJDK JEPs](https://openjdk.org/jeps/0), [OpenJDK Projects](https://openjdk.org/projects/jdk/) et [Oracle Java Support Roadmap](https://www.oracle.com/java/technologies/java-se-support-roadmap.html).

## 4. Exemples d'évolution du langage

### Java 8 : lambdas et streams

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> medias = Arrays.asList("Alien", "Dune", "Interstellar");
        medias.stream()
              .filter(title -> title.length() > 4)
              .forEach(System.out::println);
    }
}
```

### Java 10 : inférence du type local

```java
var title = "Interstellar";
var year = 2014;
```

`var` conserve un typage statique : le compilateur déduit le type.

### Java 14 : switch expression

```java
String category = switch (year) {
    case 1979 -> "Alien";
    case 2014 -> "Interstellar";
    default -> "Inconnu";
};
```

### Java 16 : record

```java
public record Media(String title, int year) {
}
```

### Java 21 : virtual threads

```java
Thread.startVirtualThread(() -> {
    System.out.println("Traitement du média");
});
```

Les virtual threads sont particulièrement utiles pour un grand nombre d'opérations concurrentes bloquantes (notamment réseau et I/O) ; ils n'accélèrent pas automatiquement les calculs CPU.

## 5. Historique des outils de l'écosystème

| Outil | Début approximatif | Utilisation |
|---|---|---|
| JUnit | 1997 | Tests unitaires |
| Apache Tomcat | 1999 | Conteneur Servlet |
| Apache Ant | 2000 | Automatisation des builds |
| IntelliJ IDEA | 2001 | IDE Java |
| Eclipse IDE | 2001 | IDE Java |
| Apache Maven | 2002 | Dépendances et cycle de build |
| Spring Framework | 2003/2004 | Injection de dépendances, infrastructure applicative |
| Gradle | 2007 | Build déclaratif et programmable |
| Jenkins | 2011 | Intégration et livraison continues |
| Spring Boot | 2014 | Démarrage simplifié des applications Spring |
| Jakarta EE | 2019 | Évolution des spécifications Java EE |

Les dates correspondent aux premières apparitions du projet ou aux premières versions publiques, selon les outils.

## 6. Apache Maven

Maven pilote la compilation, les tests, le packaging et les dépendances à travers un fichier `pom.xml`.

```text
Projet
├── pom.xml
└── src
    ├── main/java
    └── test/java
```

Exemple minimal pour un projet Java 8 avec Maven 3 :

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.ganatan</groupId>
    <artifactId>media</artifactId>
    <version>1.0.0</version>
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
</project>
```

Avec un JDK 9 ou plus récent et un plugin de compilation compatible, préférer `maven.compiler.release=8` pour contrôler également les API disponibles à la compilation.

```bash
mvn -version
mvn compile
mvn test
mvn package
mvn clean package
```

| Génération | Début | Évolution |
|---|---|---|
| Maven 1 | 2002 | Première génération |
| Maven 2 | 2005 | Modèle POM moderne |
| Maven 3 | 2010 | Architecture et performances du build |
| Maven 4 | Branche ultérieure | Évolutions du modèle et du moteur, vérifier le statut de sortie |

Pour les prérequis précis d'une version : [documentation Maven](https://maven.apache.org/docs/history.html).

## 7. Apache Tomcat

Tomcat héberge les applications web basées sur Servlet et JSP. Il n'est pas requis pour exécuter un programme Java classique.

```text
Navigateur
    |
    | HTTP
    v
Apache Tomcat
    |
    v
Servlet
    |
    v
Service Java
    |
    v
Réponse HTTP
```

| Version de Tomcat | Java minimum | API Servlet |
|---|---|---|
| 8.5 | 7 | Java EE / javax.servlet |
| 9.0 | 8 | Java EE 8 / javax.servlet |
| 10.0 | 8 | Jakarta Servlet 5 / jakarta.servlet |
| 10.1 | 11 | Jakarta Servlet 6 |
| 11.0 | 17 | Jakarta Servlet 6.1 |

Vérifier les versions encore maintenues : [Tomcat Which Version](https://tomcat.apache.org/whichversion.html).

Rupture importante à partir de Tomcat 10 :

```java
import javax.servlet.http.HttpServlet;
```

devient :

```java
import jakarta.servlet.http.HttpServlet;
```

Le passage de `javax.*` à `jakarta.*` nécessite souvent une adaptation du code et des dépendances.

## 8. Spring et Spring Boot

Spring Framework fournit des composants pour développer des applications Java. Spring Boot automatise de nombreuses configurations et peut embarquer un serveur web.

| Famille | Repère historique |
|---|---|
| Spring Framework 1 | 2004 |
| Spring Framework 5 | 2017, WebFlux |
| Spring Boot 1 | 2014 |
| Spring Boot 2 | 2018, génération compatible Java 8 |
| Spring Boot 3 | 2022, Java 17 minimum, Jakarta |
| Spring Boot 4 | 2025, génération Spring Framework 7 |

```text
Application Spring Boot
    |
    +-- Spring MVC
    +-- Tomcat embarqué (selon dépendances)
    +-- Services
```

```bash
java -jar application.jar
```

## 9. Java sans Maven : compilation et packaging

Fichier `Main.java` :

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Interstellar");
    }
}
```

Compilation et exécution :

```bash
javac Main.java
java Main
```

Création d'un JAR exécutable :

```bash
jar cfe app.jar Main Main.class
java -jar app.jar
```

Sur un projet plus important, utiliser un répertoire `build`, plusieurs classes et un classpath adapté.

| Format | Usage |
|---|---|
| JAR | Bibliothèque ou application Java |
| WAR | Application web déployable dans un conteneur Servlet |

Un JAR **ne contient pas automatiquement toutes les bibliothèques externes** : un fat JAR, un uber JAR ou une distribution de dépendances peut être nécessaire.

## 10. Les outils d'un projet professionnel

| Catégorie | Outils courants |
|---|---|
| IDE | IntelliJ IDEA, Eclipse, NetBeans |
| Build | javac, jar, Maven, Gradle, Ant |
| Tests | JUnit, Mockito, TestNG |
| Serveurs | Tomcat, Jetty, Undertow |
| Frameworks | Spring, Spring Boot, Jakarta EE |
| Qualité | SonarQube, Checkstyle, SpotBugs |
| CI/CD | Jenkins, GitLab CI, GitHub Actions |
| Artefacts | Nexus Repository, Artifactory |
| Données | JDBC, Hibernate, JPA |
| Observabilité | Prometheus, Grafana |
| Conteneurs | Docker, Podman |

```text
IntelliJ IDEA
     |
     v
Git / GitLab
     |
     v
Maven ou Gradle
     |
     +-- Compilation
     +-- Tests JUnit
     +-- JAR / WAR
     |
     v
Jenkins ou GitLab CI
     |
     v
Nexus / Artifactory
     |
     v
Serveur Linux
     |
     +-- JVM
     +-- Tomcat (si WAR)
     |
     v
Application
```

Cette chaîne est un exemple, pas une obligation : un programme Java peut être construit exclusivement avec `javac` et `jar`.

## 11. Choisir sa version Java

| Situation | Choix habituel |
|---|---|
| Maintenance d'une application existante en Java 8 | Conserver Java 8 si la migration n'est pas possible |
| Modernisation d'une application d'entreprise | Java 17 ou 21 LTS selon les dépendances |
| Nouveau projet | Examiner Java 21 ou 25 LTS et leur support éditeur |
| Tester les nouveautés | Java 27 |
| Bibliothèque destinée à plusieurs programmes | Compiler pour le plus ancien JDK client pris en charge |

Avec un JDK moderne :

```bash
javac --release 8 Main.java
```

`--release 8` fixe la cible de compilation et la surface des API standard disponibles, sous réserve que le JDK utilisé prenne encore cette cible en charge.

## 12. Sources officielles

- [OpenJDK](https://openjdk.org/)
- [JEP Index](https://openjdk.org/jeps/0)
- [Support Java Oracle](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)
- [Apache Maven](https://maven.apache.org/)
- [Historique Maven](https://maven.apache.org/docs/history.html)
- [Apache Tomcat](https://tomcat.apache.org/)
- [Compatibilité Tomcat](https://tomcat.apache.org/whichversion.html)
- [Spring](https://spring.io/)
- [JUnit](https://junit.org/)
