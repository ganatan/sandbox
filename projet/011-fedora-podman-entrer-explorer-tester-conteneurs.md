# 011 — Conteneurs Podman : entrer, explorer, comprendre et tester

Guide pratique complet pour Fedora, Podman et un fichier Compose unique, avec Redis et Kafka comme exemples. Ce document complète les guides [009](009-fedora-podman-compose-redis-kafka.md) et [010](010-fedora-podman-exploitation-avancee.md).

## 1. Ce qu'est un conteneur

Un conteneur est un ensemble de processus isolés qui partagent le noyau Linux de Fedora. Il n'est pas une machine virtuelle complète. Il possède son propre système de fichiers apparent, ses processus, variables d'environnement et, selon sa configuration, son espace réseau. Une **image** est le modèle de départ ; un **conteneur** est une instance créée à partir de cette image.

Podman exécute les conteneurs ; `podman-compose` gère les services définis dans un fichier Compose. Dans cet environnement, Podman se trouve sur **Fedora**, pas dans Distrobox. Exécuter les commandes depuis un terminal Fedora.

## 2. Préparer l'exploration

Depuis le dossier réel contenant `compose.yaml` :

```bash
pwd
ls -la
podman --version
podman-compose --version
podman-compose ps
podman ps -a
```

Ne pas inventer le chemin du projet. Les services Compose peuvent s'appeler `redis` et `kafka`, mais leurs conteneurs peuvent porter des noms différents. Les commandes `podman exec`, `podman inspect`, `podman logs` utilisent le **nom ou l'ID du conteneur**.

```bash
podman ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
```

Dans les exemples suivants, les conteneurs s'appellent `redis` et `kafka` ; remplacer ces noms si nécessaire.

## 3. Démarrer, arrêter et inspecter l'état

```bash
podman-compose up -d
podman-compose ps
podman-compose stop redis
podman-compose start redis
podman-compose restart redis
podman-compose stop
podman-compose start
```

`up -d` crée et démarre en arrière-plan ; `stop` conserve les conteneurs ; `start` démarre ceux déjà créés ; `restart` redémarre sans nécessairement appliquer les changements du YAML. `down` supprime les conteneurs du projet ; les volumes nommés restent généralement présents sauf suppression explicite. Ne pas utiliser `down -v` sans avoir identifié les données.

Pour voir si le conteneur tourne :

```bash
podman inspect redis --format '{{.State.Status}}'
podman inspect redis --format '{{.State.Running}}'
podman inspect redis --format '{{.State.ExitCode}}'
podman inspect redis --format '{{.State.StartedAt}}'
```

Un statut `running` ne prouve pas que Redis répond.

## 4. Entrer dans un conteneur

```bash
podman exec -it redis sh
```

Si Bash existe dans l'image :

```bash
podman exec -it redis bash
```

Pour Kafka :

```bash
podman exec -it kafka sh
```

`exec` lance un **nouveau processus** dans un conteneur déjà démarré. `-i` conserve l'entrée standard et `-t` alloue un terminal. Si `bash` n'est pas installé, utiliser `sh`. Certaines images minimales ne possèdent aucun shell.

Une fois à l'intérieur :

```bash
pwd
ls -la
whoami
id
hostname
cat /etc/os-release
printenv
ps
```

`printenv` peut révéler des mots de passe : ne pas copier sa sortie dans un ticket ou une documentation publique. Certains outils (`ps`, `ip`, `ss`, `curl`) peuvent manquer.

Pour quitter proprement le shell :

```bash
exit
```

**Quitter un shell ouvert avec `podman exec` n'arrête pas le conteneur.** Éviter `podman attach` pour explorer un service : il se connecte au processus principal, et les signaux ou entrées peuvent affecter celui-ci.

## 5. Exécuter sans entrer dans le shell

Souvent plus rapide et reproductible :

```bash
podman exec redis hostname
podman exec redis id
podman exec redis redis-cli ping
podman exec kafka sh -c 'pwd && ls -la'
```

Pour une commande complexe, `sh -c` n'est possible que si un shell existe. `podman exec` exige un conteneur démarré. Un `podman run --rm ...` créerait au contraire un nouveau conteneur, pas une session dans l'existant.

## 6. Explorer les fichiers, processus et montages

Depuis l'intérieur :

