package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@ConditionalOnProperty(name = "db.client", havingValue = "mock")
public class PersonRepositoryMock implements PersonRepositoryInterface {

	private final List<Person> persons = List.of(
		    new Person("Steven Spielberg"),
		    new Person( "Ridley Scott"),
		    new Person( "Christopher Nolan"),
		    new Person( "Denis Villeneuve")
		);

    @Override
    public List<Person> findAll() {
        return persons;
    }
}



//package com.ganatan.starter_app.repositories;
//
//import com.ganatan.starter_app.entities.Person;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Repository;
//import jakarta.annotation.PostConstruct;
//import java.io.IOException;
//import java.util.*;
//
//@Repository
//@ConditionalOnProperty(name = "db.client", havingValue = "mock")
//public class PersonRepositoryMock implements PersonRepositoryInterface {
//   
//   private List<Person> persons = new ArrayList<>();
//   
//   @PostConstruct
//   public void init() {
//       loadMockData();
//       System.out.println("📁 MOCK REPOSITORY: " + persons.size() + " personnes chargées");
//   }
//   
//   private void loadMockData() {
//       try {
//           ObjectMapper mapper = new ObjectMapper();
//           ClassPathResource resource = new ClassPathResource("data/mock/persons.json");
//           
//           if (resource.exists()) {
//               persons = mapper.readValue(resource.getInputStream(), 
//                                        new TypeReference<List<Person>>() {});
//               System.out.println("📁 Fichier JSON chargé avec succès");
//           } else {
//               System.out.println("📁 Fichier persons.json introuvable, création de données par défaut");
//               createDefaultData();
//           }
//       } catch (IOException e) {
//           System.err.println("❌ Erreur JSON: " + e.getMessage());
//           createDefaultData();
//       }
//   }
//   
//   private void createDefaultData() {
//       persons.clear();
//       
//       Person person1 = new Person();
//       person1.setId(1L);
//       person1.setName("John Doe");
//       persons.add(person1);
//       
//       Person person2 = new Person();
//       person2.setId(2L);
//       person2.setName("Jane Smith");
//       persons.add(person2);
//       
//       Person person3 = new Person();
//       person3.setId(3L);
//       person3.setName("Bob Johnson");
//       persons.add(person3);
//       
//       System.out.println("📁 Données par défaut créées: " + persons.size() + " personnes");
//   }
//   
//   @Override
//   public List<Person> findAll() {
//       return new ArrayList<>(persons);
//   }
//}