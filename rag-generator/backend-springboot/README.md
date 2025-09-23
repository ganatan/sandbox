# backend-springboot

Spring Boot application packaged as a **JAR**, with **Checkstyle**, **unit tests**, **code coverage**, and **Maven build**.

---

## 📊 Dependency Updates

Check for outdated dependencies and plugins:

```bash
mvn versions:display-dependency-updates
mvn versions:display-plugin-updates
```

---

## 🔧 Lint (Static Analysis)

Run Java static code analysis with **Checkstyle**:

```bash
mvn checkstyle:check
```

⛔ The build will fail if the code does not comply with the rules defined in `checkstyle.xml`.

---

## 🧪 Unit Tests & Coverage

Run unit tests and generate a **JaCoCo coverage report**:

```bash
mvn clean test
mvn jacoco:report
```

Coverage report available at:

```
target/site/jacoco/index.html
```

---

## 🏗️ Build

Compile, run tests, and package the application:

```bash
mvn clean install
```

Generates the artifact:

```
target/backend-springboot-1.0.0.jar
```

---

## 🚀 Run Application

Run the application locally on port `8080`:

```bash
mvn spring-boot:run
```

Or directly with Java:

```bash
java -jar target/backend-springboot-1.0.0.jar
```

Access at:

```
http://localhost:8080
```

---

## 📦 Maven Commands

```bash
mvn clean                  # clean target directory
mvn compile                # compile sources
mvn test                   # run tests
mvn package                # build the artifact
mvn install                # install to local repository
mvn checkstyle:check       # run static analysis
mvn dependency:tree        # view dependency tree
mvn spring-boot:run        # run Spring Boot app
```
