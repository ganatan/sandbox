dans pom.xml

<dependencies>
  <!-- Springdoc OpenAPI Swagger -->
  <dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.5.0</version>
  </dependency>
</dependencies>


application.properties


springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html


Acces

http://localhost:8080/swagger-ui.html

http://localhost:8080/api-docs