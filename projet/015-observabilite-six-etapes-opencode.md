# 015 — Méthode complète d'observabilité Rust en six étapes avec OpenCode

> Complément détaillé de [013 — Observabilité des médias](013-observabilite-medias-rust-kafka-redis-prometheus-grafana.md). Exemple métier : **ganatan**, avec des médias, des services Rust, Kafka, Redis, Prometheus, Grafana et Kubernetes. Les commandes et noms de métriques sont des propositions à adapter aux dépôts réellement audités.

## Objectif et philosophie

Rendre plusieurs services Rust **observables, mesurables et comparables**, sans réécrire inutilement l'existant. Les métriques doivent avoir un sens métier stable, être correctement exposées, réellement collectées et interprétées dans Grafana.

La chaîne est :

```text
Événements Kafka -> Services Rust -> Redis / Kafka / API
                         |
                   endpoint /metrics
                         |
                    Prometheus
                         |
                       Grafana
```

- **Rust** produit les métriques au moment des événements.
- **Prometheus** interroge chaque instance et conserve les séries temporelles.
- **Grafana** interroge Prometheus et affiche les indicateurs.
- **OpenCode** analyse le code, prépare les changements et les tests ; il ne remplace ni les mesures réelles ni les validations métier.

Les six étapes sont séquentielles : **auditer → contractualiser → instrumenter un service → valider Prometheus → construire Grafana → généraliser et comparer**.

---

## 1. Auditer les dépôts Rust

### Pourquoi

Ne pas ajouter de métriques avant de comprendre celles déjà présentes. Un service peut utiliser `metrics`, `prometheus`, `opentelemetry`, `tracing`, un middleware HTTP, un exporter ou des métriques collectées au niveau du proxy. Une instrumentation supplémentaire peut créer des doubles comptages ou des conventions incompatibles.

### Fonctionnement à analyser

Dans chaque dépôt, suivre un événement de bout en bout : réception Kafka, désérialisation, validation, traitement du média, accès Redis, publication Kafka, erreurs, retries, DLQ éventuelle. Relever où se produisent les événements et quelles branches les distinguent.

Inspecter aussi le démarrage Rust, les routes HTTP, l'endpoint `/metrics`, le `Cargo.toml`, `Cargo.lock`, les fichiers Helm/Kubernetes, la découverte Prometheus et les dashboards existants.

### Commandes

```bash
git status --short
cat Cargo.toml
rg -n 'metrics|prometheus|opentelemetry|tracing' .
rg -n 'rdkafka|kafka|redis|axum|actix|tonic' .
rg -n 'consumer|producer|publish|send|receive|process|reject|retry' src
rg -n 'ServiceMonitor|PodMonitor|prometheus.io|/metrics' .
```

Une recherche textuelle repère des indices ; elle ne prouve pas que l'instrumentation fonctionne. Il faut suivre les appels et vérifier la configuration réelle.

### Inventaire attendu

| Élément | Questions |
|---|---|
| Service | Responsabilité, ancien ou fork, version |
| Kafka | Topics, partitions, consumer group, producer, retries |
| Redis | Clés, opérations, expiration, source de vérité |
| Métriques | Nom, type, unité, labels, fichier, point d'émission |
| HTTP | Framework, port, chemin `/metrics` |
| Déploiement | Pods, ressources, ports, services, namespaces |
| Collecte | Job, scrape, labels, targets, règles |
| Dashboard | Requêtes PromQL existantes, dépendances |

### Prompt OpenCode — Audit

```text
Tu es expert Rust, Kafka, Redis, Kubernetes, Prometheus et Grafana.

MISSION
Auditer en lecture seule les dépôts Rust locaux de ganatan pour préparer un contrat d'observabilité.

TRAVAIL
1. Inventorier les services et leurs responsabilités.
2. Identifier les consumers/producers Kafka, topics, partitions, consumer groups et retries.
3. Identifier les opérations Redis et les sources d'état métier.
4. Localiser les points exacts de traitement des médias.
5. Repérer les branches succès, rejet, erreur, retry et publication confirmée.
6. Inventorier les bibliothèques de métriques, les middlewares et les endpoints /metrics.
7. Pour chaque métrique : relever nom, type, unité, labels, fichier, fonction et événement mesuré.
8. Examiner les configurations Kubernetes, Helm, Prometheus et Grafana disponibles.
9. Identifier les différences entre services historiques et forks lorsque le code le démontre.
10. Produire une matrice existant / manquant / à vérifier par service.

EXIGENCES
Fournir des chemins et des preuves vérifiables.
Distinguer faits, hypothèses et inconnues.
Ne pas déduire qu'une métrique fonctionne simplement parce qu'elle est déclarée.
Ne modifier aucun code ni configuration.
Ne créer aucun commit et ne divulguer aucun secret.

LIVRABLE
results/observability-audit.md :
inventaire, flux, métriques, matrice, risques, questions, priorités.
```

