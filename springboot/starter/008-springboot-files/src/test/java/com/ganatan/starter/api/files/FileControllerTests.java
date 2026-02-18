package com.ganatan.starter.api.files;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @TempDir
    Path tempDir;

    @Test
    void shouldReturn404WhenFileDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/files/inexistant.pdf"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturn400WhenNameIsInvalid() throws Exception {
        mockMvc.perform(get("/api/files/invalid@name.pdf"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnPdfWhenFileExists() throws Exception {
        Path dataDir = Path.of("./data/files");
        Files.createDirectories(dataDir);
        Path pdf = dataDir.resolve("test.pdf");
        Files.writeString(pdf, "%PDF-1.4 fake");

        try {
            mockMvc.perform(get("/api/files/test.pdf"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/pdf"))
                    .andExpect(header().string("Content-Disposition",
                            org.hamcrest.Matchers.containsString("inline")));
        } finally {
            Files.deleteIfExists(pdf);
        }
    }
}