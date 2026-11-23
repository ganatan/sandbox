# 014 — Prototype d'observabilité : trois dépôts Grafana, Media et Person

## 1. Objectif

Construire **trois dépôts indépendants** pour expérimenter localement l'observabilité de deux API Rust avec Prometheus et Grafana, en utilisant **Podman Compose**.

| Dépôt | Responsabilité |
|---|---|
| `grafana` | Déployer Prometheus et Grafana avec Podman Compose, configurer la collecte et fournir un dashboard |
| `media` | API Rust exposant une liste de médias et un endpoint Prometheus `/metrics` |
| `person` | API Rust exposant une liste de personnes et un endpoint Prometheus `/metrics` |

Le prototype doit être simple, autonome, reproductible et exploitable sur Fedora. Aucun besoin de PostgreSQL, Redis, Kafka, Angular ou Kubernetes pour cette première version. L'objectif est de comprendre l'instrumentation, le scraping, PromQL et les dashboards avant d'ajouter d'autres composants.

**Résultat attendu :** deux API HTTP fonctionnelles, leurs métriques récupérées par Prometheus, et un dashboard Grafana permettant de comparer les requêtes, latences et erreurs des deux services.

## 2. Architecture

```text
                           Navigateur / curl
                             |          |
                             v          v
                     GET /medias    GET /persons
                             |          |
                             v          v
                      Rust media    Rust person
                      :3001         :3002
                      /metrics      /metrics
                             ^          ^
                             |          |
                             +----+-----+
                                  |
                        Prometheus :9090
                         (scrape HTTP)
                                  |
                             Grafana :3000
                           (Prometheus datasource)
```

Le dépôt `grafana` ne contient pas le code des API. Les dépôts `media` et `person` n'embarquent ni Grafana ni Prometheus : ils exposent simplement les métriques au format attendu.

## 3. Arborescence des trois dépôts

```text
workspace/
├── grafana/
│   ├── README.md
│   ├── compose.yaml
│   ├── prometheus/
│   │   └── prometheus.yml
│   └── grafana/
│       ├── provisioning/
│       │   ├── datasources/
│       │   │   └── prometheus.yml
│       │   └── dashboards/
│       │       └── dashboards.yml
│       └── dashboards/
│           └── services.json
├── media/
│   ├── Cargo.toml
│   ├── Cargo.lock
│   ├── README.md
│   ├── src/
│   │   └── main.rs
│   └── Containerfile
└── person/
    ├── Cargo.toml
    ├── Cargo.lock
    ├── README.md
    ├── src/
    │   └── main.rs
    └── Containerfile
```

`Cargo.lock` est généré par Cargo et doit être versionné pour les applications. Les `Containerfile` sont prévus pour l'étape de conteneurisation ; le prototype initial peut fonctionner avec les API exécutées directement sur Fedora.

## 4. Contrat des API

### Dépôt media

- `GET /health` : vérification simple, réponse `200`.
- `GET /medias` : liste JSON de médias fictifs.
- `GET /metrics` : métriques Prometheus.
- Port local : `3001`.

Exemple de réponse `GET /medias` :

```json
[
  {"id": 1001, "name": "Media One", "type": "movie"},
  {"id": 1002, "name": "Media Two", "type": "series"},
  {"id": 1003, "name": "Media Three", "type": "movie"}
]
```

### Dépôt person

- `GET /health` : vérification simple, réponse `200`.
- `GET /persons` : liste JSON de personnes fictives.
- `GET /metrics` : métriques Prometheus.
- Port local : `3002`.

Exemple de réponse `GET /persons` :

```json
[
  {"id": 1, "name": "Person One", "profession": "director"},
  {"id": 2, "name": "Person Two", "profession": "actor"},
  {"id": 3, "name": "Person Three", "profession": "actor"}
]
```

Les données sont statiques dans un premier temps : aucune base de données n'est nécessaire. Les noms, chemins et ports doivent rester identiques dans le code, les tests et les configurations.

