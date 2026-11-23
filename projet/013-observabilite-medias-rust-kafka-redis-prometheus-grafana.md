# 013 — Observabilité des médias : Rust, Kafka, Redis, Prometheus et Grafana

## 1. Objectif

Mettre en place une observabilité homogène pour une plateforme fictive **ganatan** de traitement de médias. Plusieurs services Rust consomment des événements Kafka, enrichissent ou filtrent les médias, persistent des états dans Redis et exposent des données à des applications Angular composées en micro-frontends (MFE).

Le scénario de référence comprend quatre services Rust à observer, trois nouveaux services issus de forks de services historiques mono-instance, et une nouvelle architecture Kubernetes à plusieurs pods. Les nombres sont des hypothèses de travail, pas un inventaire de production.

Le but est de **réutiliser les métriques existantes avant d'en ajouter**, de compter les messages entrants/sortants, les médias traités, les événements rejetés, puis de comparer les anciennes et nouvelles API sous charge comparable.

## 2. Architecture et responsabilités

```text
Sources de médias
      |
      v
Kafka (topics, partitions, consumer groups)
      |
      +--> Rust ingest (pod A/B/C) ----+
      +--> Rust enrich (pod A/B) ------+--> Redis (états/cache)
      +--> Rust filter (pod A/B) ------+
      +--> Rust API / diffusion -------+--> API HTTP / WebSocket
                                                |
                                      Angular Shell + MFE
                                            
Chaque pod Rust -- /metrics --> Prometheus <-- exporters Kafka/Redis/Kubernetes
                                      |
                                   Grafana
```

Ce dessin est conceptuel : les véritables topics, appels, dépendances et flux doivent être retrouvés dans le code. Kafka transporte les événements, Redis conserve des états selon sa configuration de persistance (RDB/AOF ou aucune), Prometheus collecte les séries temporelles et Grafana interroge Prometheus. Grafana n'est pas le stockage principal des métriques.

Trois piliers de l'observabilité : **métriques** (mesures agrégées), **logs** (événements détaillés), **traces** (chemin d'une opération). Le ticket porte d'abord sur les métriques. Ne jamais ajouter un identifiant de média à un label Prometheus pour « suivre » un média individuel : utiliser logs/traces corrélés si ce besoin apparaît.

## 3. Vocabulaire métier : média, événement, traitement, état

- **Média** : objet métier identifié, par exemple un film ou une série, et ses métadonnées.
- **Événement** : message Kafka décrivant une création, mise à jour, enrichissement ou suppression.
- **Message reçu** : événement livré à un consumer, avant validation et traitement.
- **Message traité** : tentative de traitement terminée avec succès selon le contrat choisi.
- **Message publié** : événement confirmé par le broker Kafka (et non seulement placé dans une file locale).
- **Message rejeté** : événement écarté volontairement, avec une raison explicite.
- **Média actif** : média distinct présent dans un état de référence, pas le nombre de messages.
- **Média traité** : opération métier exécutée sur un média ; le même média peut être traité plusieurs fois.
- **État Redis** : représentation stockée pouvant être partagée par plusieurs pods.

Un événement peut contenir plusieurs médias ; un média peut générer plusieurs événements. Ne pas assimiler compteur de messages, compteur de traitements et nombre de médias distincts.

## 4. Matrice des besoins

| Besoin | Type | Mesure recommandée | Point d'instrumentation |
|---|---|---|---|
| Messages entrants | Counter | `messages_received_total` | Après livraison Kafka au consumer |
| Messages sortants | Counter | `messages_sent_total` | Après confirmation de publication |
| Messages traités | Counter | `messages_processed_total` | Après traitement réussi |
| Messages rejetés | Counter | `messages_dropped_total` | Décision définitive de rejet |
| Erreurs de traitement | Counter | `message_processing_errors_total` | Branche d'erreur |
| Durée de traitement | Histogram | `message_processing_duration_seconds` | Autour du traitement |
| Médias traités | Counter | `media_processed_total` | Traitement métier validé |
| Médias actifs | Gauge | `media_active` | Source d'état autoritative |
| Opérations Redis | Counter | `redis_operations_total` | Après opération, par résultat |
| Latence Redis | Histogram | `redis_operation_duration_seconds` | Autour des appels |
| Requêtes HTTP | Counter | `http_requests_total` | Middleware API |
| Durée HTTP | Histogram | `http_request_duration_seconds` | Middleware API |
| Version déployée | Gauge | `service_build_info` | Initialisation, valeur 1 |

