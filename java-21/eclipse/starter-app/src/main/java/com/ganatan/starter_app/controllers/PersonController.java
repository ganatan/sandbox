package com.ganatan.starter_app.controllers;

import com.ganatan.starter_app.services.PersonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.ganatan.starter_app.entities.Person;

@RestController
public class PersonController {

    private final PersonService service;

    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping("/persons")
    public List<Person> api() {
        return service.getItems();
    }
}