## 5. Bibliothèques Rust

Utiliser une pile commune pour les deux API :

- `axum` pour le serveur HTTP et les routes.
- `tokio` pour le runtime asynchrone.
- `serde` et `serde_json` pour les réponses JSON.
- `metrics` pour les compteurs et histogrammes.
- `metrics-exporter-prometheus` pour l'exposition Prometheus.
- `tower-http` si un middleware HTTP commun est utile.

Choisir des versions compatibles et effectivement disponibles dans le registre Cargo/Nexus du poste. Ne pas figer ici de numéros de versions non vérifiés. La création du recorder doit avoir lieu **une seule fois** au démarrage de chaque processus.

### Règles d'instrumentation

Instrumenter les requêtes HTTP à l'aide d'un middleware commun plutôt que de dupliquer les compteurs dans chaque handler. Exclure `/metrics` des métriques de trafic métier afin que le scraping ne gonfle pas artificiellement le nombre de requêtes.

Utiliser les mêmes noms, unités et labels dans `media` et `person` :

| Métrique | Type | Signification |
|---|---|---|
| `http_requests_total` | Counter | Requêtes HTTP terminées |
| `http_request_duration_seconds` | Histogram | Durée de traitement HTTP |
| `http_requests_in_flight` | Gauge | Requêtes HTTP en cours |
| `service_build_info` | Gauge | Version de service, valeur 1 |

Labels recommandés : `service`, `method`, `route` (template), `status`. Ne pas utiliser de paramètres URL, identifiants de média ou de personne dans les labels. Les labels `job` et `instance` seront ajoutés par Prometheus.

Définir clairement le comportement en cas d'erreur HTTP et mesurer les durées en secondes. Un compteur est cumulatif ; pour afficher des requêtes par seconde, utiliser `rate()`.

## 6. Dépôt grafana : Podman Compose

La configuration ci-dessous suppose que les deux API sont lancées **directement sur l'hôte Fedora** et écoutent sur `0.0.0.0`. Les conteneurs Prometheus et Grafana sont exécutés par Podman Compose. Pour la connexion à l'hôte depuis un conteneur Podman, utiliser `host.containers.internal` après avoir vérifié sa résolution dans l'environnement réel.

`grafana/compose.yaml` :

```yaml
services:
  prometheus:
    image: docker.io/prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro,Z
      - prometheus_data:/prometheus:Z
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--web.enable-lifecycle"
    restart: unless-stopped

  grafana:
    image: docker.io/grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_ADMIN_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana:Z
      - ./grafana/provisioning:/etc/grafana/provisioning:ro,Z
      - ./grafana/dashboards:/var/lib/grafana/dashboards:ro,Z
    depends_on:
      - prometheus
    restart: unless-stopped

volumes:
  prometheus_data:
  grafana_data:
```

**Important :** `latest` convient uniquement à un prototype jetable. Pour un projet reproductible, remplacer par des versions testées et figées, idéalement des digests d'images. Ne jamais committer le mot de passe administrateur. Créer un fichier `.env` local ignoré par Git contenant `GRAFANA_ADMIN_PASSWORD` avec un mot de passe de développement. Pour une exposition réseau réelle, ajouter TLS, authentification et restrictions d'accès.

Les suffixes `:Z` sont adaptés aux montages SELinux sous Fedora, mais doivent être validés selon la version de Podman Compose et la politique locale. Les volumes nommés persistent après `podman compose down` sans option `-v`.

### Configuration Prometheus

`grafana/prometheus/prometheus.yml` :

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "media"
    metrics_path: /metrics
    static_configs:
      - targets: ["host.containers.internal:3001"]
        labels:
          service: "media"

  - job_name: "person"
    metrics_path: /metrics
    static_configs:
      - targets: ["host.containers.internal:3002"]
        labels:
          service: "person"
