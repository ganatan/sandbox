package com.ganatan.modules.person;

import com.ganatan.config.Application;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PersonController.class)
@ContextConfiguration(classes = {Application.class, PersonControllerTest.TestConfig.class})
public class PersonControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        public PersonService personService() {
            return Mockito.mock(PersonService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PersonService personService;

    @Test
    void shouldReturnListOfPersons() throws Exception {
        List<Person> mockPersons = List.of(
            new Person(1L, "Steven Spielberg"),
            new Person(2L, "Martin Scorsese")
        );

        Mockito.when(personService.getItems()).thenReturn(mockPersons);

        String responseContent = mockMvc.perform(get("/persons"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.length()").value(2))
            .andExpect(jsonPath("$.data[0].name").value("Steven Spielberg"))
            .andExpect(jsonPath("$.data[1].name").value("Martin Scorsese"))
            .andReturn()
            .getResponse()
            .getContentAsString();

        System.out.println("PersonControllerTest: " + responseContent);
    }
}
