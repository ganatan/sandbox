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

		return "starter-app" ;
	}

}
