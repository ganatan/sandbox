# Test de data dans ELK
  
  # liste des index
  http://localhost:9200/_cat/indices?v  

  # Liste documents backend-javascript
  http://localhost:9200/backend-javascript-logs*/_search?pretty
  http://localhost:9200/backend-javascript-logs*/_search?q=route:/test&pretty


  # SUpprimer les documents


    Indiquer le bon index !!!!!!!

    Supprimer    
    1 document          
      DELETE    http://localhost:9200/backend-javascript-logs-2025.07.21/_doc/qVwXIZgB78_bmmWVYs1n

    Tous les documents  
      POST      http://localhost:9200/backend-javascript-logs-2025.07.21/_delete_by_query?pretty
      {
        "query": {
          "match_all": {}
        }
      }

  
# Test Kibana

  Lancement des indexs  
    http://localhost:5601/app/management
    http://localhost:5601/app/management/kibana/dataViews
  
    Create Data View

      name              backend-javascript-logs-*
      index-pattern     backend-javascript-logs-*

# Visualisation des Logs dans Kibana
  
  En haut à gauche
    Discover


# Tests Elasticsearch

  Objectif	                            Requête (endpoint)

  Tous les index	                       http://localhost:9200/_cat/indices?v
  Tous les documents pour un index	     http://localhost:9200/backend-javascript-logs-2025.07.19/_search?pretty

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

