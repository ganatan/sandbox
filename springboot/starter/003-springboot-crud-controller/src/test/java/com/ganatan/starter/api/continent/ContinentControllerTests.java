package com.ganatan.starter.api.continent;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

class ContinentControllerTests {

  private ContinentController controller;

  @BeforeEach
  void setUp() {
    controller = new ContinentController();
  }

  // --- GET /continents ---

  @Test
  void getAllContinents_shouldReturnSixContinents() {
    List<ContinentController.Continent> result = controller.getAllContinents();
    assertNotNull(result);
    assertEquals(6, result.size());
  }

  @Test
  void getAllContinents_shouldContainAfrica() {
    List<ContinentController.Continent> result = controller.getAllContinents();
    assertTrue(result.stream().anyMatch(c -> c.name().equals("Africa")));
  }

  @Test
  void getAllContinents_shouldHaveSequentialIds() {
    List<ContinentController.Continent> result = controller.getAllContinents();
    for (int i = 0; i < result.size(); i++) {
      assertEquals(i + 1, result.get(i).id());
    }
  }

  // --- GET /continents/{id} ---

  @Test
  void getContinentById_shouldReturnContinent_whenIdExists() {
    ContinentController.Continent result = controller.getContinentById(1);
    assertNotNull(result);
    assertEquals(1, result.id());
    assertEquals("Africa", result.name());
  }

  @Test
  void getContinentById_shouldThrowNotFound_whenIdDoesNotExist() {
    ResponseStatusException ex = assertThrows(
      ResponseStatusException.class,
      () -> controller.getContinentById(999)
    );
    assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
  }

  // --- POST /continents ---

  @Test
  void createContinent_shouldAddContinent_andReturnWithGeneratedId() {
    ContinentController.Continent input = new ContinentController.Continent(0, "Atlantis");
    ContinentController.Continent result = controller.createContinent(input);

    assertNotNull(result);
    assertEquals(7, result.id());
    assertEquals("Atlantis", result.name());
  }

  @Test
  void createContinent_shouldIncreaseSizeByOne() {
    int before = controller.getAllContinents().size();
    controller.createContinent(new ContinentController.Continent(0, "Atlantis"));
    assertEquals(before + 1, controller.getAllContinents().size());
  }

  @Test
  void createContinent_shouldIgnoreInputId_andGenerateNewOne() {
    ContinentController.Continent input = new ContinentController.Continent(999, "Atlantis");
    ContinentController.Continent result = controller.createContinent(input);
    assertNotEquals(999, result.id());
  }

  // --- PUT /continents/{id} ---

  @Test
  void updateContinent_shouldModifyName_whenIdExists() {
    ContinentController.Continent modified = new ContinentController.Continent(0, "Afrika");
    ContinentController.Continent result = controller.updateContinent(1, modified);

    assertEquals(1, result.id());
    assertEquals("Afrika", result.name());
  }

  @Test
  void updateContinent_shouldPreserveId_afterUpdate() {
    ContinentController.Continent modified = new ContinentController.Continent(0, "Afrika");
    ContinentController.Continent result = controller.updateContinent(1, modified);
    assertEquals(1, result.id());
  }

  @Test
  void updateContinent_shouldReflectChange_inGetAll() {
    controller.updateContinent(1, new ContinentController.Continent(0, "Afrika"));
    ContinentController.Continent found = controller.getContinentById(1);
    assertEquals("Afrika", found.name());
  }

  @Test
  void updateContinent_shouldThrowNotFound_whenIdDoesNotExist() {
    ResponseStatusException ex = assertThrows(
      ResponseStatusException.class,
      () -> controller.updateContinent(999, new ContinentController.Continent(0, "Unknown"))
    );
    assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
  }

  // --- DELETE /continents/{id} ---

  @Test
  void deleteContinent_shouldRemoveContinent_whenIdExists() {
    int before = controller.getAllContinents().size();
    controller.deleteContinent(1);
    assertEquals(before - 1, controller.getAllContinents().size());
  }

  @Test
  void deleteContinent_shouldMakeIdUnavailable_afterDeletion() {
    controller.deleteContinent(1);
    ResponseStatusException ex = assertThrows(
      ResponseStatusException.class,
      () -> controller.getContinentById(1)
    );
    assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
  }

  @Test
  void deleteContinent_shouldThrowNotFound_whenIdDoesNotExist() {
    ResponseStatusException ex = assertThrows(
      ResponseStatusException.class,
      () -> controller.deleteContinent(999)
    );
    assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
  }

  // --- record Continent ---

  @Test
  void continent_record_shouldExposeNameAndId() {
    ContinentController.Continent c = new ContinentController.Continent(42, "TestLand");
    assertEquals(42, c.id());
    assertEquals("TestLand", c.name());
  }

  @Test
  void continent_record_shouldImplementEquality() {
    ContinentController.Continent c1 = new ContinentController.Continent(1, "Africa");
    ContinentController.Continent c2 = new ContinentController.Continent(1, "Africa");
    assertEquals(c1, c2);
  }
}