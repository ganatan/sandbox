package com.ganatan.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;


@RestController
public class HealthController {

	@GetMapping("/health")
	public String test() {
		return "Root is working";
	}

}