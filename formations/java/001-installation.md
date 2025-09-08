
# Installation des outils

  JdK
  Eclipse
  Maven
  Tomcat

# Installation du JDK

  Oracle JDK version 21 LTS

  https://www.oracle.com/java/technologies/downloads/#java21
  https://www.oracle.com/java/technologies/downloads/#jdk21-windows

  jdk-21_windows-x64_bin.msi

  Installer dans
    D:\hal\Java\jdk-21

  Version jdk 21.0.8    

  Tester
    java -version
    javac -version

# Installation d'Eclipse

  https://www.eclipse.org/downloads/
  https://www.eclipse.org/downloads/packages/

  Telecharger version
    Eclipse IDE for Enterprise Java and Web Developers

  unzip eclipse-jee-2025-06-R-win32-x86_64.zip dans d:\Hal\eclipse

  Decompresser
  - Utiliser eclipse.exe

  - Indiquer le workspace
    D:\chendra\10-eclipse\workspace

  - Selection option
    Exclude Eclipse IDE    

  - Selection du settings

      Aller dans

      Windows / Preferences / Maven / User Settings
        User Settings / Browse

      Indiquer un fichier settings.xml personnalisé
        (récupéré modèle dans l'installation de maven D:\hal\apache-maven-3.9.9\conf)

  - Changer les preferences    
    Concernant jboss

      windows / Preferences
        Install / Update  
          Decocher JBoss

# Installation Maven
  
  https://maven.apache.org/download.cgi

  apache-maven-3.9.11-bin.zip
    Decompresser dans 
    D:\hal\apache-maven-3.9.11\bin

  Rajouter le Path
    dans Variables d'environnement
    
    D:\hal\apache-maven-3.9.11\bin
    Tester 
      mvn -version

# Installation Tomcat

  Site web
    https://tomcat.apache.org/
  
    Version : Windows Service Installer
      apache-tomcat-11.0.11.exe
  
      D:\hal\Tomcat 11.0

  2 icones dans
    C:\Users\chend\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Apache Tomcat 11.0 Tomcat11


    Configure Tomcat

    Monitor Tomcat

  Lancer
    http://localhost:8080/
