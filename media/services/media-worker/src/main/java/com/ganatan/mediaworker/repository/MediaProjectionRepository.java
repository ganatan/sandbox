package com.ganatan.mediaworker.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ganatan.mediaworker.projection.MediaProjection;

public interface MediaProjectionRepository extends MongoRepository<MediaProjection, String> {
}
