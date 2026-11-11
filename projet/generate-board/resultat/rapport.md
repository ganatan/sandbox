# Inventaire des composants open source — xxx

**Société :** ganatan  
**Date du relevé :** 11 novembre 2026  
**Statut :** Simulation — données fictives

## 1. Périmètre et synthèse

Le jeu de données simule l'analyse de **4 dépôts techniques**. Il comporte **6 composants distincts**, uniquement identifiés comme **déclarés** dans des fichiers. Aucun déploiement effectif n'est confirmé.

## 2. Inventaire

| Composant | Version | Licence indiquée | Dépôt | Preuve | Statut |
|---|---|---|---|---|---|
| Apache Kafka | 3.8.0 | Apache-2.0 | xxx/messaging | deploy/kafka/values.yaml | Déclaré |
| Redis | 7.2.5 | À vérifier | xxx/cache | docker-compose.yml | Déclaré |
| Kubernetes | 1.30.4 | Apache-2.0 | xxx/platform | clusters/dev/README.md | Déclaré |
| Prometheus | 2.54.1 | Apache-2.0 | xxx/observability | monitoring/prometheus.yaml | Déclaré |
| Grafana | Non renseignée | AGPL-3.0-only (à confirmer) | xxx/observability | monitoring/grafana/values.yaml | Déclaré |
| Helm | 3.16.1 | Apache-2.0 | xxx/platform | deploy/Chart.yaml | Déclaré |

## 3. Points à vérifier

- **Grafana :** version absente et licence à confirmer.
- **Redis :** licence applicable à la version et à la distribution à déterminer.
- **Ensemble des composants :** vérifier les versions, les licences et la présence effective dans les environnements cibles.

## 4. Conclusion

Ce premier inventaire fournit une base de travail traçable. Il ne constitue ni une preuve de déploiement, ni une validation de conformité des licences.
