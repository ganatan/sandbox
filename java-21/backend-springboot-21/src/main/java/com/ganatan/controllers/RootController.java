package com.ganatan.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

	@GetMapping("/")
	public Map<String, Object> getStatus() {
		Map<String, Object> response = new HashMap<>();
		response.put("success", true);

		Map<String, Object> data = new HashMap<>();
		data.put("version", "1.1.1");
		data.put("status", "ok");
		data.put("app", "backend-springboot-21");
		data.put("env", "development");
		data.put("dbClient", "mock");

		response.put("data", data);

		return response;
	}
}
