package com.ganatan.cinema.log;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import junit.framework.TestCase;

public class LoggingTest extends TestCase {
    public void testLevelAndIgnore() throws Exception {
        PrintStream original = System.out;
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try {
            System.setOut(new PrintStream(bytes, true, "UTF-8"));
            InterfaceLogger logger = new InterfaceLoggerFactoryWithIgnore(
                new DefaultLoggerFactory(LogLevel.INFO), "SECRET").getLogger(LoggingTest.class);
            logger.debug("debug");
            logger.info("visible");
            logger.error("SECRET");
        } finally {
            System.setOut(original);
        }
        String result = bytes.toString("UTF-8");
        assertTrue(result.contains("visible"));
        assertFalse(result.contains("debug"));
        assertFalse(result.contains("SECRET"));
    }

    public void testThreadFactory() {
        LoggerFactory.setFactory(new DefaultLoggerFactory(LogLevel.DEBUG));
        InterfaceLoggerFactory custom = new DefaultLoggerFactory(LogLevel.ERROR);
        LoggerFactoryThreads.setFactoryForCurrentThread(custom);
        try {
            assertNotNull(LoggerFactoryThreads.getLogger(LoggingTest.class));
        } finally {
            LoggerFactoryThreads.clearFactoryForCurrentThread();
        }
    }
}
