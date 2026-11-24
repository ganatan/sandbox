# 017 — Guide opérationnel : Rust, Prometheus et Grafana

## Objectif

Mettre en place une observabilité homogène sur quatre services Rust fictifs, de l'audit initial à la validation des dashboards. Ce guide complète les documents 013 à 016. Tous les noms, ports et résultats sont illustratifs. Adapter les exemples aux conventions du projet réel. Ne jamais publier de données, code, adresses ou configurations internes.

## 1. Préparer le poste Fedora

```bash
cd ~/workspace/repositories
ls -la
rustc --version
cargo --version
git --version
podman --version
podman compose version
opencode --version
```

Exécuter Podman sur l'hôte si le moteur n'est pas accessible depuis Distrobox. Utiliser les images et dépendances autorisées par l'organisation. Vérifier les fichiers AGENTS.md et les instructions locales. Ne transmettre aucun secret au LLM.

Dans chaque dépôt :

```bash
git status --short
git branch --show-current
git rev-parse HEAD
git log -10 --oneline
cargo metadata --no-deps --format-version 1
cargo tree --depth 1
```

Conserver le SHA de référence et les résultats de tests initiaux. Ne pas écraser les modifications locales. Créer une branche de travail selon les conventions du projet.

## 2. Auditer les quatre services

```bash
rg -n 'prometheus|metrics|opentelemetry|histogram|counter|gauge' .
rg -n 'kafka|consumer|producer|redis|reject|track' src
rg --files | grep -E 'Cargo.toml|Cargo.lock|values.yaml|compose|ServiceMonitor|PodMonitor'
cargo tree | grep -Ei 'prometheus|metrics|opentelemetry'
```

Pour chaque service, identifier le point d'entrée, les modules, le consumer, le producer, les appels Redis, les traitements métier, les erreurs, les retries et l'exporter. Relever fichier, fonction, ligne et SHA. Suivre le flux réel plutôt que les noms des fonctions.

### Prompt OpenCode — audit

> Analyse ce dépôt en lecture seule. Identifie les flux entrants et sortants, les rejets, les traitements d'objets, les interactions Kafka et Redis, les métriques existantes, leur enregistrement et leur exposition. Pour chaque constat, cite le fichier, la fonction et la ligne. Distingue faits, hypothèses et questions. Ne modifie aucun fichier et ne réalise aucun commit.

### Matrice de couverture illustrative

| Besoin | A | B | C | D |
|---|---|---|---|---|
| Messages entrants | À vérifier | À vérifier | À vérifier | À vérifier |
| Messages sortants | À vérifier | À vérifier | À vérifier | À vérifier |
| Rejets | Selon responsabilité | Selon responsabilité | Selon responsabilité | Selon responsabilité |
| Objets traités | Selon responsabilité | Selon responsabilité | Selon responsabilité | Selon responsabilité |

Ne pas instrumenter un événement absent du service. Identifier les deux services concernés par le traitement métier et celui responsable des rejets.

**Sortie :** quatre audits et une synthèse consolidée.

## 3. Inventorier les métriques existantes

Créer un tableau avec service, nom, type, unité, labels, emplacement de déclaration, emplacement d'incrémentation, signification, exposition et statut. Distinguer métrique déclarée, effectivement enregistrée, exposée et collectée.

Comparer les métriques qui semblent équivalentes. Deux compteurs portant le même nom peuvent avoir des sémantiques différentes. Réutiliser les métriques existantes lorsque leur contrat est compatible. En cas de renommage, prévoir la migration des dashboards et alertes.

### Prompt OpenCode — consolidation

> Compare les quatre audits. Construis une matrice des métriques existantes et manquantes. Identifie les doublons sémantiques et divergences. Propose les changements minimaux, sans modifier le code. Signale les informations non vérifiées.

## 4. Définir le contrat commun

| Nom illustratif | Type | Événement |
|---|---|---|
| messages_received_total | Counter | Message remis au traitement applicatif |
| messages_sent_total | Counter | Publication confirmée |
| packets_received_total | Counter | Paquet soumis à validation |
| packets_rejected_total | Counter | Rejet définitif d'un paquet |
| objects_processed_total | Counter | Objet traité avec succès |
| processing_errors_total | Counter | Échec de traitement selon contrat |
| processing_duration_seconds | Histogram | Durée d'une tentative de traitement |
| http_requests_total | Counter | Requête HTTP terminée |
| http_request_duration_seconds | Histogram | Durée de la requête |
| active_objects | Gauge | Nombre courant d'objets actifs, si pertinent |

Un Counter est cumulatif et peut repartir de zéro au redémarrage. Une Gauge peut augmenter ou diminuer. Un Histogram classique expose des buckets cumulatifs, un count et une sum.

