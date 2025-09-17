package com.ganatan.modules;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/cities")
public class CityController extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<City> persons = Arrays.asList(
            new City(1,  "Cincinnati"),
            new City(2,  "London"),
            new City(3,  "New York"),
            new City(4, "Knoxville")
        );
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), persons);
    }
}
