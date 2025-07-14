// services/PersonService.java
package com.ganatan.starter_app.services;

import com.ganatan.starter_app.entities.Person;
import com.ganatan.starter_app.repositories.PersonRepositoryInterface;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonService {

	private final PersonRepositoryInterface repository;
//	@Value("${toto}")
//	private String toto;

	public PersonService(PersonRepositoryInterface repository) {
		this.repository = repository;
	}

	public List<Person> getAllPersons() {
//		System.out.println("00000000001:PersonService:" + toto);
		System.out.println("00000000001:PersonService:");
		return repository.findAll();
	}
}