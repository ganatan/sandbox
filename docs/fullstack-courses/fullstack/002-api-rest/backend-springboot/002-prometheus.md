
# Implementer prometheus

	pom.xml

		<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<dependency>
		<groupId>io.micrometer</groupId>
		<artifactId>micrometer-registry-prometheus</artifactId>
		</dependency>

# Parametres  application-properties
	management.endpoints.web.exposure.include=prometheus
	management.endpoint.prometheus.enabled=true
	management.endpoints.web.base-path=/management

	donnera
		http://localhost:3003/management/prometheus


	management.endpoints.web.exposure.include=prometheus
	management.endpoint.prometheus.enabled=true
	management.endpoints.web.base-path=/
		donnera
		http://localhost:3003/prometheus

# Paramatrage plus fin

	pom.xml

	???????
