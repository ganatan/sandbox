package com.ganatan.starter_app.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

//	 @Value("${toto}")
//	    private String toto;
//
//	    @Value("${momo}")
//	    private String momo;
	
	public static String getName() {
		return "starter-app";
	}

	@GetMapping("/")
	public String home() {
//	      System.out.println("TOTO = " + toto);
//	        System.out.println("MOMO = " + momo);
		return "starter-app" ;
	}

}
