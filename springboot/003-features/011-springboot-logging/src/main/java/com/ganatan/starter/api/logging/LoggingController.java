package com.ganatan.starter.api.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoggingController {

    private static final Logger log = LoggerFactory.getLogger(LoggingController.class);

    @GetMapping("/api/log")
    public String logSomething() {
        log.info("demo-log message={} user={}", "hello", "mulder");
        return "ok";
    }
}