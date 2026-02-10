package com.ganatan.mediaapi.kafka.event;

import java.time.LocalDate;

public record MediaCreatedPayloadV1(
  long id,
  String name,
  LocalDate release_date
) {}
