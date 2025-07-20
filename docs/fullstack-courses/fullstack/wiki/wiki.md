
# Notion de snapshot avec versions springboot

  Versions disponibles de springboot
    4.0.0 (SNAPSHOT)
    3.5.4 (SNAPSHOT)
    3.5.3
    3.4.8 (SNAPSHOT)
    3.4.7


    3.5.3 (STABLE – recommandée)

    (SNAPSHOT)
      Versions de développement non finalisées

    SNAPSHOT : instantané

# Différence entre war et jar    

  - JAR
    Usage : Applications Java standards (librairies, CLI, desktop, services)
    Contient : .class, META-INF/, fichiers de config, ressources
    Format exécutable possible (avec Main-Class dans MANIFEST.MF)
    Peut être lancé avec java -jar mon-app.jar
    Pas de structure Web (pas de WEB-INF, etc.)
    Typiquement utilisé pour :
      Programmes Java en ligne de commande
      Librairies partagées
      Microservices type Spring Boot (auto-exécutables)

  - WAR    
    Usage : Applications web Java à déployer sur un serveur web Java (Tomcat, Jetty, etc.)
    Structure imposée :
    Doit être déployé dans un conteneur web (Tomcat, WildFly…)
    Le serveur charge le contexte web, les servlets, les filtres…
    Typiquement utilisé pour :
      Applications Java Web avec JSP, Servlets, Spring MVC (sans Spring Boot)
      Déploiement sur serveur partagé (architecture plus classique)

# Annotations      

  En Java, une annotation Spring est une métadonnée qui permet à Spring de comprendre comment gérer un élément du code (classe, méthode, champ…). Elle sert à activer un comportement automatique, sans configuration XML.

  @RestController
  public class ApiController {}

      Indique à Spring que cette classe est un contrôleur REST → toutes les méthodes retournent des données (JSON, String, etc.)

# modificateurs d'accès en Java 
  private
  🔒 Accessible uniquement dans la classe elle-même

  public
  🌍 Accessible de partout (même en dehors du package)

  protected
  🛡️ Accessible :
    dans la même classe
    dans les sous-classes (même en dehors du package)
    dans le même package


# JPA
  JPA signifie Java Persistence API. 
  C'est une spécification Java standard qui définit comment mapper des objets Java (entities) vers des tables d’une base relationnelle.

  JPA = API de mapping objet-relationnel (ORM) standardisée.


# Hibernate

  Hibernate est un ORM (Object-Relational Mapping) pour Java.
  Il permet de mapper des objets Java (tes @Entity) vers des tables SQL, sans écrire toi-même les requêtes SQL.
  En backend moderne, Hibernate est la brique technique derrière Spring Data JPA.


  # === Hibernate / JPA ===
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true

  par defaut c'est la base de données H2

  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  Tu importes Hibernate automatiquement.



# Jakarta

Technologie	    Version	        Date    Namespace	        API Servlet	      Versions Java	  Tomcat version

Java EE	        Java EE 5	      2006	  javax.*	          Servlet 2.5	      Java 5, 6	      Tomcat 6.x
Java EE	        Java EE 6	      2009	  javax.*	          Servlet 3.0	      Java 6, 7	      Tomcat 7.x
Java EE	        Java EE 7	      2013	  javax.*	          Servlet 3.1	      Java 7, 8	      Tomcat 8.x
Java EE	        Java EE 8	      2017	  javax.*	          Servlet 4.0	      Java 8, 11	    Tomcat 9.x
Jakarta EE	    Jakarta EE 8	  2019	  javax.* (legacy)	Servlet 4.0	      Java 8, 11	    Tomcat 9.x
Jakarta EE	    Jakarta EE 9	  2020	  jakarta.*	        Servlet 5.0	      Java 11	        Tomcat 10.0.x
Jakarta EE	    Jakarta EE 10	  2022	  jakarta.*	        Servlet 6.0	      Java 11, 17	    Tomcat 10.1.x
Jakarta EE	    Jakarta EE 11	  2024	  jakarta.*	        Servlet 6.0+	    Java 17, 21	    Tomcat 11.x


# Architecture Appli Java API 
  backend-java-21/
  ├── src/
  │   ├── main/
  │   │   ├── java/
  │   │   │   └── com/ganatan/modules/person/
  │   │   │       ├── Person.java              # Modèle
  │   │   │       ├── PersonController.java    # REST Controller
  │   │   │       ├── PersonService.java       # Logique métier
  │   │   │       └── PersonRepository.java    # Accès données
  │   │   └── resources/
  │   │       └── application.properties       # Config
  │   └── test/java/                           # Tests
  ├── target/                                  # Build
  └── pom.xml


# Comparatif

Aspect	              Java pur	          Spring	            Spring Boot
Lignes pom.xml	      ~35	                ~45	                ~25
Configuration	        100% manuelle	      70% manuelle	      5% manuelle (starters)
Gestion JSON	        Jakarta JSON-P	    Jackson (manuel)	  Jackson (auto géré)
Serveur	              Tomcat externe	    Tomcat externe	    Tomcat embarqué
Démarrage	            Déploiement WAR	    Déploiement WAR	    java -jar direct


# Architecture Windows
  Windows x86     Architecture 32 bits      Systèmes et applications 32 bits
  Windows x64     Architecture 64 bits	    Systèmes et applications 64 bits


# Compatibilité Java Tomcat

Tomcat	      API Servlet	            Java requis	      Spring MVC type	                      Version Spring MVC

Tomcat 8.x	  javax.servlet 3.1	      Java 7 / 8	      Spring MVC classique (javax.servlet)	Spring 4.x / 5.x	
Tomcat 9.x	  javax.servlet 4.0	      Java 8	          Spring MVC classique (javax.servlet)	Spring 5.x
Tomcat 10.x	  jakarta.servlet 5.0	    Java 11	          Spring MVC Jakarta (jakarta.servlet)	Spring 6.x
Tomcat 11.x	  jakarta.servlet 6.0	    Java 11	          Spring MVC Jakarta (jakarta.servlet)