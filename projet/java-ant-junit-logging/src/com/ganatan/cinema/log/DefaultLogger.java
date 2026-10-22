package com.ganatan.cinema.log;

public class DefaultLogger implements InterfaceLogger {
    private final String name;
    private final LogLevel minimumLevel;

    public DefaultLogger(String name, LogLevel minimumLevel) {
        this.name = name;
        this.minimumLevel = minimumLevel;
    }

    @Override
    public void log(LogLevel level, String message) {
        if (minimumLevel.allows(level)) {
            System.out.println("[" + level + "] [" + name + "] " + message);
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
}
