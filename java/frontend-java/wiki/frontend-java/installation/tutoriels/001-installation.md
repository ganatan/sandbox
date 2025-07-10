# Creer un  frontend avec java


# Installer Tomcat
Tester Tomcat
  http://127.0.0.1:8080/

Installer un serveur Tomcat
  dans l'onglet
    Servers / create a new server
    Apache / Tomcat 11 / Next  
    Browse / D:\hal\Tomcat 11.0
    double click sur server
      Tomcat admin Port : 8088
      HTTP/1.1 : 8089
    clic droit
      clean
      start      


  Tomcat 10 et 11 utilisent Jakarta EE au lieu de Java EE
  ce qui favorise les annotations @WebServlet au lieu du web.xml.      

# Creer le projet
  
  File / New / Project / Web / Dynamic Web Project

  On indique un nom arbitraire
  frontendjava

  selectionner 
    Dynamic Web Module 5.0 (6.1 pour Jakarta 11 pas compatible avec Tomcat)

  Va dans Window → Preferences → Install/Update → Available Software Sites.
    Cherche l'entrée https://download.jboss.org/jbosstools/photon/stable/updates/.
    Désactive-la ou supprime-la.


  on coche la case
  Generate web.xml deployment descriptor

  Creer index.HTML dans Webapp    


Creer un server
  Double Clic
    Tomcat Admin Port     8081
    HTTP/1.1              8082


clic sur le projet   !!!!!!!!!!!!!!!!!!!!!!!!!!!!! obligatoire
  Run as server
    Select de la ligne
    Always


Ajouter Jakarta Servlet API via le serveur Tomcat dans Eclipse
  Vérifier si Tomcat est bien configuré dans Eclipse :
    Aller dans Window > Preferences > Server > Runtime Environments.
    Vérifier si Apache Tomcat 11 est bien ajouté.
    Sinon, cliquer sur "Add...", sélectionner Apache Tomcat 11, et indiquer le chemin d'installation de Tomcat (C:\apache-tomcat-11.0.xx\ sous Windows).
    Cliquer sur "Finish".
    Associer Tomcat au projet :

Clic droit sur le projet > Properties > Targeted Runtimes.
  Cocher Apache Tomcat 11.
  Cliquer sur "Apply and Close".



  Home.java

    package com.ganatan.apps;

    import java.io.IOException;
    import jakarta.servlet.ServletException;
    import jakarta.servlet.ServletOutputStream;
    import jakarta.servlet.annotation.WebServlet;
    import jakarta.servlet.http.HttpServlet;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;

    @WebServlet("/home")
    public class Home extends HttpServlet {
        private static final long serialVersionUID = 1L;

        protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
            res.setContentType("text/html");
            ServletOutputStream out = res.getOutputStream();
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Bonjour</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Home</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }


About.java

  package com.ganatan.apps;

  import java.io.IOException;
  import jakarta.servlet.ServletException;
  import jakarta.servlet.ServletOutputStream;
  import jakarta.servlet.annotation.WebServlet;
  import jakarta.servlet.http.HttpServlet;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;

  @WebServlet("/about")
  public class About extends HttpServlet {
      private static final long serialVersionUID = 1L;

      protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
          res.setContentType("text/html");
          ServletOutputStream out = res.getOutputStream();
          out.println("<!DOCTYPE html>");
          out.println("<html>");
          out.println("<head>");
          out.println("<title>Bonjour</title>");
          out.println("</head>");
          out.println("<body>");
          out.println("<h1>About</h1>");
          out.println("</body>");
          out.println("</html>");
      }
  }


  Home.java

    package com.ganatan.apps;

    import java.io.IOException;
    import jakarta.servlet.ServletException;
    import jakarta.servlet.ServletOutputStream;
    import jakarta.servlet.annotation.WebServlet;
    import jakarta.servlet.http.HttpServlet;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;

    @WebServlet("/home")
    public class Home extends HttpServlet {
        private static final long serialVersionUID = 1L;

        protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
            res.setContentType("text/html");
            ServletOutputStream out = res.getOutputStream();
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Bonjour</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Home</h1>");

            String contextPath = req.getContextPath();
            String link = "<a href=\"" + contextPath + "/about\">About</a>";

            out.println(link);
            out.println("</body>");
            out.println("</html>");
        }
    }



Modifier Web.xml

  <?xml version="1.0" encoding="UTF-8"?>
  <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="https://jakarta.ee/xml/ns/jakartaee"
    xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
    id="WebApp_ID" version="6.0">
    <display-name>frontendjava</display-name>
    <welcome-file-list>
      <welcome-file>index.html</welcome-file>
      <welcome-file>index.jsp</welcome-file>
      <welcome-file>index.htm</welcome-file>
      <welcome-file>default.html</welcome-file>
      <welcome-file>default.jsp</welcome-file>
      <welcome-file>default.htm</welcome-file>
    </welcome-file-list>

    <servlet>
      <servlet-name>Home</servlet-name>
      <servlet-class>com.ganatan.apps.Home</servlet-class>
    </servlet>
    <servlet>
      <servlet-name>About</servlet-name>
      <servlet-class>com.ganatan.apps.About</servlet-class>
    </servlet>
    <servlet-mapping>
      <servlet-name>Home</servlet-name>
      <url-pattern>/</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
      <servlet-name>About</servlet-name>
      <url-pattern>/About</url-pattern>
    </servlet-mapping>
    
    
    
    
  </web-app>