Ces noms sont des **propositions**. Avant de renommer, inventorier les métriques et dashboards existants. Les conventions doivent être documentées et les éventuels renommages migrés sans rupture.

## 5. Convention commune

Labels applicatifs de faible cardinalité : `service`, `operation`, `result`, `reason`, `topic` (liste contrôlée), `method`, `route` (template), `status_class`, `architecture` (legacy/scalable). Les labels `pod`, `namespace`, `cluster`, `environment` sont généralement ajoutés par la découverte de cibles et le relabeling Prometheus.

Ne jamais utiliser comme labels : identifiant de média, clé Redis, UUID de message, URL complète avec paramètres, texte d'erreur arbitraire, utilisateur, payload ou donnée sensible. Définir un ensemble borné de raisons de rejet : `invalid_payload`, `unsupported_type`, `duplicate`, `business_rule`, `other`.

Types :
- **Counter** : valeur cumulative monotone entre redémarrages ; utiliser `rate()` ou `increase()`.
- **Gauge** : état instantané qui monte et descend ; ne pas sommer des copies identiques.
- **Histogram** : distribution des durées ; agréger les buckets avant de calculer les quantiles.

Unités explicites : secondes pour les durées, octets pour les tailles, total pour les compteurs. Ne pas utiliser des millisecondes dans une métrique suffixée `_seconds`.

## 6. Audit initial des dépôts

Sur Fedora, dans chaque dépôt local :

```bash
git status --short
cat Cargo.toml
rg -n 'metrics|prometheus|opentelemetry|tracing' .
rg -n 'rdkafka|kafka|redis|axum|actix|tonic' .
rg -n 'consumer|producer|publish|send|receive|process|reject' src
rg -n 'ServiceMonitor|PodMonitor|prometheus.io|/metrics' .
```

Inspecter `Cargo.lock`, le code de démarrage, les middlewares, les handlers Kafka, les clients Redis, les manifests Helm/Kubernetes, les règles Prometheus, les dashboards et les tests. Pour chaque couple ancien/fork, établir :

| Champ | Ancien | Fork | Décision |
|---|---|---|---|
| Framework HTTP | À relever | À relever | Réutiliser middleware |
| Bibliothèque métriques | À relever | À relever | Conserver si adaptée |
| Endpoint /metrics | À vérifier | À vérifier | Exposer si absent |
| Kafka consumer/producer | À relever | À relever | Instrumenter |
| Redis | À relever | À relever | Mesurer latence/erreurs |
| Noms de métriques | À relever | À relever | Harmoniser |
| Labels Kubernetes | À vérifier | À vérifier | Corriger la collecte |
| Dashboards existants | À relever | À relever | Réutiliser |

**Ne pas coder avant d'avoir rempli cette matrice.** Un ancien service déjà correctement instrumenté peut rester inchangé. Une comparaison peut aussi exploiter des métriques d'ingress, de proxy ou d'exporters sans modifier l'application historique.

## 7. Exemple Rust : instrumentation des événements

Exemple de principe avec la crate `metrics` ; adapter à la version réelle du projet et initialiser un recorder compatible Prometheus au démarrage. Les appels de traitement sont illustratifs.

