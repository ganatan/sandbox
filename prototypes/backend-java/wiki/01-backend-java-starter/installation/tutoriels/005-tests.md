
mvn -Dtest=PersonControllerTest test
mvn -Dtest=CityControllerTest test
mvn -Dtest=RootControllerTest test


  mvn clean
  mvn compile
  mvn test
  
  mvn clean test jacoco:report

