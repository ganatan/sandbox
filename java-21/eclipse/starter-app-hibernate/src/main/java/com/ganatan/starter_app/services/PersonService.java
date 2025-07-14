package com.ganatan.starter_app.services;

import com.ganatan.starter_app.entities.Person;
import org.springframework.aop.framework.AopProxyUtils;
import com.ganatan.starter_app.repositories.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repository;

    public PersonService(PersonRepository repository) {
    	System.out.println("00000000001:PersonService");
	    System.out.println(">> Repository injecté : " + repository.getClass().getName());
	    System.out.println("Implémentation réelle : " + AopProxyUtils.ultimateTargetClass(repository));
        this.repository = repository;
        
    }

    public List<Person> getItems() {
    	System.out.println("00000000001:PersonService:getItems");
        return repository.findAll();
    }
}

