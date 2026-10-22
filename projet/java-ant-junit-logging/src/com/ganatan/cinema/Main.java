package com.ganatan.cinema;

import com.ganatan.cinema.log.*;

public class Main {
    public static void main(String[] args) {
        LoggerFactory.setFactory(new DefaultLoggerFactory(LogLevel.DEBUG));
        InterfaceLogger logger = LoggerFactory.getLogger(Main.class);
        logger.info("Demarrage du catalogue");
        logger.debug("Chargement du film Alien");
        LoggerFactoryThreads.setFactoryForCurrentThread(new DefaultLoggerFactory(LogLevel.ERROR));
        LoggerFactoryThreads.getLogger(Main.class).info("Message ignore par le niveau ERROR");
        LoggerFactoryThreads.getLogger(Main.class).error("Erreur de demonstration");
        LoggerFactoryThreads.clearFactoryForCurrentThread();
        LoggerFactory.setFactory(new InterfaceLoggerFactoryWithIgnore(new DefaultLoggerFactory(LogLevel.DEBUG), "SECRET"));
        LoggerFactory.getLogger(Main.class).info("Film visible");
        LoggerFactory.getLogger(Main.class).info("Film SECRET masque");
    }
}
