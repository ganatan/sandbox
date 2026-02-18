package com.ganatan.starter.api.elk;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
public class ElkLoggingController {

    private static final String INDEX = "app-logs";
    private static final ParameterizedTypeReference<Map<String, Object>> MAP = new ParameterizedTypeReference<>() {};

    private final RestClient es;

    public ElkLoggingController(@Value("${app.elasticsearch.url}") String baseUrl, RestClient.Builder builder) {
        this.es = builder.baseUrl(baseUrl).build();
    }

    @GetMapping("/api/log/elk")
    public Map<String, Object> writeToElasticsearch() {
        String id = UUID.randomUUID().toString();

        Map<String, Object> doc = Map.of(
                "@timestamp", Instant.now().toString(),
                "level", "INFO",
                "source", "elk-controller",
                "message", "hello from springboot",
                "traceId", "abc123"
        );

        Map<String, Object> resp = es.post()
                .uri("/" + INDEX + "/_doc/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .body(doc)
                .retrieve()
                .body(MAP);

        return Map.of("index", INDEX, "id", id, "result", resp);
    }
}