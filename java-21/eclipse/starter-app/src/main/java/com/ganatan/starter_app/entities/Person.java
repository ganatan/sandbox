package com.ganatan.starter_app.entities;

public class Person {
	private Long id;
	private String name;

	public Person() {
	}

	public Person(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	// Getters/Setters
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