
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