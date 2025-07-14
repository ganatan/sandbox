package com.ganatan.starter_app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSwitchConfig {

//	@Value("${db.client:mock}")  
//	private String dbClient;

	@Bean
	CommandLineRunner logDatabaseMode() {
		return args -> {
//        	System.out.println("00000000001:logDatabaseMode:"+dbClient);
//            System.out.println(" DATABASE: " + dbClient.toUpperCase());
		};
	}
}