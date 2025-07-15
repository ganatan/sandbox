package com.ganatan.starter_app.modules.person;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class PersonController {
    
    private final PersonService service;
    
    public PersonController(PersonService service) {
        System.out.println("[ganatan] PersonController Constructor:");
        this.service = service;
    }
    
    @GetMapping("/persons")
    public List<Person> getItems() {
        System.out.println("[ganatan] PersonController getItems:");
        return service.getItems();
    }
}
