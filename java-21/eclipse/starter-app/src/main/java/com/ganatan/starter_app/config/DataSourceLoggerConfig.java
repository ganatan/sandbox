package com.ganatan.starter_app.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceLoggerConfig {

    @Bean
    public CommandLineRunner logDataSource(DataSource dataSource) {
        return args -> {
            String jdbcUrl = dataSource.getConnection().getMetaData().getURL();
            System.out.println(">> BASE ACTIVE : " + jdbcUrl);
        };
    }
}
