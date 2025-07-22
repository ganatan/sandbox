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
    public ResponseEntity<?> getItems() {
        List<Person> persons = service.getItems();
        return ResponseEntity.ok(Map.of("data", persons));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        Person person = service.getItemById(id);
        if (person == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Person not found"));
        }
        return ResponseEntity.ok(Map.of("data", person));
    }

    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody Person person) {
        Person created = service.createItem(person);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("data", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Person person) {
        Person updated = service.updateItem(id, person);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Person not found"));
        }
        return ResponseEntity.ok(Map.of("data", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        boolean deleted = service.deleteItem(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Person not found"));
        }
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}

