package com.ganatan.modules.profession;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ganatan.config.AppConfig;

@WebServlet("/professions/*")
public class ProfessionController extends HttpServlet {

    private final ProfessionService service;
    private final ObjectMapper mapper = new ObjectMapper();

    public ProfessionController() {
        ProfessionRepository repository = new ProfessionRepository(AppConfig.useDbClient());
        System.out.println("00000000001:ProfessionController");
        this.service = new ProfessionService(repository);
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	System.out.println("00000000001:ProfessionController:doGet");
        setCorsHeaders(response);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            int page = parseIntOrDefault(request.getParameter("page"), 1);
            int perPage = parseIntOrDefault(request.getParameter("perPage"), 5);
            int offset = (page - 1) * perPage;

            Map<String, Object> result = service.getItems(offset, perPage);
            mapper.writeValue(response.getWriter(), result);
        } else {
            try {
                int id = extractId(pathInfo);
                Optional<Profession> item = service.getItemById(id);
                if (item.isPresent()) {
                    mapper.writeValue(response.getWriter(), item.get());
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    writeError(response, "Item not found");
                }
            } catch (NumberFormatException e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                writeError(response, "Invalid ID");
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        Profession profession = mapper.readValue(request.getReader(), Profession.class);
        Profession created = service.createItem(profession);

        response.setStatus(HttpServletResponse.SC_CREATED);
        response.setContentType("application/json");
        mapper.writeValue(response.getWriter(), created);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        String pathInfo = request.getPathInfo();

        try {
            int id = extractId(pathInfo);
            Profession updatedData = mapper.readValue(request.getReader(), Profession.class);
            Optional<Profession> updated = service.updateItem(id, updatedData);

            if (updated.isPresent()) {
                response.setContentType("application/json");
                mapper.writeValue(response.getWriter(), updated.get());
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                writeError(response, "Item not found");
            }
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            writeError(response, "Invalid ID");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        String pathInfo = request.getPathInfo();

        try {
            int id = extractId(pathInfo);
            boolean deleted = service.deleteItem(id);

            if (deleted) {
                response.setStatus(HttpServletResponse.SC_OK);
                mapper.writeValue(response.getWriter(), mapper.createObjectNode().put("message", "Deleted successfully"));
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                writeError(response, "Item not found");
            }
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            writeError(response, "Invalid ID");
        }
    }

    private int extractId(String pathInfo) {
        String[] parts = pathInfo.split("/");
        return Integer.parseInt(parts[1]);
    }

    private int parseIntOrDefault(String value, int defaultValue) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException | NullPointerException e) {
            return defaultValue;
        }
    }

    private void writeError(HttpServletResponse response, String message) throws IOException {
        ObjectNode error = mapper.createObjectNode();
        error.put("error", message);
        mapper.writeValue(response.getWriter(), error);
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }
}
