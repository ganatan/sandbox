# Executions des tests
  mvn -Dtest=PersonControllerTest test
  mvn -Dtest=CityControllerTest test
  mvn -Dtest=RootControllerTest test
  mvn -Dtest=GenerateProjectStructureTest test

  mvn clean
  mvn compile
  mvn test
  
  mvn clean test jacoco:report

