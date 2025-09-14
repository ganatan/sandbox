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

@WebServlet("/professions")
public class ProfessionController extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Profession> items = Arrays.asList(
            new Profession(1, "Director"),
            new Profession(2, "Producer"),
            new Profession(3, "Screenwriter"),
            new Profession(4, "Editor")
        );
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new ObjectMapper().writeValue(response.getWriter(), items);
    }
}
