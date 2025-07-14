package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class PersonRepository {
    
    @Value("${db.client:mock}")
    private String dbClient;
    
    public List<Person> findAll() {
        System.out.println("[ganatan] PersonRepository findAll:");
        System.out.println("[ganatan] PersonRepository dbClient:" + dbClient);
        
        return switch (dbClient) {
            case "mock" -> List.of(
                new Person(1L, "Steven Spielberg (MOCK)"),
                new Person(2L, "Christopher Nolan (MOCK)"),
                new Person(3L, "Ridley Scott (MOCK)")
            );
            case "mysql" -> List.of(
                new Person(1L, "Steven Spielberg (MYSQL)"),
                new Person(2L, "Christopher Nolan (MYSQL)"),
                new Person(3L, "Ridley Scott (MYSQL)")
            );
            case "pg" -> List.of(
                new Person(1L, "Steven Spielberg (POSTGRESQL)"),
                new Person(2L, "Christopher Nolan (POSTGRESQL)"),
                new Person(3L, "Ridley Scott (POSTGRESQL)")
            );
            default -> List.of(new Person(0L, "Unknown database client: " + dbClient));
        };
    }
}



//package com.ganatan.starter_app.repositories;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public class PersonRepository {
//
//	@Value("${db.client:mock}")
//	private String dbClient;
//
//	public List<String> findAll() {
//		System.out.println("[ganatan] PersonRepository findAll:");
//		System.out.println("[ganatan] PersonRepository dbClient:" + dbClient);
//
//		return switch (dbClient) {
//		case "mock" -> List.of("Steven Spielberg (MOCK)", "Christopher Nolan (MOCK)", "Ridley Scott (MOCK)");
//		case "mysql" -> List.of("Steven Spielberg (MYSQL)", "Christopher Nolan (MYSQL)", "Ridley Scott (MYSQL)");
//		case "pg" ->
//			List.of("Steven Spielberg (POSTGRESQL)", "Christopher Nolan (POSTGRESQL)", "Ridley Scott (POSTGRESQL)");
//		default -> List.of("Unknown database client: " + dbClient);
//		};
//	}
//
//}
