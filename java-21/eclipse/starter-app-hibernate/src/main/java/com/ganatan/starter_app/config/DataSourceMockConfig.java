package com.ganatan.starter_app.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(name = "db.client", havingValue = "mock")
public class DataSourceMockConfig {
    public DataSourceMockConfig() {
        System.out.println(">> Mode MOCK actif : aucun DataSource SQL chargé.");
    }
}
