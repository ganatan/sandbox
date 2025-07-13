package com.ganatan.starter_app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PersonController {

	private static int getSum(int val1, int val2) {
		int result = val1 + val2;
		return result;
	}

	@GetMapping("/persons")
	public List<String>api() {
		int value1 = 10;
		int value2 = 30;
		int total = PersonController.getSum(value1, value2);

		System.out.println("000000000002");
		String response = String.valueOf(total);

		List<String> names = new ArrayList<>();
		names.add("James Cameron");
		names.add("Christopher Nolan");

		System.out.println("000000000002:" + names);

//		return "starter-app" + response;
		return names;

	}
}
