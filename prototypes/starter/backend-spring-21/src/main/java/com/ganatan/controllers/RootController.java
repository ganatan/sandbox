package com.ganatan.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, Object> getStatus() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("version", "1.1.1");
        data.put("status", "ok");
        data.put("app", "backend-spring-21");
        data.put("env", "development");
        data.put("dbClient", "mock");

        response.put("data", data);

        return response;
    }
}
