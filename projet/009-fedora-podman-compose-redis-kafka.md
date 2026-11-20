# 009 — Fedora, Podman Compose : piloter Redis et Kafka

## 1. Objectif et environnement

Ce guide décrit le contrôle manuel des conteneurs Redis et Kafka sur un poste Fedora verrouillé. Podman fonctionne sur l'hôte Fedora, pas dans Distrobox. VS Code, Node, Angular et Rust peuvent fonctionner dans Distrobox, mais la gestion des conteneurs reste sur Fedora. Un seul fichier Compose décrit les services. Aucun outil graphique ni daemon Docker n'est nécessaire.

L'objectif est de distinguer quatre questions : le conteneur existe-t-il ? est-il démarré ? le service interne répond-il ? accomplit-il réellement son travail ?

## 2. Comprendre les niveaux

- **Image** : modèle immuable utilisé pour créer un conteneur.
- **Conteneur** : processus isolé avec sa configuration, son réseau et ses volumes.
- **Podman** : moteur de conteneurs sans démon central obligatoire, utilisable en rootless.
- **Compose** : fichier YAML décrivant plusieurs services et leurs dépendances.
- **podman-compose** : outil qui traduit les opérations Compose en commandes Podman.
- **Service Compose** : nom logique dans le YAML, qui n'est pas forcément le nom du conteneur.
- **Volume** : stockage persistant indépendant du cycle de vie d'un conteneur.
- **Port publié** : association entre un port Fedora et un port du conteneur.

Un état `Up` prouve que le processus principal tourne, pas que Redis ou Kafka est prêt à répondre.

## 3. Préparer la session Fedora

Ouvrir un terminal Fedora (pas le terminal Distrobox), puis se placer dans le répertoire réel du fichier Compose :

```bash
pwd
ls -la
podman --version
podman-compose --version
podman info
```

Ne pas supposer que `~/workspace/infra` existe : utiliser le chemin réel. Le chemin du fichier Compose peut être explicité avec `podman-compose -f /chemin/compose.yaml ps`.

Vérifier les noms logiques des services dans `compose.yaml`. Les exemples suivants supposent `redis` et `kafka` ; adapter si le fichier utilise d'autres noms.

## 4. Cycle de vie de l'ensemble

```bash
podman-compose up -d
podman-compose ps
podman-compose stop
podman-compose start
podman-compose restart
podman-compose logs -f
podman-compose down
```

- `up -d` crée les ressources manquantes et démarre en arrière-plan ; il peut recréer des conteneurs selon les changements.
- `ps` affiche l'état des services du projet.
- `stop` arrête les conteneurs sans les supprimer.
- `start` redémarre les conteneurs existants ; ne remplace pas `up` si la configuration a changé.
- `restart` redémarre les conteneurs sans nécessairement appliquer les modifications du YAML.
- `down` supprime les conteneurs et réseaux du projet ; les volumes nommés sont normalement conservés sans option de suppression des volumes.
- Ne jamais lancer `down -v` sans comprendre les données qui seront perdues.

Pour un simple arrêt en fin de journée, préférer `stop` à `down`.

## 5. Contrôle global avec Podman

```bash
podman ps
podman ps -a
podman ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
podman stats
podman system df
```

`podman ps` liste les conteneurs actifs ; `-a` inclut les conteneurs arrêtés. `stats` donne une vue CPU/mémoire/réseau. `system df` donne l'utilisation du stockage. Les conteneurs hors de ce Compose peuvent aussi apparaître.

Pour cibler deux conteneurs dont les noms réels sont connus :

```bash
podman stats --no-stream redis kafka
podman inspect redis
podman inspect kafka
```

Attention : les noms de conteneurs peuvent être préfixés par le nom du projet. Les retrouver avec `podman ps -a` avant d'utiliser `podman exec`, `podman logs` ou `podman inspect`.

## 6. Gestion individuelle depuis Compose

Depuis le répertoire du fichier :

```bash
podman-compose stop redis
podman-compose start redis
podman-compose restart redis
podman-compose logs --tail 100 redis
podman-compose stop kafka
podman-compose start kafka
podman-compose restart kafka
podman-compose logs --tail 100 kafka
```

Les commandes Compose utilisent les **noms des services**. Si un service dépend d'un autre, un arrêt manuel peut perturber l'application même si l'autre conteneur reste actif.

## 7. Redis : concepts

Redis est un serveur de données en mémoire. Une clé identifie une valeur ; les types possibles incluent string, hash, list, set et sorted set. Redis peut être utilisé comme cache, compteur, stockage de sessions ou mécanisme de messages selon l'application.

Un Redis démarré peut néanmoins être inutilisable à cause de l'authentification, du réseau, d'un manque de mémoire ou d'une configuration incorrecte.

## 8. Redis : diagnostic de base

