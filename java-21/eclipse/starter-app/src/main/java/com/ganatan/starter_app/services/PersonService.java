// services/PersonService.java
package com.ganatan.starter_app.services;

import com.ganatan.starter_app.entities.Person;
import com.ganatan.starter_app.repositories.PersonRepositoryInterface;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonService {
    
    private final PersonRepositoryInterface repository;
    
    public PersonService(PersonRepositoryInterface repository) {
        this.repository = repository;
    }
    
    public List<Person> getAllPersons() {
    	System.out.println("00000000001");
        return repository.findAll();
    }
}