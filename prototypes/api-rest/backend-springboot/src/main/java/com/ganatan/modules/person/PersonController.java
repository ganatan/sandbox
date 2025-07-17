package com.ganatan.modules.person;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/persons")
public class PersonController {

    private final PersonService service;

    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Person> persons = service.getAll();
        return ResponseEntity.ok(Map.of("data", persons));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Person person = service.getById(id);
        if (person == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Person not found"));
        }
        return ResponseEntity.ok(Map.of("data", person));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Person person) {
        Person created = service.create(person);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("data", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Person person) {
        Person updated = service.update(id, person);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Person not found"));
        }
        return ResponseEntity.ok(Map.of("data", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean deleted = service.delete(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Person not found"));
        }
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}