```bash
pwd
ls -lah /
ls -lah /etc
ls -lah /tmp
ps
```

Depuis Fedora :

```bash
podman inspect redis --format '{{json .Mounts}}'
podman inspect redis --format '{{json .Config.WorkingDir}}'
podman inspect redis --format '{{json .Config.Entrypoint}}'
podman inspect redis --format '{{json .Config.Cmd}}'
podman top redis
podman diff redis
```

`podman diff` liste les changements du système de fichiers du conteneur par rapport à l'image ; les données sur volumes sont à examiner séparément.

Pour copier un fichier de diagnostic non sensible :

```bash
podman cp redis:/chemin/fichier ./fichier
```

Pour copier dans l'autre sens, `podman cp ./fichier redis:/chemin/fichier`, mais cela **modifie** le conteneur : à éviter sur un environnement partagé. Ne pas modifier à la main les fichiers de configuration internes d'un conteneur reproductible ; préférer Compose, volumes et images.

## 7. Comprendre IP, localhost, DNS et ports

- **IP** : adresse d'une interface.
- **Port** : point d'entrée TCP/UDP d'un service.
- **localhost / 127.0.0.1** : boucle locale de l'espace réseau du processus.
- **DNS** : résolution d'un nom en adresse IP.
- **Port interne** : port d'écoute dans le conteneur.
- **Port publié** : port exposé sur Fedora et redirigé vers un port interne.

Exemple Compose :

```yaml
services:
  redis:
    image: redis:7
    ports:
      - "127.0.0.1:6380:6379"
```

Dans cet exemple, Fedora utilise `127.0.0.1:6380` ; Redis utilise son port interne `6379`. Un autre conteneur sur le même réseau Compose utilise normalement `redis:6379` si la résolution DNS est activée.

Attention : dans Redis, `localhost` désigne Redis ; dans Kafka, `localhost` désigne Kafka. Distrobox partage souvent le réseau Fedora, mais il faut vérifier la configuration réelle.

## 8. Examiner les ports et réseaux depuis Fedora

```bash
podman port redis
podman port kafka
podman network ls
podman inspect redis --format '{{json .NetworkSettings}}'
podman inspect kafka --format '{{json .NetworkSettings}}'
podman network inspect nom-reseau
```

Pour voir les ports d'écoute sur Fedora si l'outil est disponible :

```bash
ss -lnt
```

Dans le conteneur, si installé :

```bash
ss -lnt
ip addr
cat /etc/resolv.conf
cat /etc/hosts
```

Avec Podman rootless, `pasta` ou `slirp4netns` peuvent être utilisés selon la version. L'adresse IP interne n'est pas toujours directement accessible depuis Fedora. Ne pas déduire l'accessibilité à partir de la seule IP retournée par `inspect`.

## 9. Tester TCP avec curl

`curl` est conçu notamment pour HTTP, mais peut aussi ouvrir une connexion TCP via son schéma `telnet://`.

Depuis Fedora, **après avoir confirmé les ports publiés** :

```bash
curl -v --connect-timeout 3 telnet://127.0.0.1:6379
curl -v --connect-timeout 3 telnet://127.0.0.1:9092
```

Si le port est accessible, la connexion TCP peut réussir puis rester ouverte ; terminer avec Ctrl+C. Si le port est refusé, vérifier mapping, processus, écoute et pare-feu. Un timeout peut signaler un filtrage ou un chemin réseau inaccessible.

**Ce test ne valide pas Redis ni Kafka.** Ne pas utiliser `curl http://127.0.0.1:6379` ou `curl http://127.0.0.1:9092` comme preuve de fonctionnement : leurs protocoles natifs ne sont pas HTTP.

Pour une vraie API HTTP, par exemple si une application expose explicitement `/health` sur le port 8080 :

```bash
curl -i --connect-timeout 3 http://127.0.0.1:8080/health
```

Ce dernier exemple ne s'applique **pas** automatiquement à Redis ou Kafka.

## 10. Tester Redis réellement

```bash
podman exec redis redis-cli ping
podman exec redis redis-cli INFO server
podman exec redis redis-cli INFO memory
podman exec redis redis-cli INFO clients
podman exec redis redis-cli INFO persistence
podman exec redis redis-cli DBSIZE
```

