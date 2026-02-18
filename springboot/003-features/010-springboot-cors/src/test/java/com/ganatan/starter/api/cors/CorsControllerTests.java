package com.ganatan.starter.api.cors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import com.ganatan.starter.config.CorsConfig;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CorsController.class)
@Import(CorsConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class CorsControllerTests {

    @Autowired
    private MockMvc mvc;

    @Test
    void ping_returns_pong() throws Exception {
        mvc.perform(get("/api/ping"))
                .andExpect(status().isOk())
                .andExpect(content().string("pong"));
    }

    @Test
    void preflight_allowed_origin() throws Exception {
        mvc.perform(options("/api/ping")
                .header("Origin", "http://localhost:4200")
                .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }

    @Test
    void get_allowed_origin_has_cors_header() throws Exception {
        mvc.perform(get("/api/ping")
                .header("Origin", "http://localhost:4200"))
                .andExpect(status().isOk())
                .andExpect(content().string("pong"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }
}