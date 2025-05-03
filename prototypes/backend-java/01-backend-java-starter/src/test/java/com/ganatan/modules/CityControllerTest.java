package com.ganatan.modules;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.ganatan.modules.CityController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import static org.junit.jupiter.api.Assertions.*;

class CityControllerTest {

    @Test
    void shouldReturnJsonResponse() throws Exception {
    	CityController servlet = new CityController();
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter responseWriter = new StringWriter();

        Mockito.when(response.getWriter()).thenReturn(new PrintWriter(responseWriter));

        servlet.doGet(request, response);

        String json = responseWriter.toString();
        assertTrue(json.contains("\"name\":\"Cincinnati\""));
        assertTrue(json.contains("\"name\":\"London\""));
    }
}
