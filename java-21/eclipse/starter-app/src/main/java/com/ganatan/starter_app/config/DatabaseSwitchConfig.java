// config/DatabaseSwitchConfig.java
package com.ganatan.starter_app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSwitchConfig {

    @Value("${db.client}")
    private String dbClient;

    @Bean
    CommandLineRunner logDatabaseMode() {
        return args -> {
            String emoji = switch (dbClient) {
                case "mock" -> "📁";
                case "pg" -> "🐘";
                case "mysql" -> "🐬";
                default -> "❓";
            };
            
            System.out.println(emoji + " DATABASE: " + dbClient.toUpperCase());
        };
    }
}