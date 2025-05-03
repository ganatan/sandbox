package com.ganatan.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {

    private static final String DB_USER = System.getenv().getOrDefault("DB_USER", "postgres");
    private static final String DB_PASSWORD = System.getenv().getOrDefault("DB_PASSWORD", "Trustno1");
    private static final String DB_HOST = System.getenv().getOrDefault("DB_HOST", "localhost");
    private static final String DB_PORT = System.getenv().getOrDefault("DB_PORT", "5432");
    private static final String DB_NAME = System.getenv().getOrDefault("DB_NAME", "backend_javascript");

    private static final String JDBC_URL = "jdbc:postgresql://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
    
    
    static {
        try {
            // Chargement explicite du driver
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Failed to load PostgreSQL JDBC driver", e);
        }
    }

    
    public static Connection getConnection() throws SQLException {
    	System.out.println("00000000001:Database:");
    	System.out.println("00000000002:Database:" + JDBC_URL);
    	System.out.println("00000000003':Database:" + DB_USER);
    	System.out.println("00000000004:Database:" + DB_PASSWORD);
        return DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASSWORD);
    }
}
