package com.ganatan.starter.api.cors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CorsController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}