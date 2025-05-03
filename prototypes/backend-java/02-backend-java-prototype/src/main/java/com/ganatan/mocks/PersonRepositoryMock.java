package com.ganatan.mocks;

import java.util.List;

import com.ganatan.modules.person.Person;

import java.util.Arrays;

public class PersonRepositoryMock {
	public List<Person> getItems() {
		return Arrays.asList(
				new Person(1, "Steven Spielberg", "Cincinnati"),
                new Person(1, "Ridley Scott", "South Shields"),
                new Person(1, "Christopher Nolan", "London"),
                new Person(1, "Denis Villeneuve", "Bécancour")
        );
    }
}
