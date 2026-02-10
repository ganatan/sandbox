package com.ganatan.mediaapi.kafka;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/kafka")
public class KafkaController {

  private final KafkaProducerService producer;

  public KafkaController(KafkaProducerService producer) {
    this.producer = producer;
  }

  @PostMapping("/publish")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public Map<String, Object> publish(
    @RequestParam String topic,
    @RequestParam(required = false) String key,
    @RequestBody Object payload
  ) {
    String messageKey = key != null ? key : UUID.randomUUID().toString();
    producer.sendJson(topic, messageKey, payload);
    return Map.of(
      "topic", topic,
      "key", messageKey,
      "status", "published"
    );
  }

  @PostMapping("/ping")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public Map<String, Object> ping(
    @RequestParam(defaultValue = "media-events") String topic,
    @RequestParam(required = false) String key
  ) {
    String messageKey = key != null ? key : "ping";
    producer.sendJson(topic, messageKey, Map.of(
      "eventType", "Ping",
      "eventId", UUID.randomUUID().toString(),
      "occurredAt", Instant.now().toString()
    ));
    return Map.of(
      "topic", topic,
      "key", messageKey,
      "status", "published"
    );
  }
}


//package com.ganatan.mediaapi.kafka;
//
//import com.ganatan.mediaapi.domain.MediaEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//
//import java.util.List;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/kafka")
//public class KafkaController {
//
//  private final KafkaProducerService producer;
//
//  public KafkaController(KafkaProducerService producer) {
//    this.producer = producer;
//  }
//
//  @GetMapping
//  public Map<String, Object> getAll() {
//    String message = "Kafka Send Message on Get";
//    producer.send( message);
//    return Map.of(
//      "kafka", "send message"
//    );
//  }
//
//  @PostMapping
//  public void send(@RequestBody String message) {
//    producer.send(message);
//  }
//}
