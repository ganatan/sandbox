package com.ganatan.starter_app.controllers;

public class Person {

	private String firstName;
	private String lastName;

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	protected Person(String firstName, String lastName) {
		System.out.println("00000000001:constructor:Person");
		this.firstName = firstName;
		this.lastName = lastName;
	}

	protected void show() {
		System.out.println("00000000001:show");
	}

}
