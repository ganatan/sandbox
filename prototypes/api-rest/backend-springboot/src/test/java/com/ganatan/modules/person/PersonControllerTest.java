package com.ganatan.modules.person;

import com.ganatan.config.Application;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PersonController.class)
@ContextConfiguration(classes = Application.class)
public class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnSevenPersons() throws Exception {
        mockMvc.perform(get("/persons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(7))
                .andExpect(jsonPath("$[0].firstName").value("Steven"))
                .andExpect(jsonPath("$[0].lastName").value("Spielberg"))
                .andExpect(jsonPath("$[6].firstName").value("Ridley"))
                .andExpect(jsonPath("$[6].lastName").value("Scott"));
    }
}
