package com.ganatan.config;

import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/")  
public class ApplicationConfig extends ResourceConfig {

    public ApplicationConfig() {

        System.out.println("==================================");
        System.out.println("Démarrage backend-java-21 (Jersey)");
        System.out.println("API exposées :");
        System.out.println("- /            -> RootController");
        System.out.println("- /persons     -> PersonController");
        System.out.println("Serveur : Tomcat 11.x");
        System.out.println("==================================");

        packages(
            "com.ganatan.root",
            "com.ganatan.modules.person"
        );
    }
}
