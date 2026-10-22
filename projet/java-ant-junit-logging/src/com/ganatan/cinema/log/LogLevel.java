package com.ganatan.cinema.log;

public enum LogLevel {
    DEBUG, INFO, WARN, ERROR;

    public boolean allows(LogLevel level) {
        return level.ordinal() >= ordinal();
    }
}
