package com.ganatan.modules.person;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    @GetMapping("/persons")
    public List<Person> getPersons() {
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
