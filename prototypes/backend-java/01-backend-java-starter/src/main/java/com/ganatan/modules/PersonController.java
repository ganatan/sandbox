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

@WebServlet("/persons")
public class PersonController extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Person> persons = Arrays.asList(
            new Person(1, "Steven Spielberg", "Cincinnati"),
            new Person(2, "Christopher Nolan", "London"),
            new Person(3, "Martin Scorsese", "New York"),
            new Person(4, "Quentin Tarantino", "Knoxville")
        );
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), persons);
    }
}