`PONG` valide une réponse au protocole Redis. `NOAUTH` indique que l'authentification est nécessaire ; ce n'est pas la même chose qu'une panne réseau.

Pour examiner des clés en lecture :

```bash
podman exec redis redis-cli --scan
podman exec redis redis-cli TYPE exemple
podman exec redis redis-cli TTL exemple
podman exec redis redis-cli GET exemple
podman exec redis redis-cli HGETALL exemple
```

Adapter la commande au type de clé. `DBSIZE` compte les clés, ce n'est pas une mesure mémoire. `TTL` vaut `-1` sans expiration et `-2` si la clé est absente. Préférer `SCAN` à `KEYS *` sur des bases volumineuses.

### Test d'écriture contrôlé (environnement de test uniquement)

```bash
podman exec redis redis-cli SET diagnostic:podman ok EX 60
podman exec redis redis-cli GET diagnostic:podman
podman exec redis redis-cli TTL diagnostic:podman
```

La clé expire au bout de 60 secondes. Ne pas écrire dans un Redis partagé sans autorisation. Les commandes supposent une authentification adaptée.

## 11. Tester Kafka réellement

Kafka est un broker de messages ; un **topic** contient des partitions ; un producteur publie des messages et un consommateur les lit. Un groupe de consommateurs coordonne la lecture et suit des offsets.

Vérifier la présence des scripts dans l'image :

```bash
podman exec kafka sh -c 'command -v kafka-topics.sh || true'
```

Si disponibles et si le broker est accessible sur `localhost:9092` **depuis son conteneur** :

```bash
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic mon-topic
podman exec kafka kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
podman exec kafka kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group mon-groupe
```

Les scripts peuvent être installés dans un autre chemin selon l'image. Adapter le port et la sécurité (TLS/SASL) à la configuration.

### Test producteur/consommateur (uniquement sur un broker de test autorisé)

```bash
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --create --topic diagnostic-local --partitions 1 --replication-factor 1
podman exec -it kafka kafka-console-producer.sh --bootstrap-server localhost:9092 --topic diagnostic-local
```

Saisir un message puis quitter le producteur avec Ctrl+C. Dans un autre terminal :

```bash
podman exec -it kafka kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic diagnostic-local --from-beginning --max-messages 1
```

La réplication 1 est destinée à un test mono-broker. Ne pas créer de topics ou messages sur un cluster partagé sans autorisation.

### Particularité Kafka : advertised.listeners

Le client se connecte au bootstrap server, reçoit les métadonnées du cluster puis se connecte aux adresses annoncées par les brokers. Si `advertised.listeners` contient des noms ou adresses inaccessibles depuis Fedora ou Distrobox, le bootstrap peut fonctionner mais la suite échouer.

Vérifier les listeners dans Compose et les logs. Ne pas supposer que `localhost:9092` convient à tous les clients.

## 12. Observer les logs et ressources

```bash
podman logs --tail 100 redis
podman logs -f kafka
podman logs --since 10m kafka
podman stats --no-stream redis kafka
podman system df
```

`logs -f` suit les nouveaux messages jusqu'à Ctrl+C, sans arrêter le conteneur. `stats` aide à repérer une consommation CPU ou RAM anormale. `system df` donne une vue de l'espace occupé par les ressources Podman.

Pour inspecter les healthchecks s'ils existent :

```bash
podman inspect redis --format '{{json .Config.Healthcheck}}'
podman inspect redis --format '{{json .State.Health}}'
```

Un healthcheck absent ne signifie pas que le service est défaillant.

## 13. Sécurité, permissions et volumes

```bash
podman exec redis id
podman inspect redis --format '{{.Config.User}}'
podman inspect redis --format '{{json .Mounts}}'
podman volume ls
podman volume inspect nom-volume
getenforce
```

Podman rootless utilise des mappings d'identifiants utilisateur. SELinux peut empêcher l'accès à des bind mounts malgré des permissions Unix apparemment correctes. Les options `:z` et `:Z` peuvent gérer les labels SELinux, mais ne doivent pas être appliquées aveuglément à des répertoires partagés ou système.

Les variables d'environnement peuvent contenir des secrets :

```bash
podman inspect redis --format '{{json .Config.Env}}'
```

