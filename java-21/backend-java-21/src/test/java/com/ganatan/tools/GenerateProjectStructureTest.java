package com.ganatan.tools;

import org.junit.jupiter.api.Test;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;

public class GenerateProjectStructureTest {

    @Test
    public void testIsValidDirectory() throws IOException {
        File tempDir = Files.createTempDirectory("temp-dir-" + UUID.randomUUID()).toFile();
        File tempFile = File.createTempFile("temp-file-" + UUID.randomUUID(), ".txt");

        assertTrue(GenerateProjectStructure.isValidDirectory(tempDir));
        assertFalse(GenerateProjectStructure.isValidDirectory(tempFile));
        assertFalse(GenerateProjectStructure.isValidDirectory(new File("nonexistent-directory")));
    }

    @Test
    public void testShouldSkip() {
        assertTrue(GenerateProjectStructure.shouldSkip(new File("bin")));
        assertTrue(GenerateProjectStructure.shouldSkip(new File("target")));
        assertTrue(GenerateProjectStructure.shouldSkip(new File(".settings")));
        assertFalse(GenerateProjectStructure.shouldSkip(new File("src")));
    }

    @Test
    public void testListFilesOnDirectory() {
        File directory = new File(".");
        GenerateProjectStructure.listFiles(directory, 0);
        assertTrue(directory.exists());
    }

    @Test
    public void testListFilesOnFileInsteadOfDirectory() throws IOException {
        File tempFile = File.createTempFile("tempfile-" + UUID.randomUUID(), ".txt");
        GenerateProjectStructure.listFiles(tempFile, 0);
        assertTrue(tempFile.exists());
        tempFile.deleteOnExit();
    }

    @Test
    public void testMain() {
        GenerateProjectStructure.main(null);
    }
}
