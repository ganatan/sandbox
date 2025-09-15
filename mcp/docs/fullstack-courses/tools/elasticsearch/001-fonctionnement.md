
# Outil	              Utilité principale	                      Type de données

  ElasticSearch	      Stocker et indexer les logs	              Logs techniques (JSON)
  Kibana	            Lire, rechercher, visualiser les logs	    Logs (via ElasticSearch)
  Logstash	          Optionnel : ingestion des logs	          (Préparation des logs avant ElasticSearch)
  Prometheus	        Stocker et historiser les métriques	      Métriques système + backend
  Grafana	            Visualiser les métriques et dashboards	  Métriques (via Prometheus)



# Test des outils
  
  ElasticSearch	      http://localhost:9200
  
  Kibana	            http://localhost:5601
  
  Prometheus	        http://localhost:9090
  
  Grafana	            http://localhost:3000
                      Login : admin / admin
  
  redis               http://localhost:6379
  
  redisinsight	      http://localhost:8001

