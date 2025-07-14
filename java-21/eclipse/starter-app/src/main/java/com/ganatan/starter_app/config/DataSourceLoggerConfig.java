package com.ganatan.starter_app.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceLoggerConfig {

    @Bean
    @ConditionalOnExpression("!'${db.client}'.equals('mock')")
    public CommandLineRunner logDataSource(DataSource dataSource) {
        return args -> {
            String jdbcUrl = dataSource.getConnection().getMetaData().getURL();
            System.out.println(">> BASE ACTIVE : " + jdbcUrl);
        };
    }
}


//package com.ganatan.starter_app.config;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import javax.sql.DataSource;
//
//@Configuration
//public class DataSourceLoggerConfig {
//
//    @Bean
//    @ConditionalOnProperty(name = "db.client", havingValue = "mock", matchIfMissing = false, havingValueNot = "mock")
//    public CommandLineRunner logDataSource(DataSource dataSource) {
//        return args -> {
//            String jdbcUrl = dataSource.getConnection().getMetaData().getURL();
//            System.out.println(">> BASE ACTIVE : " + jdbcUrl);
//        };
//    }
//}