Les exemples ci-dessous supposent que le conteneur s'appelle exactement `redis`, que `redis-cli` y est installé et qu'une connexion locale sans authentification supplémentaire est autorisée.

```bash
podman exec redis redis-cli ping
podman exec redis redis-cli INFO server
podman exec redis redis-cli INFO clients
podman exec redis redis-cli INFO memory
podman exec redis redis-cli INFO stats
podman exec redis redis-cli DBSIZE
podman logs --tail 100 redis
```

`PING` doit renvoyer `PONG`. Une erreur `NOAUTH` signifie qu'une authentification est nécessaire, pas que Redis est arrêté. Ne jamais mettre un mot de passe en clair dans une commande conservée dans l'historique shell.

`DBSIZE` donne le nombre de clés de la base sélectionnée, pas la taille mémoire. `INFO memory` donne notamment la mémoire utilisée ; `INFO clients` renseigne sur les connexions.

## 9. Redis : inspection prudente des clés

```bash
podman exec redis redis-cli --scan
podman exec redis redis-cli TYPE exemple
podman exec redis redis-cli TTL exemple
podman exec redis redis-cli GET exemple
podman exec redis redis-cli HGETALL exemple
podman exec redis redis-cli LRANGE exemple 0 9
```

`GET` est adapté à une string ; `HGETALL` à un hash ; `LRANGE` à une list. Vérifier `TYPE` avant de choisir une commande. `TTL` renvoie le délai d'expiration en secondes, `-1` sans expiration, `-2` si la clé n'existe pas.

Privilégier `SCAN` à `KEYS *` sur une base importante : `KEYS` peut bloquer le serveur pendant l'énumération. `--scan` reste potentiellement coûteux sur un très grand ensemble.

Ne pas modifier ni supprimer les clés d'un environnement partagé sans autorisation. Éviter `FLUSHDB`, `FLUSHALL`, `DEL` et les tests de charge sur des données réelles.

## 10. Redis : performance et persistance

```bash
podman exec redis redis-cli INFO persistence
podman exec redis redis-cli INFO keyspace
podman exec redis redis-cli SLOWLOG LEN
podman exec redis redis-cli SLOWLOG GET 10
podman exec redis redis-cli CLIENT LIST
```

Ces commandes permettent d'observer la persistance RDB/AOF, les bases occupées, les commandes lentes et les clients connectés. `CLIENT LIST` peut exposer des informations de connexion ; traiter sa sortie comme sensible.

La persistance dépend de la configuration Redis et des volumes montés. Ne pas déduire qu'un conteneur persiste ses données simplement parce qu'il utilise Redis.

## 11. Kafka : concepts

Kafka est un journal distribué d'événements. Un **broker** héberge des partitions ; un **topic** regroupe des messages ; une **partition** est un journal ordonné ; un **producer** publie ; un **consumer** lit ; un **consumer group** répartit la consommation entre ses membres. Un **offset** représente la position d'un message dans une partition.

Kafka peut fonctionner avec KRaft ; les déploiements plus anciens peuvent utiliser ZooKeeper. La configuration du Compose détermine le mode réel.

Un conteneur Kafka `Up` ne garantit pas que le broker accepte les connexions ou que les clients externes peuvent utiliser les adresses annoncées.

## 12. Kafka : vérifier les commandes disponibles

```bash
podman ps -a
podman logs --tail 100 kafka
podman exec kafka sh -c 'command -v kafka-topics.sh || true'
```

Selon l'image, les outils Kafka peuvent être ailleurs dans le système. Le nom `kafka` est ici le nom supposé du conteneur ; adapter après `podman ps -a`.

## 13. Kafka : topics et état du broker

Si les scripts Kafka sont disponibles et que le broker écoute sur `localhost:9092` **depuis le conteneur** :

```bash
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic mon-topic
podman exec kafka kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
```

`--list` affiche les topics. `--describe` montre partitions, leaders et réplicas selon la configuration. La liste des groupes donne les groupes connus du cluster.

Le port 9092 est un exemple, pas une certitude. Vérifier `listeners`, `advertised.listeners` et les variables du Compose. Une commande exécutée **dans** le conteneur n'utilise pas nécessairement la même adresse qu'une application sur Fedora ou dans Distrobox.

## 14. Kafka : consommateurs et retard

```bash
podman exec kafka kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group mon-groupe
```

Les colonnes usuelles incluent `CURRENT-OFFSET`, `LOG-END-OFFSET` et `LAG`. Le retard est une différence d'offsets, pas automatiquement une durée en secondes. Il faut interpréter les valeurs par partition et tenir compte des groupes inactifs ou des offsets absents.

## 15. Kafka : test de bout en bout sur environnement autorisé

Sur un topic de test dédié, créé uniquement si la politique de l'environnement l'autorise :