Définir pour chaque métrique : événement exact, unité, responsabilité, comportement en cas d'erreur, retry, doublon, batch et redémarrage. Un batch de dix objets traités ajoute dix au compteur d'objets et éventuellement un au compteur de messages. Un objet traité plusieurs fois n'est pas nécessairement un objet unique.

Les labels doivent être bornés : service, architecture, reason, outcome, route normalisée. Ne jamais utiliser UUID, identifiant d'objet, URL brute, payload ou texte libre. Le label service peut être ajouté par la découverte Prometheus plutôt que par le code. Éviter les collisions avec job et instance. Choisir les buckets de latence selon les objectifs et garder les mêmes pour les architectures comparées.

Le taux de rejet utilise les paquets reçus, pas les messages Kafka, sauf équivalence démontrée. Entrants moins sortants ne représente pas automatiquement des pertes : filtrage, fan-out, retries et buffers modifient cette relation.

**Sortie :** metrics-contract.md approuvé avant développement.

## 5. Instrumenter un premier service

Réutiliser la bibliothèque et l'exporter présents. Les exemples suivants supposent une version de la crate metrics compatible avec les handles counter! et histogram!, et un recorder installé avant utilisation.

```rust
metrics::counter!("messages_received_total").increment(1);
```

```rust
metrics::counter!("packets_rejected_total", "reason" => "invalid_format").increment(1);
```

```rust
let start = std::time::Instant::now();
let result = process_message(&message).await;
let outcome = if result.is_ok() { "success" } else { "error" };
metrics::histogram!("processing_duration_seconds", "outcome" => outcome)
    .record(start.elapsed().as_secs_f64());
result?;
```

Ce dernier exemple mesure les succès et erreurs retournées, mais pas les futures annulées ou les paniques. Définir explicitement ce périmètre. Pour Kafka, incrémenter messages_sent_total après confirmation du producer et non après simple mise en file. Pour Redis, distinguer durée, erreurs et éventuels retries si le besoin le justifie.

Initialiser les séries attendues à zéro lorsque la bibliothèque le permet, notamment pour les motifs bornés. Ne pas enregistrer un nouvel exporter à chaque requête. Vérifier l'endpoint et les permissions réseau.

### Prompt OpenCode — implémentation

> Implémente uniquement les métriques manquantes du contrat approuvé dans ce premier service. Réutilise les dépendances existantes. Préserve le comportement métier. Ajoute des tests sur succès, erreurs, rejets et batches. Présente le diff et les commandes de validation. Ne réalise aucun commit.

```bash
git diff --stat
git diff
cargo fmt --all -- --check
cargo check --locked
cargo clippy --locked --all-targets
cargo test --locked
cargo build --locked
```

Adapter les options workspace et features au pipeline CI. Les tests doivent isoler le recorder ou comparer les deltas sans interférence des tests parallèles.

## 6. Tester localement avec Podman, Kafka et Redis

```bash
podman compose config
podman compose up -d
podman compose ps
podman ps
podman network ls
podman logs --tail 100 service-a
podman port service-a
podman inspect service-a --format '{{json .NetworkSettings.Networks}}'
```

Si le conteneur contient un shell :

```bash
podman exec -it service-a sh
```

Depuis Fedora, si le port est publié :

```bash
curl -fsS http://localhost:9091/metrics
curl -fsS http://localhost:9091/metrics | grep -E 'messages_|packets_|objects_'
```

Depuis un conteneur sur le même réseau, utiliser le nom DNS du service et son port interne, pas localhost. Si l'image est minimale, utiliser un conteneur de diagnostic autorisé sur ce réseau.

Pour Kafka, adapter les exécutables et le bootstrap server à l'image existante :

```bash
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
podman exec kafka kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group demo-consumer
podman exec redis redis-cli PING
```

Utiliser uniquement des topics et données de test. Ne pas injecter de données sur un environnement partagé sans autorisation.

### Scénario de validation fictif

| Action | Delta attendu |
|---|---|
| 10 messages remis au traitement | received +10 |
| 8 publications confirmées | sent +8 |
| 2 paquets invalides sur 10 paquets | rejected +2 |
| 1 batch de 5 objets réussis | objects +5 |
| Échec de publication | sent +0 |
| Redémarrage | Reset possible des compteurs |

Les résultats dépendent du contrat et de la topologie. Capturer /metrics avant et après chaque scénario. Vérifier les retries, les erreurs Redis, les doublons et les cas de concurrence.

## 7. Configurer et vérifier Prometheus

