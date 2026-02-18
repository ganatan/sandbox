package com.ganatan.starter.api.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SecurityController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "Public - accessible sans authentification";
    }

    @GetMapping("/private")
    public String privateEndpoint() {
        return "Private - authentification requise";
    }
}