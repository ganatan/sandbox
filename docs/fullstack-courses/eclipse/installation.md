
# Comment changer le workspace sur Eclipse

  File / Switch Workspace / Other

  par exemple
    D:\chendra\10-eclipse\workspace

# Changer le répertoire de Maven dans Eclipse

  Aller dans

    Windows / Preferences / Maven / User Settings
      User Settings / Browse

  Indiquer un fichier settings.xml personnalisé
    (récupéré modèle dans l'installation de maven D:\hal\apache-maven-3.9.9\conf)

  Exemple de fichier Modèle


  <?xml version="1.0" encoding="UTF-8"?>

  <settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
    <localRepository>D:/chendra/10-eclipse/maven/</localRepository>     
    <pluginGroups>
    </pluginGroups>
    <proxies>
    </proxies>
    <servers>
    </servers>
    <mirrors>
      <mirror>
        <id>maven-default-http-blocker</id>
        <mirrorOf>external:http:*</mirrorOf>
        <name>Pseudo repository to mirror external repositories initially using HTTP.</name>
        <url>http://0.0.0.0/</url>
        <blocked>true</blocked>
      </mirror>
    </mirrors>

    <profiles>
    </profiles>

  </settings>


# Format du texte

  Ctrl + Shift + F


# Commentaires
  Ctrl + Shift + / (pour commenter)
  Ctrl + Shift + \ (pour décommenter)  

# Tabulation 2 espaces
  Window → Preferences
  Java / Code Style  / Formatter
    Créer un nouveau profil :
      Clique sur "New..."
        Donne un nom, par ex. "Tabulation 2 espaces"
      Clique sur "OK"  

        Indentation
          Tab Size