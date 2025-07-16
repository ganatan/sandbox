package com.ganatan.starter_app.modules.person;

import com.ganatan.starter_app.modules.person.AlreadyExistsException;
import com.ganatan.starter_app.modules.person.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepositoryInterface repository;

    public PersonService(PersonRepositoryInterface repository) {
        this.repository = repository;
    }

    public List<Person> getItems() {
        return repository.findAll();
    }

    public Person getItemById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Person not found"));
    }

    public Person createItem(Person person) {
        if (repository.existsByName(person.getName())) {
            throw new AlreadyExistsException("Person already exists");
        }
        return repository.save(person);
    }

    public Person updateItem(Long id, Person person) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Person not found");
        }
        person.setId(id);
        return repository.save(person);
    }

    public void deleteItem(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Person not found");
        }
        repository.deleteById(id);
    }
}



//package com.ganatan.starter_app.modules.person;
//
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import org.springframework.aop.framework.AopProxyUtils;
//
//@Service
//public class PersonService {
//
//	private final PersonRepositoryInterface repository;
//
//	public PersonService(PersonRepositoryInterface repository) {
//		System.out.println("[ganatan] PersonService Constructor:");
//		System.out.println(
//				"[ganatan] Repository injecté : " + AopProxyUtils.ultimateTargetClass(repository).getSimpleName());
//		this.repository = repository;
//	}
//
//	public List<Person> getItems() {
//		System.out.println("[ganatan] PersonService getItems:");
//		return repository.findAll();
//	}
//}
