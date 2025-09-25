package com.angular.starter.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RootController.class)
public class RootControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getRootInfo_shouldReturnAllServices_successTrue() throws Exception {
        mockMvc.perform(get("/"))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.llm", hasSize(greaterThanOrEqualTo(1))))
            .andExpect(jsonPath("$.data.llm[0].type", not(emptyOrNullString())))
            .andExpect(jsonPath("$.data.tts[0].label", is("ElevenLabs")))
            .andExpect(jsonPath("$.data.avatar[*].type", hasItem("jogg")))
            .andExpect(jsonPath("$.data.music[*].label", hasItems("Suno AI", "Udio AI")));
    }
}
