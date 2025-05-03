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
    	System.out.println("00000000001:PersonController");
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
