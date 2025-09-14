
modifier dans pom.xml

  <build>
    <finalName>backend-java-prototype</finalName>


mvn clean package

on execute

java -jar target/backend-java-prototype.war


ca marche pas car

Un .war (Web Application Archive) n’est pas exécutable directement avec java -jar.
Il doit être déployé dans un conteneur web Java comme :

deployer dans
  D:\hal\Tomcat 11.0\webapps

Lancer tomcat

http://localhost:8089/backend-java-prototype/persons