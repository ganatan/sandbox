package com.ganatan.starter.api.mediaperson;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaPersonRepository extends JpaRepository<MediaPersonEntity, MediaPersonId> {
  List<MediaPersonEntity> findByPersonId(Long personId);
  List<MediaPersonEntity> findByMediaId(Long mediaId);
  boolean existsByMediaIdAndPersonId(Long mediaId, Long personId);
  void deleteByMediaIdAndPersonId(Long mediaId, Long personId);
}