Ne pas publier cette sortie telle quelle. Éviter toute commande destructive comme `FLUSHALL`, `podman volume rm`, `podman-compose down -v` sans avoir vérifié le périmètre et obtenu l'autorisation nécessaire.

## 14. Les erreurs les plus courantes

| Symptôme | Cause possible | Première action |
| --- | --- | --- |
| `podman exec` échoue | conteneur arrêté ou mauvais nom | `podman ps -a` |
| `bash: not found` | image sans Bash | essayer `sh` |
| `curl: connection refused` | mauvais port ou absence d'écoute | `podman port`, logs |
| `curl` réussit mais Redis échoue | TCP ouvert, problème protocole/authentification | `redis-cli ping` |
| `NOAUTH` | Redis protégé | vérifier configuration et accès autorisé |
| Kafka bootstrap puis timeout | listeners annoncés inaccessibles | examiner `advertised.listeners` |
| `redis` non résolu | réseau ou DNS incorrect | `podman network inspect` |
| `permission denied` sur volume | UID/GID ou SELinux | `id`, `Mounts`, labels |
| Données disparues après recréation | absence de volume/persistance | inspecter montages et config |
| `ss` ou `curl` absent | image minimale | diagnostiquer depuis Fedora |

## 15. Exercice guidé : exploration complète de Redis

**Étape A — Fedora :**

```bash
podman ps -a
podman port redis
podman inspect redis --format '{{json .NetworkSettings}}'
podman inspect redis --format '{{json .Mounts}}'
podman logs --tail 30 redis
```

**Étape B — Entrer :**

```bash
podman exec -it redis sh
```

**Étape C — Dans le conteneur :**

```bash
pwd
id
hostname
cat /etc/os-release
redis-cli ping
redis-cli INFO memory
exit
```

**Étape D — Depuis Fedora :**

```bash
podman exec redis redis-cli DBSIZE
podman stats --no-stream redis
```

Puis tester le port avec `curl -v --connect-timeout 3 telnet://127.0.0.1:PORT` en remplaçant `PORT` par le **port hôte** effectivement publié.

## 16. Exercice guidé : exploration complète de Kafka

**Étape A — Fedora :**

```bash
podman ps -a
podman port kafka
podman inspect kafka --format '{{json .NetworkSettings}}'
podman logs --tail 50 kafka
```

**Étape B — Entrer :**

```bash
podman exec -it kafka sh
```

**Étape C — Dans le conteneur :**

```bash
pwd
id
hostname
cat /etc/os-release
command -v kafka-topics.sh
exit
```

**Étape D — Depuis Fedora :**

```bash
podman exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
podman stats --no-stream kafka
```

Adapter le chemin des scripts, l'adresse bootstrap et les paramètres de sécurité à l'image réelle.

## 17. Tableau de commandes à mémoriser

| Question | Commande |
| --- | --- |
| Quels conteneurs ? | `podman ps -a` |
| Quel état ? | `podman inspect redis --format '{{.State.Status}}'` |
| Comment entrer ? | `podman exec -it redis sh` |
| Comment sortir ? | `exit` |
| Comment lancer une commande ? | `podman exec redis redis-cli ping` |
| Quels ports ? | `podman port redis` |
| Quel réseau ? | `podman inspect redis --format '{{json .NetworkSettings}}'` |
| Quels volumes ? | `podman inspect redis --format '{{json .Mounts}}'` |
| Quels logs ? | `podman logs --tail 100 redis` |
| Quelles ressources ? | `podman stats --no-stream redis` |
| Redis répond ? | `podman exec redis redis-cli ping` |
| Quels topics Kafka ? | `kafka-topics.sh --list` avec bootstrap approprié |

## 18. Routine professionnelle

1. **Identifier** : noms, images, état.
2. **Comprendre** : processus, utilisateur, montages, variables, réseau.
3. **Tester TCP** : depuis le bon environnement, sur le bon port.
4. **Tester le protocole** : Redis CLI ou Kafka CLI.
5. **Observer** : logs, healthchecks, ressources.
6. **Corriger avec prudence** : Compose plutôt que modifications manuelles internes.
7. **Revérifier** : refaire exactement les mêmes tests après intervention.

Le principe essentiel : **un conteneur démarré, un port accessible et un service opérationnel sont trois états différents**. Cette distinction doit guider chaque diagnostic.
