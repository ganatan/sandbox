package com.ganatan.starter_app.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

@Configuration
@ConditionalOnProperty(name = "db.client", havingValue = "mysql")
public class DataSourceMysqlConfig {

    @Bean
    public DataSource dataSource(Environment env) {
        String url = "jdbc:mysql://" +
                env.getProperty("db-mysql-host") + ":" +
                env.getProperty("db-mysql-port") + "/" +
                env.getProperty("db-mysql-database");

        System.out.println(">> DataSource MySQL : " + url);

        return DataSourceBuilder.create()
                .url(url)
                .username(env.getProperty("db-mysql-user"))
                .password(env.getProperty("db-mysql-password"))
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
