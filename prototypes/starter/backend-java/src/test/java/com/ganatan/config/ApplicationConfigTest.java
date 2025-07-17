package com.ganatan.config;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ApplicationConfigTest {

    @Test
    public void testApplicationConfigInitialization() {
        ApplicationConfig config = new ApplicationConfig();
        assertNotNull(config);
    }
}
