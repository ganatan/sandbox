
package com.ganatan.modules.person;

import java.util.List;

public class PersonService {

    private final PersonRepository repository;

    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<Person> getItems() {
        return repository.getItems();
    }
}