Exemple local, à intégrer à la configuration existante :

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 10s
scrape_configs:
  - job_name: rust-services
    static_configs:
      - targets: ['service-a:9091']
        labels:
          service: service-a
      - targets: ['service-b:9091']
        labels:
          service: service-b
      - targets: ['service-c:9091']
        labels:
          service: service-c
      - targets: ['service-d:9091']
        labels:
          service: service-d
```

Prometheus doit partager le réseau des services. Vérifier la configuration avec promtool si disponible.

```bash
promtool check config prometheus.yml
curl -fsS http://localhost:9090/-/ready
curl -fsS http://localhost:9090/api/v1/targets
curl -fsSG http://localhost:9090/api/v1/query --data-urlencode 'query=up{job="rust-services"}'
```

Ouvrir /targets et vérifier chaque instance. UP signifie que le scrape réussit, pas que le traitement métier fonctionne.

Sur Kubernetes, vérifier les mécanismes existants :

```bash
kubectl get pods,svc -n demo
kubectl get servicemonitor,podmonitor -n demo
kubectl get endpointslices -n demo
```

Les deux ressources Monitor nécessitent les CRD correspondantes. Vérifier selectors, namespace, nom du port, chemin /metrics, NetworkPolicy et configuration de l'opérateur. Si Argo CD gère le déploiement, modifier les manifests ou valeurs Helm dans le dépôt prévu, pas les ressources à la main.

## 8. Écrire les requêtes PromQL

Débit entrant et sortant par service :

```promql
sum by (service) (rate(messages_received_total[5m]))
sum by (service) (rate(messages_sent_total[5m]))
```

Nombre estimé d'événements sur une heure :

```promql
sum by (service) (increase(packets_rejected_total[1h]))
sum by (service) (increase(objects_processed_total[1h]))
```

increase extrapole sur la fenêtre et peut retourner des valeurs fractionnaires. Pour un comptage exact de recette, comparer les compteurs bruts avant/après sans reset.

Taux de rejet, uniquement lorsque le dénominateur est positif :

```promql
100 *
sum by (service) (rate(packets_rejected_total[5m]))
/
(sum by (service) (rate(packets_received_total[5m])) > 0)
```

P95 par service avec histogrammes classiques :

```promql
histogram_quantile(0.95,
  sum by (service, le) (rate(processing_duration_seconds_bucket[5m]))
)
```

Durée moyenne :

```promql
sum by (service) (rate(processing_duration_seconds_sum[5m]))
/
sum by (service) (rate(processing_duration_seconds_count[5m]))
```

Disponibilité et diagnostic :

```promql
up{job="rust-services"}
absent(up{job="rust-services",service="service-a"})
sum by (service) (resets(messages_received_total[1h]))
scrape_samples_scraped{job="rust-services"}
```

Toujours appliquer rate avant sum pour gérer les resets individuels. Ne pas moyenner les percentiles des pods. Ne pas transformer systématiquement une série absente en zéro. Choisir une fenêtre rate suffisamment longue, typiquement au moins quatre intervalles de scrape.

## 9. Étendre aux autres services

Appliquer le contrat au deuxième service, puis aux suivants. Répéter audit, diff, tests, exposition, scrape et requêtes. Vérifier les noms, unités, labels et buckets identiques lorsque la sémantique est commune. Ne pas ajouter de métriques métier aux services non concernés.

## 10. Construire Grafana

Configurer une datasource Prometheus avec l'adresse accessible depuis le serveur Grafana, par exemple http://prometheus:9090 sur le réseau local. Vérifier Save & Test. Dans Explore, tester up puis les requêtes métier.

Créer trois dashboards :

| Dashboard | Panels |
|---|---|
| Services Overview | Disponibilité, débit entrant/sortant, erreurs, latence |
| Business Processing | Objets traités, paquets rejetés, taux et motifs |
| API Comparison | Débit, erreurs, P50/P95/P99, CPU, mémoire, replicas |

Utiliser Time series pour les débits et latences, Stat pour les totaux, Table pour les instances et Bar chart pour les motifs. Définir les unités (req/s, messages/s, secondes, pourcentage). Utiliser les variables service et architecture, avec filtres regex pour la sélection multiple.

```promql
sum by (service) (rate(messages_received_total{service=~"$service"}[$__rate_interval]))
```

Pour le total sur la période du dashboard, utiliser increase avec $__range et une requête instantanée. Ne pas additionner les points d'une courbe rate. Définir le comportement No data séparément de zéro. Exporter les JSON avec UID stables et datasource paramétrable. Versionner les fichiers et tester leur import sur une instance de test.

## 11. Comparer deux architectures API

Établir un protocole avant de mesurer. Utiliser les mêmes requêtes, données, durée, profils de charge et critères de succès. Documenter ressources, replicas, versions, cache, réseau et générateur de charge. Séparer échauffement et mesure. Répéter les essais.

| Phase | Charge illustrative |
|---|---|
| Référence | 100 requêtes/s |
| Intermédiaire | 250 requêtes/s |
| Élevée | 500 requêtes/s |
| Saturation | Augmentation contrôlée |
| Scalabilité | Comparaison à plusieurs replicas |

Arrêter les tests selon les limites autorisées. Mesurer le débit effectivement réussi, pas seulement la charge proposée.

```promql
sum by (architecture) (rate(http_requests_total[5m]))
histogram_quantile(0.95,
  sum by (architecture, le) (rate(http_request_duration_seconds_bucket[5m]))
)
```

Calculer les erreurs selon le contrat des labels status ou outcome. Mesurer CPU et mémoire avec les métriques d'infrastructure disponibles. Surveiller Kafka lag et saturation Redis lorsque pertinents. Comparer à ressources égales, puis documenter séparément l'effet de l'ajout de replicas.

Une baisse de latence ne prouve pas à elle seule la scalabilité. Mesurer l'évolution du débit, de la latence et des ressources quand la charge et le nombre de replicas augmentent. Ne pas inventer de résultats.

## 12. Dépannage et alertes

| Symptôme | Vérification |
|---|---|
| /metrics inaccessible | Port, bind, réseau, logs |
| Target DOWN | Erreur de scrape, DNS, TLS, timeout |
| Métrique absente | Recorder, enregistrement, événement déclencheur |
| Prometheus OK, Grafana vide | Datasource, plage temporelle, labels |
| Compteur baisse | Reset, redémarrage, agrégation |
| P95 incohérent | Buckets, trafic, unités |
| Trop de séries | Labels dynamiques, cardinalité |

Exemple d'alerte locale à adapter :

```yaml
groups:
  - name: rust-services
    rules:
      - alert: RustServiceScrapeFailed
        expr: up{job="rust-services"} == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Scrape failed for {{ $labels.instance }}"