```

L'option `host.containers.internal` est un choix de topologie de développement : si les API sont ensuite conteneurisées dans le même réseau Compose, utiliser plutôt leurs noms DNS de service (`media:3001`, `person:3002`) et modifier la composition. Ne pas mélanger les deux approches.

### Provisioning Grafana : datasource

`grafana/grafana/provisioning/datasources/prometheus.yml` :

```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    uid: prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
```

Le nom `prometheus` est résolu dans le réseau Compose. Dans Grafana, ne pas utiliser `localhost:9090` pour joindre Prometheus : `localhost` désignerait le conteneur Grafana.

### Provisioning Grafana : dashboards

`grafana/grafana/provisioning/dashboards/dashboards.yml` :

```yaml
apiVersion: 1

providers:
  - name: Services
    orgId: 1
    folder: Ganatan
    type: file
    disableDeletion: false
    editable: false
    options:
      path: /var/lib/grafana/dashboards
```

Créer `grafana/grafana/dashboards/services.json` au format JSON officiel des dashboards Grafana, avec la datasource UID `prometheus`. Ce fichier doit être généré ou exporté à partir d'un dashboard valide puis versionné dans le dépôt.

## 7. Dashboard attendu

Titre : **Ganatan — Media & Person Observability**.

Panneaux recommandés :

1. **UP / DOWN** : état de chaque cible Prometheus.
2. **Requêtes par seconde** : comparaison media/person.
3. **Nombre de requêtes sur 5 minutes**.
4. **Latence p95** par service.
5. **Erreurs HTTP 5xx par seconde**.
6. **Requêtes par route**.
7. **Requêtes en cours**.

Exemples PromQL :

Disponibilité :

```promql
up{job=~"media|person"}
```

Débit :

```promql
sum by (service) (rate(http_requests_total[5m]))
```

Nombre de requêtes sur 5 minutes :

```promql
sum by (service) (increase(http_requests_total[5m]))
```

Latence p95 avec histogrammes classiques :

```promql
histogram_quantile(
  0.95,
  sum by (service, le) (
    rate(http_request_duration_seconds_bucket[5m])
  )
)
```

Taux de réponses 5xx :

```promql
sum by (service) (
  rate(http_requests_total{status=~"5.."}[5m])
)
```

Requêtes en cours :

```promql
sum by (service) (http_requests_in_flight)
```

Ces requêtes supposent les labels et métriques décrits dans le contrat. Si l'implémentation choisit des noms différents, adapter simultanément les dashboards.

## 8. Déroulement pratique sur Fedora

### Étape 1 — Vérifier les outils

```bash
podman --version
podman compose version
cargo --version
rustc --version
curl --version
```

`podman compose` délègue à un fournisseur Compose installé. Si cette commande ne fonctionne pas, vérifier `podman-compose` ou le fournisseur configuré, sans supposer qu'il est disponible.

### Étape 2 — Créer les dépôts

```bash
mkdir -p ~/workspace/repositories/{grafana,media,person}
cd ~/workspace/repositories/media
cargo init --bin
cd ../person
cargo init --bin
```

Initialiser les dépôts Git indépendamment et ajouter leurs fichiers `README.md`, `.gitignore` et leur code. Le dépôt `grafana` contient uniquement l'infrastructure d'observabilité.

### Étape 3 — Lancer media

```bash
cd ~/workspace/repositories/media
cargo run
```

Dans un autre terminal :

```bash
curl -fsS http://localhost:3001/health
curl -fsS http://localhost:3001/medias
curl -fsS http://localhost:3001/metrics
```

### Étape 4 — Lancer person

```bash
cd ~/workspace/repositories/person
cargo run
```

Dans un autre terminal :

```bash
curl -fsS http://localhost:3002/health
curl -fsS http://localhost:3002/persons
curl -fsS http://localhost:3002/metrics
```

### Étape 5 — Démarrer l'observabilité

```bash
cd ~/workspace/repositories/grafana
podman compose config
podman compose up -d
podman compose ps
podman compose logs --tail=100 prometheus
podman compose logs --tail=100 grafana
```

Accès :

- Grafana : `http://localhost:3000`
- Prometheus : `http://localhost:9090`
- Cibles Prometheus : `http://localhost:9090/targets`

