package com.angular.starter.config;

import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QdrantConfig {

	public QdrantConfig() {
		System.out.println("00000000001:constructor:QdrantConfig");
	}

    @Bean
    public QdrantClient qdrantClient() {
        return new QdrantClient(
            QdrantGrpcClient.newBuilder("localhost", 6334, false).build()
        );
    }
}