```

Cette alerte ne détecte pas une cible disparue de la découverte. Ajouter des contrôles d'absence pour les services attendus. Valider les règles avec promtool check rules et, si possible, promtool test rules. Définir les seuils métier avec l'équipe et vérifier le routage des notifications.

## 13. Documentation et livraison

```text
observability/
  README.md
  doc/
    requirements.md
    services-audit.md
    metrics-inventory.md
    metrics-contract.md
    local-testing.md
    promql-queries.md
    performance-comparison.md
    validation.md
  prometheus/
    prometheus.yml
    rules.yml
  grafana/
    dashboards/
      services-overview.json
      business-processing.json
      api-comparison.json
```

Cette structure est une proposition ; respecter les dépôts et mécanismes de déploiement existants. Conserver les preuves de test dans les espaces internes autorisés.

### Critères d'acceptation

- [ ] Les quatre services ont été audités.
- [ ] Les métriques existantes ont été réutilisées lorsque compatibles.
- [ ] Le contrat définit précisément chaque événement et label.
- [ ] Les messages entrants et sortants sont comptés aux bons endroits.
- [ ] Les rejets sont mesurés par le service responsable.
- [ ] Les deux services métier concernés comptent les objets traités.
- [ ] Les tests Rust et les scénarios locaux passent.
- [ ] Toutes les cibles attendues sont collectées.
- [ ] Les requêtes gèrent resets, replicas et absence de données.
- [ ] Les dashboards sont exportés et importables.
- [ ] La comparaison API repose sur des mesures reproductibles.
- [ ] Les modifications sont relues et les critères du ticket validés.

## 14. Ordre de travail quotidien

Commencer par les audits et le contrat. Instrumenter un seul service et obtenir une preuve de bout en bout : événement de test, compteur Rust, endpoint /metrics, scrape Prometheus, requête PromQL et panel Grafana. Répéter ensuite sur les autres services. Terminer par les tests comparatifs et la recette.

### Prompt OpenCode — revue finale

> Compare le diff au contrat de métriques et aux critères d'acceptation. Recherche doubles comptages, erreurs de labels, cardinalité excessive, oublis sur les branches d'erreur, problèmes de concurrence et modifications métier involontaires. Vérifie les tests et la cohérence des requêtes. Présente les preuves et les points non validés. Ne modifie rien et ne réalise aucun commit.

## Références

- https://prometheus.io/docs/practices/naming/
- https://prometheus.io/docs/prometheus/latest/querying/functions/
- https://grafana.com/docs/grafana/latest/
- https://docs.rs/metrics/
- https://docs.podman.io/
