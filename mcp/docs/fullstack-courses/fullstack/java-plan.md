
# Révision Java Backend – Stack Spring Moderne

## 1. Base Java SE (Java 8 à 21)

- Java 8 : Streams, Lambdas, Optional, Date/Time API
- Java 11+ : `var`, `HttpClient`, améliorations API
- Java 17/21 : `records`, `sealed`, pattern matching, switch amélioré
- Concurrence : `ExecutorService`, `CompletableFuture`, Virtual Threads (Java 21)

---

## 2. Spring Framework (core)

- **IOC / DI** : `@Component`, `@Service`, `@Autowired`
- **Spring Boot** : starters, `@SpringBootApplication`, `application.yml`
- **Web MVC / REST** : `@RestController`, `@RequestMapping`, `@RequestBody`, `@PathVariable`
- **Configuration Java** : profiles, beans, properties
- **Tests Spring** : `@WebMvcTest`, `@DataJpaTest`, MockMvc, Testcontainers

---

## 3. Spring Data & Persistence

- **Spring Data JPA** : `CrudRepository`, `JpaRepository`, `@Query`, méthodes dérivées
- **Hibernate** : `@Entity`, relations (`@OneToMany`), lazy vs eager loading, N+1 problem
- **Transactions** : `@Transactional`, propagation, isolation
- **Migration BDD** : Flyway, Liquibase

---

## 4. Spring Security (v6)

- **Authentification** : `UserDetailsService`, `BCryptPasswordEncoder`
- **JWT** : `OncePerRequestFilter`, parsing token, `SecurityFilterChain`
- **OAuth2** : Google, GitHub, etc.
- **CORS / CSRF** : configuration fine dans `HttpSecurity`

---

## 5. Spring Cloud & Microservices

- **Config Server** : centralisation des `application.yml`
- **Discovery** : Eureka, Consul
- **Feign / WebClient** : appels interservices
- **API Gateway** : Spring Cloud Gateway
- **Résilience** : Resilience4j (circuit breaker)
- **Tracing** : Sleuth, Zipkin, OpenTelemetry

---

## 6. Tests, CI et Intégration

- **Tests unitaires** : JUnit 5, Mockito, AssertJ
- **Tests d’intégration** : Spring Test, Postman, Testcontainers
- **CI/CD** : GitLab CI, Maven, Docker, SonarQube, Jib

---

## 7. Outillage & Déploiement

- **Maven** : gestion dépendances, packaging
- **Docker** : Dockerfile, docker-compose
- **Monitoring** : Spring Boot Actuator, Prometheus, Grafana
- **Cloud / DevOps** : déploiement GCP, AWS, OpenShift, Heroku

---

## Synthèse des niveaux

| Niveau | Modules |
|--------|---------|
| 🟩 Noyau | Java 8+, Spring Boot, Web, JPA, REST |
| 🟨 Microservices | Spring Cloud, Feign, Gateway, Resilience4j |
| 🟧 Infra / CI | Docker, Maven, Actuator |
| 🟥 Spécifiques | Kafka, GraphQL, Keycloak, Vault (selon projet) |
