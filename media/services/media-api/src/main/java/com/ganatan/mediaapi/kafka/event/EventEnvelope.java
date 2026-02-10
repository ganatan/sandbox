package com.ganatan.mediaapi.kafka.event;

import java.time.Instant;

public record EventEnvelope<T>(
  String eventId,
  String eventType,
  Instant occurredAt,
  String correlationId,
  String aggregateId,
  String version,
  T payload
) {}
