
# Prompt

ok je pars sur war et tomcat
je veux le tester en local

j'ai ca
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		System.out.println("00000000001:BackendJava21SpringbootApplication");
		SpringApplication.run(App.class, args);
	}

}


package com.example.controller;

import com.example.model.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    @GetMapping("/persons")
    public List<Person> getAllPersons() {
    	System.out.println("00000000001:PersonController");
        return List.of(
            new Person("Christopher Nolan"),
            new Person("Quentin Tarantino"),
            new Person("Steven Spielberg"),
            new Person("Martin Scorsese"),
            new Person("Denis Villeneuve"),
            new Person("James Cameron"),
            new Person("Ridley Scott")
        );
    }
}

et

package com.example.controller;

import com.example.model.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    @GetMapping("/persons")
    public List<Person> getAllPersons() {
    	System.out.println("00000000001:PersonController");
        return List.of(
            new Person("Christopher Nolan"),
            new Person("Quentin Tarantino"),
            new Person("Steven Spielberg"),
            new Person("Martin Scorsese"),
            new Person("Denis Villeneuve"),
            new Person("James Cameron"),
            new Person("Ridley Scott")
        );
    }
}