```rust
use metrics::{counter, histogram};
use std::time::Instant;

async fn handle_message(payload: &[u8]) -> Result<(), String> {
    counter!("messages_received_total", "service" => "media-enricher").increment(1);
    let started = Instant::now();

    let result = process_media(payload).await;

    histogram!(
        "message_processing_duration_seconds",
        "service" => "media-enricher"
    ).record(started.elapsed().as_secs_f64());

    match result {
        Ok(()) => {
            counter!("messages_processed_total", "service" => "media-enricher").increment(1);
            Ok(())
        }
        Err(error) => {
            counter!("message_processing_errors_total", "service" => "media-enricher").increment(1);
            Err(error)
        }
    }
}
```

La fonction `process_media` est à implémenter dans le service. **Ne pas compter un rejet métier comme un échec technique par défaut** : décider si le message est rejeté, retenté ou envoyé vers une dead-letter queue (DLQ). Incrémenter `messages_sent_total` seulement après accusé de réception Kafka selon la garantie de publication choisie. Éviter les doubles incréments sur retry.

Si les services utilisent `opentelemetry`, `prometheus` ou une instrumentation maison, conserver la solution existante plutôt que d'ajouter une deuxième pile.

## 8. Kafka : règles de mesure

- Chaque pod possède ses compteurs locaux.
- Les pods d'un même consumer group se répartissent les partitions ; le parallélisme actif dépend notamment du nombre de partitions.
- Les retries, redeliveries et rééquilibrages peuvent produire plusieurs tentatives pour un même événement.
- Une publication confirmée n'implique pas que le consommateur suivant a traité le message.
- Distinguer : reçu, validé, traité, publié, rejeté, erreur, retry, DLQ.
- Le **consumer lag** provient des offsets Kafka et d'un exporter/collecteur adapté ; il ne se déduit pas simplement de la différence entre deux compteurs applicatifs.

Mesurer le débit de réception :

```promql
sum by (service) (rate(messages_received_total[5m]))
```

Débit par pod :

```promql
sum by (service, pod) (rate(messages_received_total[5m]))
```

Rejets pendant une heure :

```promql
sum by (service, reason) (increase(messages_dropped_total[1h]))
```

Taux d'erreur de traitement :

```promql
sum by (service) (rate(message_processing_errors_total[5m]))
/
clamp_min(sum by (service) (rate(messages_received_total[5m])), 1e-9)
```

Le ratio est indicatif : pour un vrai taux de tentatives échouées, utiliser un dénominateur cohérent avec les tentatives et la même fenêtre. Ne pas considérer la différence entre messages reçus et sortants comme une perte sans tenir compte des filtres, regroupements et transformations.

## 9. Redis : persistance, cohérence et comptage

Redis peut servir de cache, d'état partagé ou de stockage avec persistance RDB/AOF selon sa configuration. Vérifier le mode réellement activé, la politique d'expiration et la source de vérité.

Pour `media_active`, trois stratégies :
1. **Source autoritative** : une seule instance responsable expose la valeur.
2. **Partitionnement exclusif** : chaque pod possède des médias disjoints ; la somme est alors valide.
3. **État répliqué** : plusieurs pods voient les mêmes médias ; la somme est fausse, privilégier une mesure centralisée.

Éviter `KEYS *` et les scans lourds en production. Un `SCARD` sur un ensemble maintenu explicitement ou une statistique métier pré-calculée peut convenir si son contrat est correct. Les expirations et écritures concurrentes doivent être prises en compte. Un compteur de clés Redis ne représente pas nécessairement le nombre de médias actifs.

## 10. Prometheus : exposition et collecte

L'application expose généralement un endpoint HTTP `/metrics` au format compatible Prometheus. Un exporter Rust peut le fournir. Le port est défini par le projet, et l'endpoint doit être protégé selon les règles internes.

Exemple de scrape statique **uniquement pour un test local** :

```yaml
scrape_configs:
  - job_name: media-rust
    scrape_interval: 15s
    static_configs:
      - targets:
          - media-service-a:9091
          - media-service-b:9091
```

Dans Kubernetes, utiliser la découverte des pods/endpoints et les ressources `ServiceMonitor` ou `PodMonitor` **si Prometheus Operator est installé** ; sinon employer la configuration de scrape de l'environnement. Vérifier que chaque pod est une cible distincte et que les labels `service`, `pod`, `namespace`, `architecture` sont disponibles sans cardinalité excessive.

