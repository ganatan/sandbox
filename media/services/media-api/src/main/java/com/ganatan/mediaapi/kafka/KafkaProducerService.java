package com.ganatan.mediaapi.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

  private final KafkaTemplate<String, String> kafkaTemplate;
  private final ObjectMapper objectMapper;

  public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
    this.kafkaTemplate = kafkaTemplate;
    this.objectMapper = objectMapper;
  }

  public void sendJson(String topic, String key, Object event) {
    try {
      String json = objectMapper.writeValueAsString(event);
      kafkaTemplate.send(topic, key, json);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}



//package com.ganatan.mediaapi.kafka;
//
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class KafkaProducerService {
//
//  private final KafkaTemplate<String, String> kafkaTemplate;
//
//  public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
//    this.kafkaTemplate = kafkaTemplate;
//  }
//
//  public void send(String message) {
//    kafkaTemplate.send("media-events", message);
//  }
//}
