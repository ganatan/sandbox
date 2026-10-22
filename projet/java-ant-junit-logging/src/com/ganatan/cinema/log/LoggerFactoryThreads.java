package com.ganatan.cinema.log;

public final class LoggerFactoryThreads {
    private static final ThreadLocal<InterfaceLoggerFactory> FACTORIES = new ThreadLocal<InterfaceLoggerFactory>();

    private LoggerFactoryThreads() {}

    public static void setFactoryForCurrentThread(InterfaceLoggerFactory factory) {
        if (factory == null) {
            throw new IllegalArgumentException("factory");
        }
        FACTORIES.set(factory);
    }

    public static InterfaceLogger getLogger(Class<?> type) {
        InterfaceLoggerFactory factory = FACTORIES.get();
        return factory == null ? LoggerFactory.getLogger(type) : factory.getLogger(type);
    }

    public static void clearFactoryForCurrentThread() {
        FACTORIES.remove();
    }
}
