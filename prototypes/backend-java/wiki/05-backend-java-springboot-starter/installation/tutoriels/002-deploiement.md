# Déploiement

mvn clean package

java -jar target/backend-springboot-0.0.1-SNAPSHOT.jar


# Modifier le port du serveur HTTP
Par défaut, Spring Boot utilise port 8080.
Tu peux le changer dans application.properties :

📂 src/main/resources/application.properties

properties
  server.port=9000
  
  L'API sera accessible sur http://localhost:9000/persons.



Les fichiers

- BackendJavaSpringbootApplication.java

package com.ganatan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendJavaSpringbootApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendJavaSpringbootApplication.class, args);
    }
}


- PersonController.java

package com.ganatan.controller;

import com.ganatan.model.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {
    @GetMapping
    public List<Person> getPersons() {
        return List.of(
            new Person(1, "Steven Spielberg", "Cincinnati"),
            new Person(2, "Martin Scorsese", "New York"),
            new Person(3, "Quentin Tarantino", "Knoxville"),
            new Person(4, "Christopher Nolan", "London"),
            new Person(5, "James Cameron", "Kapuskasing"),
            new Person(6, "Tim Burton", "Burbank"),
            new Person(7, "Francis Ford Coppola", "Detroit"),
            new Person(8, "David Lynch", "Missoula"),
            new Person(9, "Paul Thomas Anderson", "Studio City"),
            new Person(10, "Wes Anderson", "Houston"),
            new Person(11, "Clint Eastwood", "San Francisco"),
            new Person(12, "Brian De Palma", "Newark")
        );
    }
}


- Person.java

package com.ganatan.controller;

import com.ganatan.model.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {
    @GetMapping
    public List<Person> getPersons() {
        return List.of(
            new Person(1, "Steven Spielberg", "Cincinnati"),
            new Person(2, "Martin Scorsese", "New York"),
            new Person(3, "Quentin Tarantino", "Knoxville"),
            new Person(4, "Christopher Nolan", "London"),
            new Person(5, "James Cameron", "Kapuskasing"),
            new Person(6, "Tim Burton", "Burbank"),
            new Person(7, "Francis Ford Coppola", "Detroit"),
            new Person(8, "David Lynch", "Missoula"),
            new Person(9, "Paul Thomas Anderson", "Studio City"),
            new Person(10, "Wes Anderson", "Houston"),
            new Person(11, "Clint Eastwood", "San Francisco"),
            new Person(12, "Brian De Palma", "Newark")
        );
    }
}

# pour voir le resultat dans eclipse

Utiliser l'onglet "Spring Boot Dashboard" (Recommandé)
Ouvre l'onglet → Window > Show View > Other > Spring > Spring Boot Dashboard
Sélectionne ton projet (backend-java-springboot)
Lance l'application en cliquant sur ▶
Clique sur l'URL affichée (http://localhost:9000/persons)

2️⃣ Utiliser l'onglet "Web Browser" dans Eclipse
Ouvre l'onglet Web → Window > Show View > Other > General > Internal Web Browser
Entre l'URL → http://localhost:9000/persons
Valide pour voir la réponse JSON.



# Execution
Exécuter manuellement en tant qu'application Spring Boot
Si le problème persiste :

Fais un clic droit sur BackendJavaSpringbootApplication.java.
Sélectionne Run As > Spring Boot App.