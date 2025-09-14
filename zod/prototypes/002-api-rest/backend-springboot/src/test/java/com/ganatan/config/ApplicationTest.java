package com.ganatan.config;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThatCode;

public class ApplicationTest {

    @Test
    void applicationShouldStartWithoutErrors() {
        assertThatCode(() -> Application.main(new String[]{}))
            .doesNotThrowAnyException();
    }
}
