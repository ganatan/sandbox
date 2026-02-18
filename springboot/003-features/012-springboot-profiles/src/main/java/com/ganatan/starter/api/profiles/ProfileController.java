package com.ganatan.starter.api.profiles;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    private final String profileName;

    public ProfileController(@Value("${app.profile-name}") String profileName) {
        this.profileName = profileName;
    }

    @GetMapping("/api/profile")
    public String profile() {
        return profileName;
    }
}