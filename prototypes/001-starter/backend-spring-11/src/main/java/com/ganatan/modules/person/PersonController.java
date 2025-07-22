package com.ganatan.modules.person;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
public class PersonController {

	@GetMapping("/persons")
	public List<Person> getPersons() {
		return Arrays.asList(new Person("James Cameron"), new Person("Christopher Nolan"));
	}
}