Vérifier que `media` et `person` sont **UP**. Si les API ne sont pas accessibles depuis Prometheus, tester depuis le conteneur avec les outils réellement disponibles dans l'image ou un conteneur de diagnostic sur le même réseau. Attention aux différences de réseau entre l'hôte Fedora et une Distrobox : `localhost` et `host.containers.internal` doivent être vérifiés dans la topologie effective.

### Étape 6 — Générer du trafic

```bash
for i in $(seq 1 100); do
  curl -fsS -o /dev/null http://localhost:3001/medias
  curl -fsS -o /dev/null http://localhost:3002/persons
done
```

Attendre au moins quelques intervalles de scraping avant d'interpréter les graphes `rate(...[5m])`. Ne pas confondre une absence temporaire de données avec une panne.

### Étape 7 — Arrêter

```bash
cd ~/workspace/repositories/grafana
podman compose down
```

Cette commande arrête l'infrastructure ; les API lancées avec `cargo run` doivent être arrêtées séparément. Ne pas ajouter `-v` si l'on souhaite conserver les données Prometheus et Grafana.

## 9. Tests et qualité

Pour chaque dépôt Rust :

```bash
cargo fmt --check
cargo test
cargo clippy --all-targets
cargo build --release
```

Critères d'acceptation :

- `GET /medias` renvoie un tableau JSON valide.
- `GET /persons` renvoie un tableau JSON valide.
- Les deux API exposent `/health` et `/metrics`.
- Les métriques HTTP utilisent exactement les mêmes noms, types, unités et labels.
- Les requêtes `/metrics` ne gonflent pas les métriques métier.
- Prometheus affiche deux cibles `UP`.
- Les séries sont visibles dans PromQL.
- Grafana charge automatiquement la datasource et le dashboard.
- Le trafic généré est visible dans les graphiques.
- Un arrêt/redémarrage ne nécessite aucune configuration manuelle.
- Aucun secret n'est versionné.

Tester aussi : API arrêtée (cible DOWN), erreur HTTP simulée, redémarrage d'une API (reset de counter), absence de métriques et échec de résolution réseau.

## 10. Évolution : tout conteneuriser

Une fois le prototype validé, faire évoluer `grafana/compose.yaml` pour exécuter également les API Rust à partir de leurs dépôts voisins :

```yaml
services:
  media:
    build:
      context: ../media
      dockerfile: Containerfile
    ports:
      - "3001:3001"

  person:
    build:
      context: ../person
      dockerfile: Containerfile
    ports:
      - "3002:3002"
```

Ce fragment **complète** les services Prometheus et Grafana ; il ne constitue pas un fichier Compose complet. Adapter alors `prometheus.yml` :

```yaml
scrape_configs:
  - job_name: media
    static_configs:
      - targets: ["media:3001"]
        labels:
          service: media

  - job_name: person
    static_configs:
      - targets: ["person:3002"]
        labels:
          service: person
```

Les deux services doivent écouter sur `0.0.0.0` dans leurs conteneurs. Les chemins `../media` et `../person` supposent les trois dépôts côte à côte. La disponibilité de `build` dépend du fournisseur Podman Compose et de la configuration locale.

Ne pas ajouter cette étape avant que le prototype hôte + Compose soit fonctionnel.

## 11. Prompts OpenCode

### Prompt A — Dépôt media

```text
Dans le dépôt media, crée une API Rust avec axum et tokio.
Expose GET /health, GET /medias et GET /metrics sur le port 3001.
GET /medias renvoie une liste statique de trois médias JSON.
Instrumente les requêtes avec metrics et metrics-exporter-prometheus.
Expose http_requests_total, http_request_duration_seconds, http_requests_in_flight et service_build_info.
Utilise les labels service, method, route et status, sans valeurs dynamiques non bornées.
Exclus /metrics des statistiques HTTP métier.
Ajoute des tests et un README avec les commandes de démarrage.
Ne crée aucun commit.
```

