
# Outil	              Utilité principale	                      Type de données

  ElasticSearch	      Stocker et indexer les logs	              Logs techniques (JSON)
  Kibana	            Lire, rechercher, visualiser les logs	    Logs (via ElasticSearch)
  Logstash	          Optionnel : ingestion des logs	          (Préparation des logs avant ElasticSearch)
  Prometheus	        Stocker et historiser les métriques	      Métriques système + backend
  Grafana	            Visualiser les métriques et dashboards	  Métriques (via Prometheus)


"compose:monitoring": "docker compose -f docker-compose.monitoring.yml up -d"


# Fichier docker-compose.monitoring.yml
    version: '3.8'

    services:

      elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:8.14.0
        container_name: elasticsearch
        environment:
          - discovery.type=single-node
          - xpack.security.enabled=false
        ports:
          - "9200:9200"

      kibana:
        image: docker.elastic.co/kibana/kibana:8.14.0
        container_name: kibana
        environment:
          - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
        ports:
          - "5601:5601"

      prometheus:
        image: prom/prometheus
        container_name: prometheus
        volumes:
          - ./prometheus.yml:/etc/prometheus/prometheus.yml
        ports:
          - "9090:9090"

      grafana:
        image: grafana/grafana
        container_name: grafana
        ports:
          - "3000:3000"


# Test des outils
  
  ElasticSearch	      http://localhost:9200

  Kibana	            http://localhost:5601

  Prometheus	        http://localhost:9090

  Grafana	            http://localhost:3000
                      Login : admin / admin

  redis               http://localhost:6379

  redisinsight	      http://localhost:8001


# Integration dans backend-javascript  
  npm install winston-elasticsearch


# ajout dans logger.js

  import { createLogger, transports, format } from 'winston';
  import DailyRotateFile from 'winston-daily-rotate-file';
  import { ElasticsearchTransport } from 'winston-elasticsearch';

  const esTransport = new ElasticsearchTransport({
    level: 'info',
    indexPrefix: 'backend-logs',
    clientOpts: {
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200'
    }
  });

  const logger = createLogger({
    level: process.env.LOG_LEVEL || 'warn',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    transports: [
      esTransport,
      new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        zippedArchive: true,
        maxSize: '5m',
        maxFiles: '120d'
      }),
      new DailyRotateFile({
        filename: 'logs/combined-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '5m',
        maxFiles: '120d'
      })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple())
      })
    );
  }

  export default logger;




# Test de data dans ELK
  
  http://localhost:9200/backend-javascript-logs*/_search?pretty
  http://localhost:9200/backend-javascript-logs*/_search?q=route:/test&pretty
  
# Test Kibana
  http://localhost:5601/app/management
  http://localhost:5601/app/management/kibana/dataViews
  Create Data View

    name              backend-javascript-logs-*
    index-apttern     backend-javascript-logs-*


# Tests Elasticsearch

  Objectif	                            Requête (endpoint)

  Tus les index	                        http://localhost:9200/_cat/indices?v
  Tous les documents pour un index	    http://localhost:9200/backend-javascript-logs-2025.07.19/_search?pretty

  Lister les index par pattern	         http://localhost:9200/_cat/indices/backend-javascript-logs*?v
  Vérifier un index précis	             http://localhost:9200/backend-javascript-logs*/
  Compter les documents	                 http://localhost:9200/backend-javascript-logs*/_count
  Lister les mappings	                   http://localhost:9200/backend-javascript-logs*/_mapping?pretty
  Lister les settings	                   http://localhost:9200/backend-javascript-logs*/_settings?pretty
  Lister les alias	                     http://localhost:9200/backend-javascript-logs*/_alias?pretty
  Lister les shards	                     http://localhost:9200/_cat/shards/backend-javascript-logs*?v
  Lister les segments	                   http://localhost:9200/_cat/segments/backend-javascript-logs*?v
  Afficher les documents (search)	       http://localhost:9200/backend-javascript-logs*/_search?pretty
  Afficher les documents (simple)	       http://localhost:9200/backend-javascript-logs*/_search?q=*&pretty
  Afficher les 10 premiers documents	   http://localhost:9200/backend-javascript-logs*/_search?size=10&pretty
  Lister les tâches actives	             http://localhost:9200/_tasks?pretty
  Infos cluster	                         http://localhost:9200/_cluster/health?pretty
  Infos cluster détaillées	             http://localhost:9200/_cluster/state?pretty
  Infos nœuds du cluster	               http://localhost:9200/_cat/nodes?v


  Supprimer    
    1 document          
      DELETE    http://localhost:9200/backend-javascript-logs-2025.07.19/_doc/qVwXIZgB78_bmmWVYs1n

    Tous les documents  
      POST      http://localhost:9200/backend-javascript-logs-2025.07.19/_delete_by_query?pretty
      {
        "query": {
          "match_all": {}
        }
      }

