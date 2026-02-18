package com.ganatan.starter.api.security;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityControllerTests {

    @Autowired
    private MockMvc mvc;

    @Test
    void public_ok_without_credentials() throws Exception {
        mvc.perform(get("/api/public"))
                .andExpect(status().isOk())
                .andExpect(content().string("Public - accessible sans authentification"));
    }

    @Test
    void private_401_without_credentials() throws Exception {
        mvc.perform(get("/api/private"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void private_ok_with_basic_auth() throws Exception {
        mvc.perform(get("/api/private").with(httpBasic("mulder", "Trustno1")))
                .andExpect(status().isOk())
                .andExpect(content().string("Private - authentification requise"));
    }

    @Test
    void private_401_with_bad_password() throws Exception {
        mvc.perform(get("/api/private").with(httpBasic("mulder", "bad")))
                .andExpect(status().isUnauthorized());
    }
}