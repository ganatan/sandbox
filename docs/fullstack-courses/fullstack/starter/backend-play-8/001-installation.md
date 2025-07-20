
# Installation

  Installation SBT 

  SBT (Simple Build Tool) est l’équivalent de Maven ou Gradle, mais pour l’écosystème Play Framework et Scala.
  Dans un projet Play, SBT est obligatoire : tu ne peux pas utiliser Maven ou Gradle.

    https://www.scala-sbt.org/download/
  
  Windows :
    Télécharger : https://github.com/sbt/sbt/releases/download/v1.9.8/sbt-1.9.8.msi
    Installer le .msi

      sbt-1.10.11.msi

      sbt -version
        sbt runner version: 1.10.11

# Liste des commandes      


  Commande	            Utilisation
    sbt compile	        Compiler le projet
    sbt run	            Démarrer le serveur Play intégré
    sbt test	          Lancer les tests
    sbt eclipse	        Préparer le projet pour Eclipse
    sbt clean	          Nettoyer les fichiers compilés
    sbt package	        Générer le fichier .jar    

# Activation Java 8
  
  Varaibles d'environnement

    par defaut ce sera donc
      C:\Program Files (x86)\Common Files\Oracle\Java\java8path\java.exe
      C:\Program Files\Common Files\Oracle\Java\javapath\java.exe

  Tester java -version      

# Creation du projet play
  
  sbt new playframework/play-java-seed.g8
  indiquer
    name          backend-play-8
    package       com.ganatan


  sbt run    
   http://localhost:9000
    

# Compatibilites sbt / Java
  
  Version SBT	          Compatibilité Java
  
  1.9.x – 1.11.x	      Java 8 → Java 21
  1.6.x – 1.8.x	        Java 8 → Java 17
  1.3.x – 1.5.x	        Java 8 → Java 11
  1.2.x et inférieur	  Java 8 seulement    

# Compatibilites Play / Java
  
  Play Framework	Version Scala	    Java Minimum
  
  2.9.x	          2.13.x	          Java 11	Version actuelle, Java 8 incompatible
  2.8.x	          2.13.x	          Java 8	Dernière version supportant Java 8
  2.7.x	          2.12.x	          Java 8	Version stable, recommandée pour Java 8
  2.6.x	          2.12.x	          Java 8	Ancienne version (fin de support)
  2.5.x et avant	2.11.x	          Java 8	Très ancienne (déconseillée)  