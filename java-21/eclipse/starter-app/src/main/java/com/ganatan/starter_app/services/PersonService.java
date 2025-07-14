package com.ganatan.starter_app.services;

import com.ganatan.starter_app.entities.Person;
import com.ganatan.starter_app.repositories.PersonRepositoryInterface;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonService {
    
    private final PersonRepositoryInterface repository;
    
    public PersonService(PersonRepositoryInterface repository) {
        System.out.println("[ganatan] PersonService Constructor:");
        this.repository = repository;
    }
    
    public List<Person> getItems() {
        System.out.println("[ganatan] PersonService getItems:");
        return repository.findAll();
    }
}


//package com.ganatan.starter_app.services;
//
//import com.ganatan.starter_app.entities.Person;
//import com.ganatan.starter_app.repositories.PersonRepository;
//import org.springframework.stereotype.Service;
//import java.util.List;
//
//@Service
//public class PersonService {
//    
//    private final PersonRepository repository;
//    
//    public PersonService(PersonRepository repository) {
//        System.out.println("[ganatan] PersonService Constructor:");
//        this.repository = repository;
//    }
//    
//    public List<Person> getItems() {
//        System.out.println("[ganatan] PersonService getItems:");
//        return repository.findAll();
//    }
//}