**Critère de sortie :** chaque service et chaque métrique pertinente ont une fiche suffisamment précise pour décider de ce qui doit être conservé, adapté ou créé.

---

## 2. Définir un contrat commun de métriques

### Pourquoi

Trois services peuvent mesurer le même événement sous des noms différents, ou utiliser le même nom pour des événements différents. Un dashboard ne peut pas comparer honnêtement des métriques dont la définition varie.

Exemple de divergence :

```text
service-a: received_messages
service-b: kafka_input_total
service-c: messages_received_total
```

Le contrat propose une convention commune **sans renommer aveuglément les métriques déjà utilisées**.

### Les six propriétés obligatoires

1. **Nom** exact.
2. **Type** : counter, gauge ou histogram.
3. **Unité** : secondes, octets, événements.
4. **Labels** : faible cardinalité et sens stable.
5. **Point de mesure** : instruction/branche du code.
6. **Sémantique des erreurs/retries** : quand incrémenter, quand ne pas incrémenter.

### Exemple de contrat

| Nom proposé | Type | Événement |
|---|---|---|
| `messages_received_total` | Counter | Message livré au consumer |
| `messages_processed_total` | Counter | Traitement réussi |
| `messages_sent_total` | Counter | Publication confirmée par Kafka |
| `messages_dropped_total` | Counter | Rejet définitif |
| `message_processing_errors_total` | Counter | Erreur technique |
| `media_processed_total` | Counter | Traitement métier terminé |
| `media_active` | Gauge | État courant depuis une source fiable |
| `message_processing_duration_seconds` | Histogram | Durée du traitement |

Les événements reçus, traités, rejetés et publiés ne sont pas nécessairement en correspondance 1:1. Un média peut produire plusieurs messages ; un message peut représenter plusieurs médias. Les retries peuvent multiplier les tentatives.

### Labels

Exemple :

```text
messages_dropped_total{service="media-filter",reason="invalid_payload"}
```

Labels possibles : `service`, `reason` (valeurs contrôlées), `operation`, `topic` (liste bornée), `route` (template). Ne jamais utiliser des UUID de message, identifiants de média, clés Redis ou textes d'erreur arbitraires comme labels.

Pour `media_active`, ne pas additionner des gauges si plusieurs pods exposent le même état partagé Redis.

### Prompt OpenCode — Contrat

```text
Tu es responsable du contrat Prometheus commun des services Rust ganatan.

SOURCES
results/observability-audit.md et code source pour confirmer les définitions.

TRAVAIL
1. Identifier les métriques existantes à conserver.
2. Relever les métriques équivalentes mais nommées différemment.
3. Proposer les noms canoniques et une migration compatible.
4. Définir type, unité, labels et point exact d'instrumentation.
5. Définir succès, rejet, erreur, retry, DLQ et publication Kafka confirmée.
6. Documenter les règles d'agrégation entre pods.
7. Signaler les risques de double comptage et de cardinalité.
8. Associer à chaque métrique une requête PromQL et un test de validation.
9. Fournir une matrice par service : existante, réutilisable, à adapter, à créer.

CONTRAINTES
Privilégier l'existant. Ne pas modifier de code. Ne pas créer de commit.
Ne pas confondre messages, traitements et médias distincts.
Ne pas sommer les états répliqués.

LIVRABLE
results/observability-contract.md.
```

**Critère de sortie :** les responsables techniques valident une définition commune avant toute modification.

---

## 3. Instrumenter un premier service Rust

### Pourquoi un seul service

Un pilote réduit le risque. Modifier quatre services à la fois complique le diagnostic lorsque les séries sont fausses ou absentes. Choisir un service représentatif : consumer Kafka, logique métier et, idéalement, publication ou accès Redis.

### Placement des mesures

```text
Kafka livre le message
  -> messages_received_total +1
Décodage / validation
  -> rejet définitif ? messages_dropped_total +1
Traitement métier
  -> histogramme de durée
  -> succès ? messages_processed_total +1
  -> erreur ? message_processing_errors_total +1
Publication Kafka
  -> accusé de réception confirmé ? messages_sent_total +1
```

Attention : un échec technique n'est pas automatiquement un rejet définitif. Le traitement d'un message réessayé peut être compté plusieurs fois selon la définition de « tentative ». Le contrat doit lever cette ambiguïté.

