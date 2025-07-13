package com.ganatan.starter_app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

	private static int getSum(int val1, int val2) {
		int result = val1 + val2;
		return result;
	}

	@GetMapping("/api")
	public String api() {
		int value1 = 10;
		int value2 = 30;
		int total = ApiController.getSum(value1, value2);

		System.out.println("000000000002");
		String response = String.valueOf(total);

		return "starter-app" + response;
	}
}
