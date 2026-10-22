package com.ganatan.cinema.log;

public class InterfaceLoggerFactoryWithIgnore implements InterfaceLoggerFactory {
    private final InterfaceLoggerFactory delegate;
    private final String ignoredText;

    public InterfaceLoggerFactoryWithIgnore(InterfaceLoggerFactory delegate, String ignoredText) {
        this.delegate = delegate;
        this.ignoredText = ignoredText;
    }

    @Override
    public InterfaceLogger getLogger(Class<?> type) {
        final InterfaceLogger logger = delegate.getLogger(type);
        return new InterfaceLogger() {
            @Override
            public void log(LogLevel level, String message) {
                if (message != null && !message.contains(ignoredText)) {
                    logger.log(level, message);
                }
            }

            @Override
            public void debug(String message) { log(LogLevel.DEBUG, message); }

            @Override
            public void info(String message) { log(LogLevel.INFO, message); }

            @Override
            public void warn(String message) { log(LogLevel.WARN, message); }

            @Override
            public void error(String message) { log(LogLevel.ERROR, message); }
        };
    }
}