Commandes de vérification :

```bash
cargo fmt --check
cargo test
cargo clippy --all-targets
curl -fsS http://localhost:9091/metrics
kubectl get pods -n ganatan
kubectl get svc -n ganatan
kubectl get servicemonitors -n ganatan
```

Les commandes Kubernetes dépendent des droits, du namespace et des CRD installées ; le port 9091 est fictif. En cas de doute, vérifier les cibles Prometheus et la requête `up`.

## 11. Grafana : dashboards recommandés

### Dashboard A — Vue d'ensemble

- Disponibilité des services et des pods.
- Débit de messages entrants/sortants par service.
- Rejets, erreurs, retries.
- Durée de traitement p50/p95/p99.
- CPU, mémoire, redémarrages, nombre de réplicas.

### Dashboard B — Chaîne des médias

- Médias traités/s par service.
- Médias actifs selon la source de vérité.
- Répartition des rejets par raison.
- Lag Kafka par consumer group.
- Erreurs Redis et latence des opérations.
- Fraîcheur des dernières mises à jour, si un indicateur métier fiable existe.

### Dashboard C — Comparaison legacy/scalable

- Même charge d'entrée, même scénario, même période de test.
- Débit traité, latence, erreurs et rejets.
- Consommation CPU/mémoire **totale** et **par instance**.
- Nombre de réplicas et évolution lors de la montée en charge.
- Consumer lag et saturation des partitions Kafka.
- Coût relatif par événement traité si les données existent.

### Dashboard D — API et Angular MFE

- Requêtes API, taux d'erreur HTTP, latence par route normalisée.
- Temps de réponse et saturation côté serveur.
- Les performances frontend nécessitent une instrumentation navigateur distincte (RUM, Web Vitals, erreurs JavaScript). Ne pas les déduire des seules métriques Rust.
- Ne pas ajouter de métriques frontend sans besoin explicite du ticket.

Variables Grafana : `environment`, `architecture`, `service`, `namespace`, éventuellement `pod`. Les filtres ne doivent pas masquer les écarts de périmètre.

## 12. PromQL : requêtes réutilisables

Disponibilité par service :

```promql
min by (service) (up{job="media-rust"})
```

Cette requête donne 0 si au moins une cible du service est indisponible, et non une disponibilité métier complète. Pour mesurer la proportion de pods UP, utiliser `avg by (service)`.

Messages sortants/s :

```promql
sum by (service) (rate(messages_sent_total[5m]))
```

Médias traités/s :

```promql
sum by (service) (rate(media_processed_total[5m]))
```

Latence p95 de traitement (buckets classiques) :

```promql
histogram_quantile(
  0.95,
  sum by (service, le) (
    rate(message_processing_duration_seconds_bucket[5m])
  )
)
```

La requête suppose un histogramme classique exposant `_bucket`. Adapter pour les histogrammes natifs Prometheus si utilisés.

Médias actifs :

```promql
media_active
```

Ne pas faire de `sum by(service)` sur cette gauge avant d'avoir confirmé qu'elle est partitionnée et non dupliquée.

## 13. Comparer ancien et fork : protocole rigoureux

1. Vérifier les mêmes entrées métier, versions de schéma et règles fonctionnelles.
2. Définir une charge reproductible et des volumes représentatifs.
3. Distinguer mesure en régime stable et phase de montée en charge.
4. Vérifier la configuration Kafka : topics, partitions, consumer groups, retries.
5. Vérifier Redis : capacité, réseau, politique d'expiration, cohérence des données.
6. Mesurer p50/p95/p99, débit, erreurs, backlog, CPU, mémoire et réplicas.
7. Répéter les essais et noter les versions des images, paramètres et horaires.
8. Comparer le débit maximal soutenable sous un seuil de latence/erreurs défini.
9. Ne pas conclure que « scalable = plus rapide » à charge faible ; la propriété recherchée est la capacité à augmenter le débit en ajoutant des ressources.
10. Documenter les limitations : quotas Kubernetes, partitions Kafka, saturation Redis, contention, appels externes.

