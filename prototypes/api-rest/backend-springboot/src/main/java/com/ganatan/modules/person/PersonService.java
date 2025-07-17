package com.ganatan.modules.person;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class PersonService {

    private final Map<Long, Person> repository = new HashMap<>();

    public PersonService() {
        repository.put(1L, new Person(1L, "Steven Spielberg"));
        repository.put(2L, new Person(2L, "Martin Scorsese"));
    }

    public List<Person> getItems() {
        return new ArrayList<>(repository.values());
    }

    public Person getItemById(Long id) {
        return repository.get(id);
    }

    public Person createItem(Person person) {
        if (repository.containsKey(person.getId())) {
            throw new IllegalStateException("ALREADY_EXISTS");
        }
        repository.put(person.getId(), person);
        return person;
    }

    public Person updateItem(Long id, Person newPerson) {
        if (!repository.containsKey(id)) {
            return null;
        }
        repository.put(id, new Person(id, newPerson.getName()));
        return repository.get(id);
    }

    public boolean deleteItem(Long id) {
        return repository.remove(id) != null;
    }
}

