// controllers/PersonController.java
package com.ganatan.starter_app.controllers;

import com.ganatan.starter_app.entities.Person;
import com.ganatan.starter_app.services.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/persons")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonController {
    
    private final PersonService service;
    
    public PersonController(PersonService service) {
        this.service = service;
    }
    
    @GetMapping
    public ResponseEntity<List<Person>> getAllPersons() {
        List<Person> persons = service.getAllPersons();
        return ResponseEntity.ok(persons);
    }
}