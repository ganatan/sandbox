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
public class LogstashLoggingController {

    private static final ParameterizedTypeReference<Map<String, Object>> MAP = new ParameterizedTypeReference<>() {};

    private final RestClient logstash;

    public LogstashLoggingController(@Value("${app.logstash.url}") String baseUrl, RestClient.Builder builder) {
        this.logstash = builder.baseUrl(baseUrl).build();
    }

    @GetMapping("/api/log/logstash")
    public Map<String, Object> writeToLogstash() {
        String id = UUID.randomUUID().toString();

        Map<String, Object> doc = Map.of(
                "@timestamp", Instant.now().toString(),
                "level", "INFO",
                "source", "logstash-controller",
                "message", "hello via logstash",
                "traceId", "abc123",
                "eventId", id
        );

        Map<String, Object> resp = logstash.post()
                .uri("/log")
                .contentType(MediaType.APPLICATION_JSON)
                .body(doc)
                .retrieve()
                .body(MAP);

        return Map.of("sent", true, "eventId", id, "logstashResponse", resp);
    }
}