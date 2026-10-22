package com.ganatan.cinema.log;

public final class LoggerFactory {
    private static volatile InterfaceLoggerFactory factory = new DefaultLoggerFactory(LogLevel.INFO);

    private LoggerFactory() {}

    public static void setFactory(InterfaceLoggerFactory value) {
        if (value == null) {
            throw new IllegalArgumentException("factory");
        }
        factory = value;
    }

    public static InterfaceLogger getLogger(Class<?> type) {
        return factory.getLogger(type);
    }
}
