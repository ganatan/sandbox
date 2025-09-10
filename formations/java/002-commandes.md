mvn versions:display-dependency-updates
mvn versions:display-plugin-updates

mvn checkstyle:check

mvn clean test
mvn jacoco:report

target/site/jacoco/index.html