### Exemple Rust illustratif

```rust
use metrics::{counter, histogram};
use std::time::Instant;

async fn handle_message(payload: &[u8]) -> Result<(), String> {
    counter!("messages_received_total", "service" => "media").increment(1);

    let start = Instant::now();
    let result = process_media(payload).await;

    histogram!(
        "message_processing_duration_seconds",
        "service" => "media"
    ).record(start.elapsed().as_secs_f64());

    match result {
        Ok(()) => {
            counter!("messages_processed_total", "service" => "media").increment(1);
            Ok(())
        }
        Err(error) => {
            counter!("message_processing_errors_total", "service" => "media").increment(1);
            Err(error)
        }
    }
}
```

`process_media` représente une fonction du projet, absente de cet extrait. L'initialisation d'un recorder Prometheus compatible est également nécessaire. Réutiliser le système d'instrumentation existant, sans introduire de seconde pile.

### Vérifications

```bash
cargo fmt --check
cargo test
cargo clippy --all-targets
cargo build
curl -fsS http://localhost:9091/metrics
```

Le port est indicatif. Vérifier les compteurs sur succès, rejet, erreur et retry ; vérifier aussi les durées en secondes et la cardinalité.

### Prompt OpenCode — Implémentation

```text
Tu es développeur Rust senior spécialisé dans Prometheus.

SOURCES
results/observability-audit.md
results/observability-contract.md
Dépôt Rust pilote sélectionné.

MISSION
Instrumenter un seul service en respectant le contrat validé.

TRAVAIL
1. Localiser les fonctions et branches exactes à modifier.
2. Réutiliser la bibliothèque de métriques déjà présente.
3. Ajouter uniquement les métriques manquantes.
4. Incrémenter au bon moment, y compris pour les confirmations Kafka.
5. Distinguer succès, rejet, erreur et retry.
6. Mesurer les durées avec un histogramme en secondes.
7. Exposer ou compléter /metrics si nécessaire.
8. Ajouter les tests unitaires et d'intégration.
9. Exécuter cargo fmt --check, cargo test, cargo clippy --all-targets et cargo build si possible.
10. Vérifier le comportement après redémarrage.

CONTRAINTES
Un seul dépôt modifié.
Aucun changement métier non demandé.
Aucune seconde bibliothèque de métriques sans justification.
Pas de commentaires inutiles dans le code.
Aucun commit.
Ne jamais inventer les résultats des commandes.

LIVRABLE
results/observability-implementation.md :
fichiers modifiés, diff, points de mesure, tests, résultats, limites.
```

**Critère de sortie :** le pilote compile, les tests passent, l'endpoint est accessible et les métriques réagissent correctement aux scénarios prévus.

---

## 4. Vérifier Prometheus

### Pourquoi

Une instrumentation correcte ne garantit pas que Prometheus la collecte. Il faut vérifier séparément l'exposition HTTP, la découverte de cibles et la présence des séries.

### Fonctionnement

Chaque pod expose `/metrics`. Prometheus interroge chaque cible périodiquement et ajoute notamment les labels `job` et `instance`. Les compteurs de pods différents sont distincts ; on les agrège ensuite dans PromQL.

```text
messages_received_total{service="media",pod="media-a"} 1200
messages_received_total{service="media",pod="media-b"} 850
```

Ces valeurs sont cumulées depuis le démarrage de chaque instance ; elles ne représentent pas directement des messages par seconde.

### Vérifications

```bash
curl -fsS http://localhost:9091/metrics
kubectl get pods -n ganatan
kubectl get svc -n ganatan
kubectl get endpoints -n ganatan
kubectl get servicemonitors -n ganatan
```

`ServiceMonitor` n'existe que si le CRD est installé. Adapter namespace, port et URL à l'environnement.

Dans Prometheus :

```promql
up{job="media"}
```

```promql
messages_received_total{service="media"}
```

```promql
sum by (service) (rate(messages_received_total[5m]))
```

`up=0` signifie que la cible connue n'a pas été collectée avec succès. L'absence de série `up` peut indiquer une cible non découverte ou un filtre incorrect. Contrôler également les targets Prometheus et les labels réels.

### Prompt OpenCode — Collecte

