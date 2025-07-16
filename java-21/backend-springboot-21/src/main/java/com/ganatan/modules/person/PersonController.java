package com.ganatan.modules.person;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    @GetMapping("/persons")
    public String home() {
        return "person";
    }
}
