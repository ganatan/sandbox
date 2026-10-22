package com.ganatan.cinema.log;

public class DefaultLoggerFactory implements InterfaceLoggerFactory {
    private final LogLevel minimumLevel;

    public DefaultLoggerFactory(LogLevel minimumLevel) {
        this.minimumLevel = minimumLevel;
    }

    @Override
    public InterfaceLogger getLogger(Class<?> type) {
        return new DefaultLogger(type.getSimpleName(), minimumLevel);
    }
}
