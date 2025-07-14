package com.ganatan.starter_app.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@Configuration
@ConditionalOnProperty(name = "db.client", havingValue = "mock")
@EnableAutoConfiguration(exclude = {HibernateJpaAutoConfiguration.class})
public class DisableJpaInMockConfig {
    public DisableJpaInMockConfig() {
        System.out.println(">> JPA / Hibernate désactivé (mode MOCK).");
    }
}