## 14. Alertes et SLO

Définir d'abord les objectifs de service (SLO) avec l'équipe. Exemples d'alertes à discuter : cible indisponible durablement, consumer lag en hausse, taux d'échec supérieur au seuil accepté, absence inattendue de messages, latence p95 dégradée, nombre de rejets anormal, saturation Redis. Ne pas fixer des seuils arbitraires en production.

Chaque alerte doit préciser : périmètre, gravité, durée de maintien (`for`), propriétaire, lien vers dashboard, procédure de diagnostic et risque de faux positif.

## 15. Tests et critères d'acceptation

### Tests unitaires et intégration

- Un message reçu incrémente une fois le compteur défini.
- Un succès incrémente le compteur de traitements réussis.
- Un rejet incrémente la raison attendue, sans erreur technique fictive.
- Une erreur Kafka ou Redis est mesurée et propagée selon le contrat.
- Un retry n'est pas confondu avec un événement métier unique.
- Les durées sont exprimées en secondes.
- Les métriques exposées sont valides et les labels bornés.
- Les redémarrages de pods n'entraînent pas d'interprétation erronée des counters.

### Tests multi-pods

- Chaque pod apparaît comme cible Prometheus distincte.
- L'agrégation des counters donne un débit global cohérent.
- La répartition Kafka est cohérente avec les partitions.
- Les médias actifs ne sont pas doublement comptés.
- Les dashboards restent corrects lors d'un scale-up, scale-down ou redémarrage.
- Les métriques des anciennes API et des forks sont comparables sans changer de sens.

### Livraison

- Matrice ancien/fork remplie.
- Convention des métriques validée.
- Code instrumenté uniquement là où nécessaire.
- Tests exécutés et résultats consignés.
- Scrape Prometheus vérifié.
- Dashboards versionnés (JSON/provisioning si applicable).
- Documentation des requêtes PromQL et des limites.
- Aucune modification des anciens services sans justification.

## 16. Méthode OpenCode

**Phase 1 : audit en lecture seule**

```text
Analyse les dépôts Rust locaux de la plateforme ganatan, y compris les services historiques et leurs forks scalables.
Identifie les frameworks, consumers/producers Kafka, opérations Redis, endpoints HTTP, instrumentation existante, configurations Kubernetes/Prometheus et dashboards.
Construis une matrice par service et par métrique : existante, absente, partiellement exploitable, à vérifier.
Ne modifie aucun fichier, ne crée aucun commit et ne suppose pas de comportements non démontrés.
Génère results/observability-audit.md avec chemins de fichiers et preuves.
```

**Phase 2 : contrat**

```text
À partir de results/observability-audit.md, propose un contrat commun de métriques pour les messages, médias, rejets, Redis et API.
Distingue counter/gauge/histogram, unités, labels, moment d'incrémentation et risque de double comptage en multi-pods.
Privilégie la réutilisation des métriques existantes.
Génère results/observability-contract.md sans modifier le code.
```

**Phase 3 : implémentation ciblée**

```text
Sur un seul fork Rust sélectionné, implémente uniquement les métriques manquantes approuvées.
Réutilise la bibliothèque d'observabilité déjà présente.
Ajoute les tests unitaires et d'intégration utiles.
Exécute cargo fmt --check, cargo test et cargo clippy si l'environnement le permet.
Présente le diff, les résultats des tests et les limitations.
Ne crée aucun commit.
```

**Phase 4 : Grafana et validation**

```text
À partir du contrat validé et des séries réellement exposées, propose des requêtes PromQL et des dashboards Grafana pour le débit, les rejets, les médias, Redis, Kafka et la comparaison legacy/scalable.
Ne fabrique aucune série ni aucun résultat de benchmark.
Indique pour chaque panneau la métrique source, les labels requis et les hypothèses d'agrégation.
```

## 17. Plan d'exécution opérationnel

