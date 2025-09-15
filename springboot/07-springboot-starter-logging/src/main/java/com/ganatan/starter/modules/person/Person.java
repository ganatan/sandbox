package com.ganatan.starter.modules.person;

import jakarta.persistence.*;

@Entity
@Table(name = "STARTER_PERSON")
//@Table(name = "STARTER_PERSON", schema = "SYSTEM")
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 100)
	private String name;

	public Person() {
		System.out.println("00000000001:Person:Constructor");
	}

	public Person(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
