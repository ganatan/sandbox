package com.ganatan.starter_app.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

	@Value("${db.client:mock}")
	private String dbClient;

	@Value("${spring.application.name:starter-app}")
	private String applicationName;

	@Value("${server.port:8080}")
	private int serverPort;

	public static String getName() {
		return "starter-app";
	}

	@GetMapping("/")
	public String home() {
		System.out.println("[ganatan] Database Client : " + dbClient);
		System.out.println("[ganatan] Application : " + applicationName);
		System.out.println("[ganatan] Port : " + serverPort);
		return "starter-app";
	}

}
