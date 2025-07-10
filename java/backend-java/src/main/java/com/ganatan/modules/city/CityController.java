package com.ganatan.modules.city;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.ganatan.config.AppConfig;

@WebServlet("/cities")
public class CityController extends HttpServlet {

    private final CityService service;

    public CityController() {
        CityRepository repository = new CityRepository(AppConfig.useDbClient());
        this.service= new CityService(repository);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	List<City> items = service.getItems();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), items);
    }
}
