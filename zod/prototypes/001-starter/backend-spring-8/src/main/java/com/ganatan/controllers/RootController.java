package com.ganatan.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;

@RestController
public class RootController {

    private static final String VERSION;

    static {
        Properties properties = new Properties();
        InputStream input = null;
        try {
            input = RootController.class.getClassLoader().getResourceAsStream("application.properties");
            if (input != null) {
                properties.load(input);
            }
        } catch (IOException e) {
            // Silencieux
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    // Ignoré
                }
            }
        }
        VERSION = properties.getProperty("app.version", "unknown");
    }

    @GetMapping("/")
    public Map<String, Object> getStatus() {
        Map<String, Object> response = new LinkedHashMap<String, Object>();
        response.put("success", Boolean.TRUE);

        Map<String, Object> data = new LinkedHashMap<String, Object>();
        data.put("version", VERSION);
        data.put("status", "ok");
        data.put("app", "backend-spring-8");
        data.put("env", "development");
        data.put("dbClient", "mock");

        response.put("data", data);

        return response;
    }
}


//package com.ganatan.controllers;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class RootController {
//
//	@GetMapping("/")
//	public String test() {
//		return "Root is working";
//	}
//
//}
