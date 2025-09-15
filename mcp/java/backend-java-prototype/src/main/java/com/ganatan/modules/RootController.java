package com.ganatan.modules;

import java.io.IOException;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ganatan.shared.constants.Routes;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/")
public class RootController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Map<String, Object> endpoints = Routes.ROUTES.entrySet().stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                entry -> Map.of(
                    "url", entry.getValue().path(),
                    "methods", entry.getValue().methods()
                )
            ));

        Map<String, Object> root = new LinkedHashMap<>();
        root.put("version", "1.0.0");
        root.put("status", "ok");
        root.put("timestamp", Instant.now().toString());
        root.put("endpoints", endpoints);

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        new ObjectMapper().writeValue(response.getWriter(), root);
    }
}
