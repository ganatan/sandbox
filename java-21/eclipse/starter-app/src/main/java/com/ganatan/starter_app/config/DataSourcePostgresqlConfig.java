package com.ganatan.starter_app.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

@Configuration
@ConditionalOnProperty(name = "db.client", havingValue = "pg")
public class DataSourcePostgresqlConfig {

    @Bean
    public DataSource dataSource(Environment env) {
        String url = "jdbc:postgresql://" +
                env.getProperty("db-pg-host") + ":" +
                env.getProperty("db-pg-port") + "/" +
                env.getProperty("db-pg-database");

        System.out.println(">> DataSource PostgreSQL : " + url);

        return DataSourceBuilder.create()
                .url(url)
                .username(env.getProperty("db-pg-user"))
                .password(env.getProperty("db-pg-password"))
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
