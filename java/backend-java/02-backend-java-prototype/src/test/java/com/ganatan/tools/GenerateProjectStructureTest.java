package com.ganatan.tools;

import org.junit.jupiter.api.Test;
import java.io.File;
import java.io.IOException;
import static org.junit.jupiter.api.Assertions.*;

class GenerateProjectStructureTest {

    @Test
    void shouldListFilesInDirectory() throws IOException {
        File tempDir = new File("testDir");
        File file1 = new File(tempDir, "file1.txt");
        File subDir = new File(tempDir, "subDir");
        File file2 = new File(subDir, "file2.txt");

        tempDir.mkdir();
        subDir.mkdir();
        file1.createNewFile();
        file2.createNewFile();

        assertTrue(tempDir.exists());
        assertTrue(file1.exists());
        assertTrue(subDir.exists());
        assertTrue(file2.exists());

        GenerateProjectStructure.main(new String[]{});

        file1.delete();
        file2.delete();
        subDir.delete();
        tempDir.delete();
    }
}
