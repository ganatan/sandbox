package com.ganatan.config;

import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

class Item {
	public Item() {
		System.out.println("00000000001:constructor:\r\n" + "	\r\n" + "");
	}
}

@ApplicationPath("/")
public class Application extends ResourceConfig {

	public Application() {

		Item item = new Item();
		System.out.println("00000000001" + item );
		
		String toto = "321321";
		Boolean momo = true;
		Number riri = 1234;
		System.out.println("00000000001" + toto);
		System.out.println("00000000001" + momo);
		System.out.println("00000000001" + riri);

		System.out.println("==================================");
		System.out.println("Démarrage backend-java    (Jersey)");
		System.out.println("API exposées :");
		System.out.println("- /            -> RootController");
		System.out.println("- /persons     -> PersonController");
		System.out.println("Serveur : Tomcat 11.x");
		System.out.println("==================================");

		packages("com.ganatan.controllers", "com.ganatan.modules.person");
	}
}
