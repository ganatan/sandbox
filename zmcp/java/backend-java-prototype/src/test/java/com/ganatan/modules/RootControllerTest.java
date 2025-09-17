package com.ganatan.modules;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.*;

public class RootControllerTest {

    @Test
    void shouldReturnRootEndpointsJson() throws Exception {
        RootController servlet = new RootController();

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter responseWriter = new StringWriter();

        Mockito.when(response.getWriter()).thenReturn(new PrintWriter(responseWriter));

        servlet.doGet(request, response);

        String json = responseWriter.toString();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(json);

        assertEquals("ok", root.get("status").asText());
        assertEquals("1.0.0", root.get("version").asText());

        JsonNode endpoints = root.get("endpoints");

        assertNotNull(endpoints.get("persons"));
        assertEquals("/persons", endpoints.get("persons").get("url").asText());

        assertNotNull(endpoints.get("cities"));
        assertEquals("/cities", endpoints.get("cities").get("url").asText());
    }
}
