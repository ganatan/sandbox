# Installation jmeter
  
  https://jmeter.apache.org/download_jmeter.cgi

  apache-jmeter-5.6.3.zip

  dezipper dans 
    D:\hal\apache-jmeter-5.6.3

    Dans le dossier bin/ :
    Sous Windows : double-clique sur jmeter.bat.

# Creation d'un test Plan

  Clique droit sur Test Plan

  Add
    Threads (Users)
      Thread Group

    Number of Threads (users) : 50 (par exemple)
    Ramp-Up Period (seconds) : 10
    Loop Count : 10 (ou Forever si tu veux une boucle infinie)      

  Add
    Sampler
      HTTP Request
        Dans l’onglet HTTP Request :
          Server Name or IP : localhost
          Port Number : 8080
          Method : GET
          Path : /backend-java/persons

Clique droit sur Thread Group
  Add
    Listener
      Ajoute un ou plusieurs :
        View Results Tree
        Summary Report
        Graph Results (facultatif)



# Sauvegarde
  Clic droit

  Dans Summary Report ou un autre Listener :

    Coche Write results to file.
    Renseigne un chemin de fichier .jtl :

      D:\Chendra\15-jmeter\backend-java-results.jtl

  Modifier les variables d'environnement
    Aller dans le repertoire du fichier jtl
  
  Creer le rapport HTML
    jmeter -g backend-java-results.jtl -o rapport-html/



# Dockerisation 

  docker run --rm -v %cd%:/test -w /test justb4/jmeter \
  jmeter -n -t backend-test.jmx -l backend-results.jtl