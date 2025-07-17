
package com.ganatan.controllers;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class RootController {

    @GET
    public Response getStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);

        Map<String, Object> data = new HashMap<>();
        data.put("version", "1.1.1");
        data.put("status", "ok");
        data.put("app", "backend-java-21");
        data.put("env", "development");
        data.put("dbClient", "mock");

        response.put("data", data);

        return Response.ok(response).build();
    }
}



