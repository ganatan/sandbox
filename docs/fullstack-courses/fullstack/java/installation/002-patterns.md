
# Pattern
  
  Controller / Service / Repository


		  <dependency>
		        <groupId>org.springframework.boot</groupId>
		        <artifactId>spring-boot-starter-data-jpa</artifactId>
		    </dependency>
		
		    <dependency>
		        <groupId>com.h2database</groupId>
		        <artifactId>h2</artifactId>
		        <scope>runtime</scope>
		    </dependency>

  # Hibernate

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    Tu importes Hibernate automatiquement.

    # === Hibernate / JPA ===
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true

    # pom.xml pour les database

      <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
      </dependency>		    


			<dependency>
			    <groupId>com.mysql</groupId>
			    <artifactId>mysql-connector-j</artifactId>
			    <version>9.3.0</version>
			</dependency>
