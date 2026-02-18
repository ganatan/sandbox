package com.ganatan.starter.api.external;

import java.util.List;
import java.util.Map;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
public class ExternalApiController {

    private static final String ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums";

    private final RestClient restClient;

    public ExternalApiController(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    @GetMapping("/api/albums")
    public Map<String, Object> getAlbums() {
        List<Map<String, Object>> albums = restClient.get()
            .uri(ALBUMS_URL)
            .retrieve()
            .body(new ParameterizedTypeReference<>() {});

        List<Map<String, Object>> items = albums != null ? albums : List.of();

        return Map.of(
            "source", "jsonplaceholder",
            "count", items.size(),
            "items", items
        );
    }
}
