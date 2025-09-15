package com.ganatan.modules.city;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import static org.junit.jupiter.api.Assertions.*;

public class CityControllerTest {

    @Test
    void shouldReturnCityListAsJson() throws Exception {
        CityController controller = new CityController();
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter writer = new StringWriter();

        Mockito.when(response.getWriter()).thenReturn(new PrintWriter(writer));

        controller.doGet(request, response);

        String json = writer.toString();
        assertTrue(json.contains("\"name\":\"Cincinnati\""));
        assertTrue(json.contains("\"name\":\"London\""));
    }
}
