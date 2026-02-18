package com.ganatan.starter.api.kafka;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KafkaController {

    private static final String TOPIC = "media.events.v1";

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @GetMapping("/kafka")
    public Map<String, Object> kafka() {
        kafkaTemplate.send(TOPIC, "test-key", "message");
        return Map.of("topic", TOPIC, "sent", true, "type", "raw");
    }

    @GetMapping("/kafka/model")
    public Map<String, Object> kafkaModel() {
        String key = "test-key";
        String json = """
            {
              "eventId": "%s",
              "eventType": "TestEvent",
              "schemaVersion": 1,
              "occurredAt": "%s",
              "producer": "starter-api",
              "payload": {
                "message": "hello"
              }
            }
            """.formatted(UUID.randomUUID(), Instant.now().toString());

        kafkaTemplate.send(TOPIC, key, json);

        return Map.of(
            "topic", TOPIC,
            "key", key,
            "sent", true,
            "type", "model"
        );
    }

    @GetMapping("/kafka/media")
    public Map<String, Object> kafkaMedia() {
        String key = "1001";
        String json = """
            {
              "eventId": "%s",
              "eventType": "MediaCreated",
              "schemaVersion": 1,
              "occurredAt": "%s",
              "producer": "media-api",
              "payload": {
                "id": 1001,
                "name": "Alien",
                "release_date": "1979-05-25"
              }
            }
            """.formatted(UUID.randomUUID(), Instant.now().toString());

        kafkaTemplate.send(TOPIC, key, json);

        return Map.of(
            "topic", TOPIC,
            "key", key,
            "sent", true,
            "type", "media"
        );
    }
}