# Package.json
  "scripts": {
    "compose:prometheus": "docker compose -f docker/docker-compose.prometheus.yml up -d",
    "compose:prometheus:clean": "docker compose -f docker/docker-compose.prometheus.yml down --volumes --rmi all"
  }

# docker/docker-compose.prometheus.yml version sans data

  version: '3.8'

  services:
    prometheus:
      image: prom/prometheus
      container_name: prometheus
      volumes:
        - ./prometheus.yml:/etc/prometheus/prometheus.yml
      ports:
        - "9090:9090"

# docker/prometheus.yml avec acces backend par docker
  global:
    scrape_interval: 5s

  scrape_configs:
    - job_name: 'backend-node'
      metrics_path: '/metrics'
      static_configs:
        - targets: ['backend-node:3001']

# docker/prometheus.yml avec acces backend en local

  global:
    scrape_interval: 5s

  scrape_configs:
    - job_name: 'backend-javascript'
      metrics_path: '/metrics'
      static_configs:
        - targets: ['host.docker.internal:3001']        


    Chaque 5 secondes, Prometheus appelle :
      http://host.docker.internal:3001/metrics
      http://host.docker.internal:3002/metrics

    Les secondes
          scrape_interval: 5s
    L'URL
      metrics_path: '/metrics'


# Lancement
  npm run compose:prometheus
  npm run compose:prometheus:clean 

# Check serveur Prometheus  
  http://localhost:9090

# Verif des backend en ecoute
  http://localhost:9090/targets  
  
  Status
    Target Health

# Queries
  Taper
    http_requests_total

    http_requests_total{job="backend-javascript"}
    http_requests_total{job="backend-javascript", status="200"}
    http_requests_total{status="200"}

    http_requests_total{job="backend-typescript"}


# Queries Liste possible en javascript et typescript


Métrique	              Description	                      Exemple de requête	      Unité / Type
http_requests_total	            Nombre total de requêtes HTTP	    
                                                  sum(http_requests_total)	                              Compteur
                                Requêtes GET 200	
                                                  sum(http_requests_total{method="GET", status="200"})	  Compteur
                                Requêtes par route
                                  	              http_requests_total{route="/persons"}	                  Compteur

process_cpu_seconds_total	      Temps CPU total (user + system)	
                                                  rate(process_cpu_seconds_total[1m])	                    Secondes / Counter

process_resident_memory_bytes	  Mémoire RAM utilisée par le processus	
                                                  process_resident_memory_bytes	                          Bytes / Gauge

nodejs_eventloop_lag_seconds	  Latence event loop Node.js	
                                                  nodejs_eventloop_lag_seconds	                          Secondes / Gauge

nodejs_heap_size_used_bytes	    Mémoire heap utilisée	
                                                  nodejs_heap_size_used_bytes	                            Bytes / Gauge

nodejs_heap_size_total_bytes	  Mémoire heap totale	
                                                  nodejs_heap_size_total_bytes	                          Bytes / Gauge

nodejs_gc_duration_seconds_sum	Temps cumulé dans le GC	
                                                  rate(nodejs_gc_duration_seconds_sum[5m])	              Histogram + Sum

nodejs_active_resources_total	  Nombre total de ressources actives	
                                                  nodejs_active_resources_total	Gauge

nodejs_active_handles_total	    Nombre total de handles actifs	
                                                  nodejs_active_handles_total	Gauge


# Queries Liste possible avec springoot et micrometer
Métrique (Spring Boot / Micrometer)	      Exemple PromQL

http_server_requests_seconds_count	      
        sum(http_server_requests_seconds_count)

http_server_requests_seconds_count{method="GET", status="200"}	
        sum(http_server_requests_seconds_count{method="GET", status="200"})

http_server_requests_seconds_count{uri="/persons"}	            
        sum(http_server_requests_seconds_count{uri="/persons"})

process_cpu_seconds_total	
        rate(process_cpu_seconds_total[1m])

process_memory_usage_bytes	
        process_memory_usage_bytes

jvm_memory_used_bytes{area="heap"}	
        sum(jvm_memory_used_bytes{area="heap"})

jvm_memory_committed_bytes{area="heap"}	
        sum(jvm_memory_committed_bytes{area="heap"})

jvm_gc_pause_seconds_sum	
        rate(jvm_gc_pause_seconds_sum[5m])

jvm_threads_live_threads	
        jvm_threads_live_threads
        
jvm_classes_loaded_classes 
        jvm_classes_loaded_classes
        
system_cpu_usage	
        system_cpu_usage

process_uptime_seconds
        process_uptime_seconds


# Sauvegarder la database prometheus

  # docker-compose.prometheus.yml : 
    version avec Data

    services:
      prometheus:
        image: prom/prometheus
        container_name: prometheus
        volumes:
          - prometheus_data:/prometheus
          - ./prometheus.yml:/etc/prometheus/prometheus.yml
        ports:
          - "9090:9090"

    volumes:
      prometheus_data:


# Sauver

  docker run --rm \
    -v prometheus_data:/volume \
    -v $(pwd):/backup \
    alpine \
    tar czf /backup/prometheus-backup.tar.gz -C /volume . 

# Restorer
  docker run --rm \
    -v prometheus_data:/volume \
    -v $(pwd):/backup \
    alpine \
    tar xzf /backup/prometheus-backup.tar.gz -C /volume    