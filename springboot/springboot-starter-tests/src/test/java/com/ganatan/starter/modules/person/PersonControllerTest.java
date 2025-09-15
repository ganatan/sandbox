package com.ganatan.starter.modules.person;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PersonControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void testGetAllPersons() throws Exception {
		mockMvc.perform(get("/persons")).andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(5))
				.andExpect(jsonPath("$[0].name").value("Quentin Tarantino"));
	}

	@Test
	void testGetPersonById() throws Exception {
		mockMvc.perform(get("/persons/1")).andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("Quentin Tarantino"));
	}

	@Test
	void testCreatePerson() throws Exception {
		mockMvc.perform(post("/persons").contentType(MediaType.APPLICATION_JSON).content("{\"name\":\"Ridley Scott\"}"))
				.andExpect(status().isOk()).andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.name").value("Ridley Scott"));
	}

	@Test
	void testUpdatePerson() throws Exception {
		mockMvc.perform(put("/persons/3").contentType(MediaType.APPLICATION_JSON)
				.content("{\"name\":\"Steven Spielberg (updated)\"}")).andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(3)).andExpect(jsonPath("$.name").value("Steven Spielberg (updated)"));
	}

	@Test
	void testDeletePerson() throws Exception {
		mockMvc.perform(delete("/persons/2")).andExpect(status().isOk());

		mockMvc.perform(get("/persons/2")).andExpect(status().isOk()).andExpect(content().string("")); 
	}
}
