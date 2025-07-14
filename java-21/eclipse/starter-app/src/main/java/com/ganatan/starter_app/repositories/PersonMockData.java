package com.ganatan.starter_app.repositories;

import com.ganatan.starter_app.entities.Person;

import java.util.List;

public class PersonMockData {

    public static List<Person> getItems() {
        return List.of(
            new Person(1L, "Steven Spielberg", "Cincinnati"),
            new Person(2L, "Ridley Scott", "South Shields"),
            new Person(3L, "Christopher Nolan", "London"),
            new Person(4L, "Denis Villeneuve", "Bécancour")
        );
    }
}