**Jour 1 — Compréhension** : récupérer le ticket, les critères d'acceptation, les quatre services concernés, les trois couples ancien/fork, les topics Kafka et les métriques existantes.

**Jour 2 — Audit** : exécuter OpenCode en lecture seule, inspecter Cargo.toml, le code Rust, les manifests et les dashboards ; produire la matrice.

**Jour 3 — Conception** : valider les définitions métier des messages et médias, les points de comptage, les labels et les règles d'agrégation.

**Jour 4 — Prototype** : instrumenter un fork, tester /metrics, la collecte Prometheus et les requêtes Grafana.

**Suite — Généralisation** : étendre aux autres services, comparer les anciennes API, exécuter les tests multi-pods, versionner dashboards et documentation.

Ce calendrier est une **séquence de travail indicative**, pas un engagement de durée.

## 18. Pièges fréquents

- Ajouter un deuxième exporteur alors qu'un existe.
- Incrémenter « envoyé » avant la confirmation Kafka.
- Confondre message reçu, traitement réussi et média distinct.
- Additionner une gauge d'état répliqué sur tous les pods.
- Utiliser un ID média comme label Prometheus.
- Calculer la p95 en faisant la moyenne des p95 des pods.
- Confondre lag Kafka et erreurs applicatives.
- Comparer une ancienne API et une scalable avec des charges différentes.
- Ignorer les retries, redémarrages et changements de partitions.
- Modifier l'ancienne architecture sans nécessité.
- Supposer que Grafana reçoit directement les métriques Rust.
- Considérer Redis comme durable sans vérifier RDB/AOF et les garanties attendues.
- Modifier les MFE Angular alors que le besoin concerne seulement les backends.

## 19. Glossaire

- **Observabilité** : capacité à comprendre l'état d'un système à partir de ses signaux.
- **Instrumentation** : code produisant métriques, logs ou traces.
- **Prometheus** : collecte et stockage de séries temporelles.
- **PromQL** : langage de requête Prometheus.
- **Grafana** : visualisation et alerting sur des sources de données.
- **Exporter** : composant exposant des mesures dans un format collectable.
- **Scrape** : récupération périodique des métriques.
- **Counter** : compteur cumulatif.
- **Gauge** : valeur instantanée.
- **Histogram** : distribution de valeurs, par exemple latences.
- **Cardinalité** : nombre de combinaisons de labels créant des séries.
- **Kafka** : plateforme de transport et journalisation d'événements.
- **Topic** : flux logique d'événements Kafka.
- **Partition** : sous-ensemble ordonné d'un topic.
- **Consumer group** : ensemble de consommateurs partageant les partitions.
- **Lag** : retard de consommation exprimé en offsets.
- **Redis** : stockage clé-valeur en mémoire avec options de persistance.
- **Kubernetes** : orchestration de conteneurs.
- **Pod** : unité de déploiement Kubernetes.
- **Fork** : dérivation d'un code source existant.
- **Scalabilité horizontale** : capacité à ajouter des instances.
- **MFE** : micro-frontend, découpage d'une interface en applications intégrées.
- **SLO** : objectif mesurable de niveau de service.
- **DLQ** : file/topic de messages non traités destinés à l'analyse ou au retraitement.

## 20. Références techniques

- Prometheus — https://prometheus.io/docs/
- Prometheus instrumentation — https://prometheus.io/docs/practices/instrumentation/
- Prometheus naming — https://prometheus.io/docs/practices/naming/
- PromQL — https://prometheus.io/docs/prometheus/latest/querying/basics/
- Grafana — https://grafana.com/docs/grafana/latest/
- Apache Kafka — https://kafka.apache.org/documentation/
- Redis — https://redis.io/docs/latest/
- Kubernetes — https://kubernetes.io/docs/
- Rust metrics — https://docs.rs/metrics/
- Rust metrics exporter — https://docs.rs/metrics-exporter-prometheus/

---

**Règle finale : auditer → définir le contrat → instrumenter un fork → valider multi-pods → généraliser → comparer les architectures.**
