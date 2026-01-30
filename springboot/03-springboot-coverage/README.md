# springboot-starter


---

## Configuration

### pom.xml

```xml
<artifactId>springboot-starter</artifactId>
<version>1.0.0</version>
<name>springboot-starter</name>
<description>Demo project for Spring Boot Starter</description>
<url/>
<licenses/>
```

### application.properties

```properties
server.port=3000
```


## Build


```bash
mvn clean install
```


```text
target/springboot-starter-1.0.0.jar
```

---

## Run coverage

mvn clean test

## Coverage report

HTML coverage report is available at:

target/site/jacoco/index.html



## Run

```bash
mvn spring-boot:run
```


```bash
java -jar target/springboot-starter-1.0.0.jar
```

Application URL:

```text
http://localhost:3000
```

---

## Maven commands 

```bash
mvn clean            
mvn compile          
mvn test             
mvn package          
mvn install          
mvn spring-boot:run       
```



## Available endpoints

```text
GET http://localhost:3000/
GET http://localhost:3000/customers