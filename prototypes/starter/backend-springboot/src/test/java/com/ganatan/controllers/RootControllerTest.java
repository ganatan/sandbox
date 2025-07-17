package com.ganatan.controllers;

import com.ganatan.config.Application;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RootController.class)
@ContextConfiguration(classes = Application.class)
public class RootControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnStatusJson() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.version").isString())
                .andExpect(jsonPath("$.data.status").value("ok"))
                .andExpect(jsonPath("$.data.app").value("backend-springboot"))
                .andExpect(jsonPath("$.data.env").value("development"))
                .andExpect(jsonPath("$.data.dbClient").value("mock"));
    }
}
