
# Installation en local
  
  Site web
  https://tomcat.apache.org/
  
  D:\hal\Tomcat 11.0


  Lancer
    http://localhost:8080/

  Parametres connection
    D:\hal\tomcat-11.0.x\conf\tomcat-users.xml    

Version 9 et Version 11


<?xml version='1.0' encoding='cp1252'?>
<tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">

  <role rolename="manager-gui"/>
  <role rolename="admin-gui"/>
  <user username="admin" password="admin" roles="manager-gui,admin-gui"/>

</tomcat-users>
