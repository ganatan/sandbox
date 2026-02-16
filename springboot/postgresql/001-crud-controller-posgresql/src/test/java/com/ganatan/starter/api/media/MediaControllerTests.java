package com.ganatan.starter.api.media;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

class MediaControllerTests {

  @Mock
  private MediaRepository mediaRepository;

  @InjectMocks
  private MediaController mediaController;

  private Media matrix;
  private Media bladeRunner;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    matrix    = new Media(1000L, "The Matrix", 1999);
    bladeRunner = new Media(1001L, "Blade Runner", 1982);
  }

  // --- GET /media ---

  @Test
  void getAllMedia_shouldReturnList() {
    when(mediaRepository.findAll()).thenReturn(List.of(matrix, bladeRunner));

    List<Media> result = mediaController.getAllMedia();

    assertNotNull(result);
    assertEquals(2, result.size());
    verify(mediaRepository, times(1)).findAll();
  }

  @Test
  void getAllMedia_shouldReturnEmptyList_whenNoMedia() {
    when(mediaRepository.findAll()).thenReturn(List.of());

    List<Media> result = mediaController.getAllMedia();

    assertTrue(result.isEmpty());
  }

  // --- GET /media/{id} ---

  @Test
  void getMediaById_shouldReturnMedia_whenIdExists() {
    when(mediaRepository.findById(1000L)).thenReturn(Optional.of(matrix));

    Media result = mediaController.getMediaById(1000L);

    assertNotNull(result);
    assertEquals(1000L, result.getId());
    assertEquals("The Matrix", result.getName());
    assertEquals(1999, result.getReleaseDate());
    verify(mediaRepository, times(1)).findById(1000L);
  }

  @Test
  void getMediaById_shouldThrowNotFound_whenIdDoesNotExist() {
    when(mediaRepository.findById(999L)).thenReturn(Optional.empty());

    ResponseStatusException ex = assertThrows(
      ResponseStatusException.class,
      () -> mediaController.getMediaById(999L)
    );
    assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
  }

  // --- POST /media ---

  @Test
  void createMedia_shouldReturnCreatedMedia() {
    Media input = new Media(null, "Alien", 1979);
    Media saved = new Media(1002L, "Alien", 1979);
    when(mediaRepository.save(input)).thenReturn(saved);

    Media result = mediaController.createMedia(input);

    assertNotNull(result);
    assertEquals(1002L, result.getId());
    assertEquals("Alien", result.getName());
    assertEquals(1979, result.getReleaseDate());
    verify(mediaRepository, times(1)).save(input);
  }

  @Test
  void createMedia_shouldCallRepositoryOnce() {
    Media input = new Media(null, "Alien", 1979);
    when(mediaRepository.save(any())).thenReturn(input);

    mediaController.createMedia(input);

    verify(mediaRepository, times(1)).save(input);
  }

  // --- PUT /media/{id} ---

  @Test
  void updateMedia_shouldReturnUpdatedMedia_whenIdExists() {
    Media modified = new Media(null, "The Matrix Reloaded", 2003);
    Media updated = new Media(1000L, "The Matrix Reloaded", 2003);
    when(mediaRepository.findById(1000L)).thenReturn(Optional.of(matrix));
    when(mediaRepository.save(any())).thenReturn(updated);

    Media result = mediaController.updateMedia(1000L, modified);

    assertNotNull(result);
    assertEquals("The Matrix Reloaded", result.getName());
    assertEquals(2003, result.getReleaseDate());
    verify(mediaRepository, times(1)).findById(1000L);
    verify(mediaRepository, times(1)).save(any());
  }

  @Test
  void updateMedia_shouldThrowNotFound_whenIdDoesNotExist() {
    Media modified = new Media(null, "Unknown", 2000);
    when(mediaRepository.findById(999L)).thenReturn(Optional.empty());

    ResponseStatusException ex = assertThrows(
      ResponseStatusException.class,
      () -> mediaController.updateMedia(999L, modified)
    );
    assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
  }

  // --- DELETE /media/{id} ---

  @Test
  void deleteMedia_shouldCallRepository_whenIdExists() {
    when(mediaRepository.findById(1000L)).thenReturn(Optional.of(matrix));
    doNothing().when(mediaRepository).delete(matrix);

    mediaController.deleteMedia(1000L);

    verify(mediaRepository, times(1)).findById(1000L);
    verify(mediaRepository, times(1)).delete(matrix);
  }

  @Test
  void deleteMedia_shouldThrowNotFound_whenIdDoesNotExist() {
    when(mediaRepository.findById(999L)).thenReturn(Optional.empty());

    ResponseStatusException ex = assertThrows(
      ResponseStatusException.class,
      () -> mediaController.deleteMedia(999L)
    );
    assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
  }

  @Test
  void media_setId_shouldUpdateId() {
    Media media = new Media(null, "Alien", 1979);
    media.setId(42L);
    assertEquals(42L, media.getId());
  }
}