```bash
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --create --topic controle-local --partitions 1 --replication-factor 1
podman exec -it kafka kafka-console-producer.sh --bootstrap-server localhost:9092 --topic controle-local
podman exec -it kafka kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic controle-local --from-beginning --max-messages 1
```

Dans le producteur, saisir un message puis terminer avec Ctrl+C. La commande consommateur peut attendre tant qu'aucun message n'est disponible. La réplication à 1 n'est adaptée qu'à un broker unique de test. Ne pas créer de topic dans un cluster partagé sans accord.

## 16. Kafka : incidents courants

- Broker démarré, mais commande client en échec : vérifier le port, le protocole, TLS/SASL et les listeners.
- Connexion bootstrap possible, puis échec : examiner `advertised.listeners`, car le client réutilise les adresses renvoyées par le broker.
- Topic absent : vérifier le nom et le cluster visé.
- Consommateur sans message : vérifier topic, partition, offsets, groupe et stratégie de lecture.
- Retard croissant : vérifier le débit des producteurs, le nombre de partitions, les erreurs et les performances des consommateurs.
- Disque plein : vérifier stockage Podman, volumes, rétention et logs, sans supprimer arbitrairement les données.

## 17. Logs et diagnostic croisé

```bash
podman-compose ps
podman-compose logs --tail 100 redis
podman-compose logs --tail 100 kafka
podman logs --since 10m redis
podman logs --since 10m kafka
podman stats --no-stream
podman system df
```

La syntaxe et les options peuvent dépendre de la version de `podman-compose`. Si une option n'est pas reconnue, consulter `podman-compose --help` ou utiliser directement `podman logs` avec le vrai nom du conteneur.

Pour analyser un incident, relever l'heure, l'état du conteneur, les logs récents, la réponse du service et les ressources, dans cet ordre.

## 18. Terminal Fedora et VS Code dans Distrobox

La méthode de référence reste le terminal Fedora : aucun Podman supplémentaire n'est nécessaire dans Distrobox.

Pour un accès ponctuel depuis le terminal intégré de VS Code, on peut **tester** :

```bash
distrobox-host-exec podman ps
```

Ce fonctionnement n'est pas confirmé sur le poste. Il dépend de la disponibilité de `distrobox-host-exec`, de la configuration Distrobox et des restrictions de l'entreprise. Il ne faut pas installer un deuxième moteur Podman pour contourner ces restrictions. L'extension VS Code Podman nécessite elle aussi un accès fonctionnel au moteur de l'hôte ; son installation ne suffit pas à elle seule.

## 19. Raccourcis facultatifs Fedora

Dans le `~/.bashrc` **de Fedora** :

```bash
alias pcu='podman-compose up -d'
alias pcp='podman-compose ps'
alias pcl='podman-compose logs -f'
alias pcs='podman-compose stop'
```

Puis :

```bash
source ~/.bashrc
```

Ces alias supposent qu'on est déjà dans le répertoire du Compose. Ils ne fonctionnent pas automatiquement depuis n'importe quel répertoire.

## 20. Procédure quotidienne recommandée

### Début de journée

```bash
podman-compose up -d
podman-compose ps
podman ps -a
```

Vérifier ensuite Redis avec `PING` et Kafka avec la liste des topics, après adaptation des noms et adresses.

### Pendant le travail

```bash
podman-compose logs -f redis
podman-compose logs -f kafka
podman stats
```

### Incident sur un seul service

```bash
podman-compose ps
podman-compose logs --tail 100 redis
podman-compose restart redis
```

Le redémarrage est une action de récupération, pas un diagnostic : lire les logs avant de le lancer. Pour Kafka, ne pas redémarrer automatiquement sans comprendre son rôle dans le cluster.

### Fin de journée

```bash
podman-compose stop
```

Cette étape est facultative : certains services doivent rester actifs. Respecter les consignes d'exploitation du poste.

## 21. Checklist de maîtrise

- Je connais le chemin du Compose et les noms exacts de ses services.
- Je sais différencier nom de service et nom de conteneur.
- Je sais arrêter un service sans supprimer ses données.
- Je sais consulter les logs et les ressources.
- Je sais tester Redis par `PING`, examiner les types, clés, mémoire et persistance.
- Je sais lister les topics Kafka et interpréter un consumer lag.
- Je sais distinguer un broker local accessible d'un client distant mal configuré.
- Je sais qu'une commande destructive sur Redis ou Kafka nécessite une autorisation.
- Je garde Podman sur Fedora et Distrobox comme environnement de développement.

## 22. Synthèse

**Podman** répond à « le conteneur tourne-t-il ? ».

**Redis CLI** répond à « Redis répond-il et quelles données/ressources utilise-t-il ? ».

**Kafka CLI** répond à « le broker, les topics et les consommateurs fonctionnent-ils ? ».

Pour ce poste, le meilleur compromis est un seul Compose, des commandes manuelles depuis Fedora et des vérifications applicatives spécifiques à Redis et Kafka.
