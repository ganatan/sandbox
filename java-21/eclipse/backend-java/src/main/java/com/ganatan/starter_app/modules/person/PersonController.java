package com.ganatan.starter_app.modules.person;

import com.ganatan.starter_app.modules.person.AlreadyExistsException;
import com.ganatan.starter_app.modules.person.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    private final PersonService service;

    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping
    public List<Person> getAll() {
        return service.getItems();
    }

    @GetMapping("/{id}")
    public Person getById(@PathVariable Long id) {
        return service.getItemById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Person create(@RequestBody Person person) {
        return service.createItem(person);
    }

    @PutMapping("/{id}")
    public Person update(@PathVariable Long id, @RequestBody Person person) {
        return service.updateItem(id, person);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteItem(id);
    }
}



//package com.ganatan.starter_app.modules.person;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//import java.util.List;
//
//@RestController
//public class PersonController {
//    
//    private final PersonService service;
//    
//    public PersonController(PersonService service) {
//        System.out.println("[ganatan] PersonController Constructor:");
//        this.service = service;
//    }
//    
//    @GetMapping("/persons")
//    public List<Person> getItems() {
//        System.out.println("[ganatan] PersonController getItems:");
//        return service.getItems();
//    }
//}
