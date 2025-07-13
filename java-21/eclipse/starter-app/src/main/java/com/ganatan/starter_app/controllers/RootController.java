package com.ganatan.starter_app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

	public static String getName() {
		return "starter-app";
	}

	@GetMapping("/")
	public String home() {

		Person p = new Person("James", "Cameron");
		p.show();
		System.out.println("000000000001" + p.getFirstName());
		System.out.println("000000000001" + p.getLastName());
		System.out.println("000000000001");
		String response = "test";
		response = getName();

		return "starter-app" + response;
	}

}