```text
Tu es expert Prometheus, Kubernetes, Podman et Rust.

OBJECTIF
Vérifier de bout en bout la collecte du premier service instrumenté.

SOURCES
results/observability-contract.md
results/observability-implementation.md
Code et configurations disponibles.

TRAVAIL
1. Identifier le port et le chemin /metrics.
2. Vérifier l'endpoint et le format exposé.
3. Contrôler les noms, types, unités et labels.
4. Identifier les scrape jobs et la découverte de cibles.
5. Vérifier pods, services, namespaces, ports et accès réseau.
6. Tester up et la présence des séries attendues.
7. Vérifier rate, increase et les agrégations multi-pods.
8. Examiner les conséquences des redémarrages de pods.
9. Signaler les incohérences de configuration.

POUR CHAQUE CONTRÔLE
Commande ou requête, résultat observé, résultat attendu, statut OK/KO/À VÉRIFIER, correction proposée.

CONTRAINTES
Ne pas modifier Rust ni Kubernetes.
Ne pas créer de commit.
Ne jamais affirmer qu'une collecte fonctionne sans preuve.

LIVRABLE
results/observability-prometheus-validation.md.
```

**Critère de sortie :** chaque pod attendu est une cible identifiable, les métriques sont collectées et les requêtes PromQL donnent des résultats cohérents.

---

## 5. Construire Grafana

### Pourquoi

Les compteurs bruts sont difficiles à interpréter. Grafana transforme l'historique Prometheus en débits, volumes, taux d'erreur, latences et comparaisons.

### Dashboards recommandés

| Dashboard | Panneaux |
|---|---|
| Global | UP, messages/s, erreurs, latence, ressources |
| Kafka | Reçus, publiés, rejetés, retries, consumer lag |
| Media/Redis | Médias traités, état actif fiable, opérations et latence Redis |
| Scalabilité | Ancien/nouveau, débit, p95, pods, CPU, mémoire |

Ne pas déduire le lag Kafka d'une simple différence entre compteurs applicatifs ; utiliser une source de métriques Kafka appropriée.

### PromQL

Débit par service :

```promql
sum by (service) (
  rate(messages_received_total[5m])
)
```

Messages rejetés en une heure :

```promql
sum by (service, reason) (
  increase(messages_dropped_total[1h])
)
```

Latence p95 avec histogrammes classiques :

```promql
histogram_quantile(
  0.95,
  sum by (service, le) (
    rate(message_processing_duration_seconds_bucket[5m])
  )
)
```

Ne pas moyenner les p95 des pods : agréger les buckets avant de calculer le quantile. Adapter la requête si les services exposent des histogrammes natifs.

### Prompt OpenCode — Dashboards

```text
Tu es expert Grafana, Prometheus et PromQL.

SOURCES
results/observability-contract.md
results/observability-prometheus-validation.md
Séries et labels réellement disponibles.

OBJECTIF
Créer des dashboards Grafana exploitables et versionnables.

TRAVAIL
1. Vérifier les noms, types, unités et labels des métriques.
2. Créer un dashboard global.
3. Créer un dashboard Kafka.
4. Créer un dashboard Media et Redis.
5. Créer un dashboard de comparaison legacy/scalable.
6. Prévoir les variables environment, service, namespace et pod si disponibles.
7. Utiliser rate pour les débits et increase pour les volumes.
8. Utiliser histogram_quantile correctement.
9. Gérer les séries absentes et les états sans données.
10. Documenter la requête et la source de chaque panneau.
11. Préparer les JSON Grafana et le provisioning si applicable.

CONTRAINTES
Ne pas inventer de métriques ni de résultats.
Ne pas sommer les gauges répliquées.
Ne pas modifier les services Rust.
Ne pas créer de commit.

LIVRABLES
Dashboards JSON, documentation PromQL,
results/observability-grafana.md.
```

**Critère de sortie :** les panneaux utilisent les vraies séries et leurs chiffres correspondent aux requêtes Prometheus de référence.

---

## 6. Généraliser et tester la scalabilité

### Pourquoi cette étape arrive en dernier

Le premier service a validé le contrat, l'instrumentation, la collecte et les dashboards. On peut maintenant étendre sans multiplier les inconnues.

Il faut néanmoins adapter les points d'instrumentation aux responsabilités réelles de chaque service : ne pas ajouter de compteur Kafka producer à un service qui ne publie rien.

### Matrice de généralisation

| Vérification | Service A | Service B | Service C |
|---|---|---|---|
| Contrat appliqué | À vérifier | À vérifier | À vérifier |
| Messages reçus | À vérifier | À vérifier | À vérifier |
| Messages publiés | À vérifier | À vérifier | À vérifier |
| Rejets et erreurs | À vérifier | À vérifier | À vérifier |
| Médias traités | À vérifier | À vérifier | À vérifier |
| Latence | À vérifier | À vérifier | À vérifier |
| /metrics | À vérifier | À vérifier | À vérifier |
| Collecte Prometheus | À vérifier | À vérifier | À vérifier |

### Tester la montée en charge

