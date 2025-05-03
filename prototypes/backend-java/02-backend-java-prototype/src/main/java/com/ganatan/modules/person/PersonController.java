package com.ganatan.modules.person;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.ganatan.config.AppConfig;

@WebServlet("/persons")
public class PersonController extends HttpServlet {

    private final PersonService service;

    public PersonController() {
        PersonRepository repository = new PersonRepository(AppConfig.useDatabase());
        this.service= new PersonService(repository);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	List<Person> items = service.getItems();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), items);
    }
}
