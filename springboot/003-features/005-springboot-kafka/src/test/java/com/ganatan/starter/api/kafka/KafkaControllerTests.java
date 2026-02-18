package com.ganatan.starter.api.kafka;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class KafkaControllerTests {

    @Mock
    private KafkaTemplate<String, String> kafkaTemplate;

    @InjectMocks
    private KafkaController controller;

    @Test
    void kafka_shouldSendToTopicAndReturnRawType() {
        Map<String, Object> result = controller.kafka();

        verify(kafkaTemplate).send(eq("media.events.v1"), eq("test-key"), eq("message"));
        assertThat(result).containsEntry("topic", "media.events.v1")
                          .containsEntry("sent", true)
                          .containsEntry("type", "raw");
    }

    @Test
    void kafkaModel_shouldSendJsonAndReturnModelType() {
        Map<String, Object> result = controller.kafkaModel();

        verify(kafkaTemplate).send(eq("media.events.v1"), eq("test-key"), anyString());
        assertThat(result).containsEntry("topic", "media.events.v1")
                          .containsEntry("key", "test-key")
                          .containsEntry("sent", true)
                          .containsEntry("type", "model");
    }

    @Test
    void kafkaMedia_shouldSendJsonAndReturnMediaType() {
        Map<String, Object> result = controller.kafkaMedia();

        verify(kafkaTemplate).send(eq("media.events.v1"), eq("1001"), anyString());
        assertThat(result).containsEntry("topic", "media.events.v1")
                          .containsEntry("key", "1001")
                          .containsEntry("sent", true)
                          .containsEntry("type", "media");
    }
}
