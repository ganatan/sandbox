web.xml

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
  </web-app>


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


  Que faire pour que le link About fonctionne