Préparer des scénarios reproductibles avec plusieurs niveaux de charge et plusieurs nombres de pods, lorsque l'environnement l'autorise.

Mesurer simultanément :

- Débit de messages traités/s.
- Latences p50, p95 et p99.
- Erreurs, rejets et retries.
- Consumer lag Kafka.
- CPU et mémoire totaux et par pod.
- Nombre de réplicas.
- Éventuelle saturation Redis.

**Limite Kafka :** au sein d'un consumer group classique, une partition est affectée à un seul consumer actif à la fois. Si le topic possède trois partitions, dix consumers ne donnent pas dix traitements de partitions en parallèle.

Comparer l'ancienne API et la nouvelle à **charge équivalente** et avec les mêmes règles métier. Ne pas conclure qu'une nouvelle architecture est meilleure uniquement parce qu'elle possède plus de pods.

### Prompt OpenCode — Généralisation et comparaison

```text
Tu es architecte Rust, Kafka, Redis, Kubernetes et Prometheus.

SOURCES
results/observability-audit.md
results/observability-contract.md
results/observability-implementation.md
results/observability-prometheus-validation.md
results/observability-grafana.md
Dépôts et configurations locales disponibles.

PHASE 1 — GÉNÉRALISATION
1. Identifier les services restants.
2. Comparer leur instrumentation au contrat.
3. Réutiliser l'existant et ajouter seulement le nécessaire.
4. Respecter les particularités métier.
5. Tester succès, rejet, erreur et retry.
6. Vérifier /metrics, labels, unités et collecte multi-pods.

PHASE 2 — SCALABILITÉ
1. Identifier les services historiques et leurs forks.
2. Relever topics, partitions et consumer groups Kafka.
3. Relever ressources et contraintes Kubernetes.
4. Proposer des scénarios reproductibles de charge.
5. Préparer des tests à 1, 2, 3 et 4 pods si autorisés.
6. Mesurer débit, p50/p95/p99, erreurs, lag, CPU et mémoire.
7. Identifier les goulots d'étranglement.
8. Comparer ancien et nouveau sous charge équivalente.

PHASE 3 — VALIDATION
Vérifier les agrégations multi-pods, l'absence de double comptage,
les redémarrages, la variation des réplicas et la cohérence Grafana.

CONTRAINTES
Ne pas modifier plusieurs dépôts simultanément sans validation.
Ne pas modifier la production.
Ne pas lancer de charge sur un environnement partagé sans autorisation.
Ne pas créer de commit.
Ne pas inventer de benchmarks.

LIVRABLES
results/observability-generalization.md
results/observability-scalability-plan.md
results/observability-comparison.md

Distinguer mesures réellement obtenues, hypothèses et données manquantes.
```

**Critère de sortie :** les services respectent le même contrat et les conclusions de scalabilité sont étayées par des mesures reproductibles.

---

## Rôle d'OpenCode et validations humaines

| Étape | OpenCode produit | Ce qu'il faut valider |
|---|---|---|
| Audit | Inventaire avec preuves | Réalité du code et des flux |
| Contrat | Noms, sémantique, labels | Définitions métier |
| Instrumentation | Modifications et tests | Compilation et comportement |
| Prometheus | Diagnostic de collecte | Séries réellement présentes |
| Grafana | Requêtes et dashboards | Chiffres et courbes réels |
| Généralisation | Plan et modifications | Tests de charge et résultats |

## Organisation des livrables

```text
observability/
├── audit/
├── models/
│   └── metrics-contract.md
├── results/
│   ├── observability-audit.md
│   ├── observability-contract.md
│   ├── observability-implementation.md
│   ├── observability-prometheus-validation.md
│   ├── observability-grafana.md
│   ├── observability-generalization.md
│   ├── observability-scalability-plan.md
│   └── observability-comparison.md
└── prompt.md
```

Les rapports vivent dans le projet d'analyse. Les changements de code restent dans les dépôts Rust concernés. Les dashboards JSON peuvent être versionnés dans le dépôt d'observabilité.

## Ordre opérationnel

1. Lancer le prompt d'audit et relire le rapport.
2. Lancer le prompt de contrat et le valider.
3. Choisir un service pilote, lancer le prompt d'instrumentation, vérifier le diff et les tests.
4. Vérifier `/metrics`, les targets et les requêtes PromQL.
5. Générer puis tester les dashboards Grafana.
6. Généraliser service par service, puis comparer les architectures avec des tests contrôlés.

**Règle fondamentale :** les métriques doivent d'abord être définies et mesurées correctement. Un dashboard visuellement convaincant ne prouve pas que les mesures sont justes.