### Prompt B — Dépôt person

```text
Dans le dépôt person, crée une API Rust avec axum et tokio.
Expose GET /health, GET /persons et GET /metrics sur le port 3002.
GET /persons renvoie une liste statique de trois personnes JSON.
Utilise exactement le même contrat Prometheus que le dépôt media :
http_requests_total, http_request_duration_seconds, http_requests_in_flight et service_build_info.
Conserve les mêmes labels et unités ; service vaut person.
Exclus /metrics des statistiques HTTP métier.
Ajoute des tests et un README.
Ne crée aucun commit.
```

### Prompt C — Dépôt grafana

```text
Dans le dépôt grafana, crée un compose.yaml Podman Compose pour Prometheus et Grafana.
Les API Rust media et person tournent initialement sur l'hôte Fedora aux ports 3001 et 3002.
Configure le scraping Prometheus de /metrics avec host.containers.internal.
Provisionne automatiquement la datasource Prometheus et un dashboard Grafana versionné en JSON.
Le dashboard affiche UP, requêtes/s, requêtes sur 5 min, latence p95, erreurs 5xx et requêtes en cours pour media et person.
Utilise un mot de passe administrateur via .env non versionné.
Ajoute README.md avec lancement, diagnostic réseau, tests et arrêt.
Ne crée aucun commit.
```

### Prompt D — Vérification globale

```text
Vérifie la cohérence des trois dépôts grafana, media et person.
Contrôle les ports, chemins HTTP, noms de métriques, labels, targets Prometheus, datasource Grafana et requêtes PromQL.
Identifie toute incohérence entre configuration et code.
Exécute les tests disponibles, sans inventer de résultat.
Produis un rapport Markdown avec statut OK/KO/À VÉRIFIER et les commandes de correction.
Ne modifie aucun fichier et ne crée aucun commit.
```

## 12. Livrables

1. Dépôt `media` : API Rust, données fictives, instrumentation, tests, README.
2. Dépôt `person` : API Rust, données fictives, instrumentation identique, tests, README.
3. Dépôt `grafana` : Compose, Prometheus, provisioning Grafana, dashboard JSON, README.
4. Vérification : deux endpoints fonctionnels, deux cibles UP, graphiques alimentés.
5. Aucun commit automatique par OpenCode : relire les diffs puis décider des commits manuellement.

## 13. Points d'attention

- Le dépôt `grafana` porte l'infrastructure, pas le code des API.
- Les API portent leur instrumentation, pas un serveur Prometheus embarqué.
- Un exporteur expose `/metrics` ; Prometheus vient le lire.
- Grafana interroge Prometheus par son nom DNS de service Compose.
- La compatibilité réseau Podman/Distrobox/Fedora doit être testée.
- Les métriques sont identiques pour rendre les deux services comparables.
- Les données de médias/personnes restent volontairement fictives.
- Le prototype commence avec deux processus Rust sur l'hôte, puis peut passer à quatre conteneurs.
- Ne pas confondre « endpoint de métriques » et « API métier ».
- Ne pas exposer Grafana/Prometheus sans sécurité adaptée en dehors du poste local.

## 14. Références

- Podman : https://docs.podman.io/
- Prometheus : https://prometheus.io/docs/
- Grafana provisioning : https://grafana.com/docs/grafana/latest/administration/provisioning/
- Rust axum : https://docs.rs/axum/
- Rust metrics : https://docs.rs/metrics/
- Rust Prometheus exporter : https://docs.rs/metrics-exporter-prometheus/

---

**Ordre recommandé : créer media → créer person → vérifier les endpoints → démarrer Prometheus/Grafana → vérifier les targets → afficher le dashboard → conteneuriser les API si nécessaire.**
