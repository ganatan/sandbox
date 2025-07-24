
# Implemenataiton de logs

  En Spring Boot : Logback (inclus par défaut)
  Spring Boot utilise SLF4J + Logback par défaut.
  C'est l'équivalent de Winston en node.js

# Code Ecriture du texte dans la console
  

  package com.ganatan.backend_java.controllers;

  import org.springframework.beans.factory.annotation.Value;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RestController;
  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;

  import java.util.LinkedHashMap;
  import java.util.Map;

  @RestController
  public class RootController {

    private static final Logger logger = LoggerFactory.getLogger(RootController.class);

    @Value("${app.version}")
    private String version;

    @Value("${app.name}")
    private String name;

    @Value("${db.client}")
    private String dbClient;

    @GetMapping("/")
    public Map<String, Object> index() {
      logger.info("Appel de l'endpoint GET /");
      logger.debug("Version: {}, App: {}, DB: {}", version, name, dbClient);

      Map<String, Object> data = new LinkedHashMap<>();
      data.put("version", version);
      data.put("status", "ok");
      data.put("app", name);
      data.put("dbClient", dbClient);

      Map<String, Object> response = new LinkedHashMap<>();
      response.put("success", true);
      response.put("data", data);

      return response;
    }
  }


# Code Ecriture du texte dans la console et dans un fichier de logs

  Creer un fichier
  
  src/main/resources/logback-spring.xml


  <configuration>

  <property name="LOG_PATH" value="logs"/>
  <property name="LOG_FILE" value="${LOG_PATH}/app.log"/>

  <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>${LOG_FILE}</file>
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${LOG_PATH}/app.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level %logger{36} - %msg%n</pattern>
    </encoder>
  </appender>

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%cyan(%d{HH:mm:ss.SSS}) %highlight(%-5level) %magenta([%thread]) %green(%logger{20}) - %msg%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
  </root>

</configuration>
