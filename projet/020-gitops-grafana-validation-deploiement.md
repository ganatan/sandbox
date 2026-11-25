# 020 — GitOps : validation du déploiement des dashboards Grafana

## 1. Objectif

Vérifier en production que les dashboards déclarés dans Git sont effectivement chargés dans Grafana après déploiement. Aucun environnement Grafana, Prometheus ou Kubernetes local n'est nécessaire. Les contrôles sont réalisés en lecture seule depuis un poste autorisé.

## 2. Responsabilités

| Composant | Responsabilité |
|---|---|
| Services applicatifs | Exposer les métriques |
| Prometheus | Collecter les métriques |
| GitOps | Décrire les ressources à déployer |
| GitLab CI | Valider les changements |
| ArgoCD | Réconcilier Git et Kubernetes |
| Kubernetes | Héberger les ConfigMaps |
| Grafana | Charger et afficher les dashboards |
| Tooling | Vérifier indépendamment le résultat |

## 3. Chaîne de déploiement

```text
GitOps → CI → ArgoCD → Kubernetes ConfigMap
                           ↓
                    Sidecar ou montage
                           ↓
                    Grafana provisioning
                           ↓
                    Dashboard disponible
```

Le sidecar est un mécanisme fréquent, pas une obligation. Vérifier le chart Helm, les manifests et les paramètres de provisioning réellement utilisés.

## 4. ConfigMap

Exemple générique :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: example-dashboard
  labels:
    grafana_dashboard: "1"
data:
  example.json: |
    {
      "uid": "example-dashboard",
      "title": "Example Dashboard",
      "panels": []
    }
```

Kubernetes stocke le JSON comme texte. Il ne valide pas sa sémantique Grafana. Le label doit correspondre au sélecteur réellement configuré. Le namespace doit être surveillé par le sidecar, si celui-ci existe.

## 5. CI et CD

La CI peut valider YAML, JSON, UID uniques et manifests rendus par Helm ou Kustomize. Elle ne prouve pas que Grafana a chargé les dashboards.

ArgoCD compare l'état souhaité (Desired State) et l'état réel (Live State). Une divergence est un drift. La réconciliation peut être automatique ou manuelle. Synced signifie que les ressources suivies correspondent à l'état attendu selon les règles de comparaison. Healthy ne garantit pas le chargement applicatif des dashboards.

## 6. Provisioning

Dans une architecture avec sidecar, celui-ci observe les ConfigMaps sélectionnées via l'API Kubernetes, écrit les fichiers JSON dans un volume partagé et Grafana les charge selon sa configuration de provisioning. Une mise à jour peut être prise en compte sans redémarrage. Le délai dépend de la configuration.

Des labels erronés, des droits RBAC insuffisants, des collisions de noms de fichiers ou des UID dupliqués peuvent empêcher le chargement.

## 7. Préparer le contrôle

Identifier le contexte Kubernetes autorisé, l'application ArgoCD, le namespace, les noms des ConfigMaps, les UID des dashboards, la révision Git attendue et l'URL Grafana. Utiliser des identifiants de lecture seule. Ne jamais stocker de jeton dans Git ni désactiver la vérification TLS.

Les variables des commandes suivantes doivent être renseignées selon l'environnement réel.

## 8. Vérifier ArgoCD

```bash
argocd app get "$ARGO_APP" -o json | jq '.status | {sync, health, operationState}'
```

Contrôler Synced, Healthy lorsque pertinent, et la révision réellement déployée. Pour une application multi-source, vérifier les révisions de chaque source pertinente. Un déploiement plus récent que le commit attendu doit être traité explicitement et non accepté silencieusement.

## 9. Vérifier Kubernetes

```bash
kubectl config current-context
kubectl --context "$KUBE_CONTEXT" -n "$NAMESPACE" get configmap "$CONFIGMAP" -o json
```

Extraire un dashboard de la ConfigMap réelle :

```bash
kubectl --context "$KUBE_CONTEXT" -n "$NAMESPACE" get configmap "$CONFIGMAP" -o json | jq -er --arg key "$DASHBOARD_FILE" '.data[$key] | fromjson'
```

Comparer le contenu avec le manifest rendu pour la révision attendue, et non avec une branche locale contenant des changements non déployés.

## 10. Vérifier Grafana

```bash
curl -fsS --connect-timeout 5 --max-time 20 -H "Authorization: Bearer $GRAFANA_TOKEN" "$GRAFANA_URL/api/dashboards/uid/$DASHBOARD_UID" | jq '.dashboard | {uid,title,panels}'
```

HTTP 200 et UID attendu prouvent la présence du dashboard accessible au compte. Comparer également les titres, panels, requêtes, variables et datasources. Grafana peut normaliser certains champs, notamment id, version et schemaVersion. Définir une comparaison explicite et adaptée à la version utilisée ; ne pas ignorer arbitrairement les différences fonctionnelles.

HTTP 401 ou 403 signifie un problème d'accès. HTTP 404 peut indiquer un dashboard absent ou inaccessible selon les permissions. Un timeout ne prouve pas l'absence.

## 11. Diagnostic

```bash
kubectl --context "$KUBE_CONTEXT" -n "$NAMESPACE" get pods
kubectl --context "$KUBE_CONTEXT" -n "$NAMESPACE" logs "$GRAFANA_POD" -c "$SIDECAR_CONTAINER" --since=15m
kubectl --context "$KUBE_CONTEXT" -n "$NAMESPACE" logs "$GRAFANA_POD" -c "$GRAFANA_CONTAINER" --since=15m
```

Adapter le namespace et les noms de conteneurs. Consulter les logs uniquement si les droits et règles d'exploitation le permettent.

| Symptôme | Vérification |
|---|---|
| OutOfSync | Révision, rendu, synchronisation |
| ConfigMap absente | Namespace, nom, application ArgoCD |
| ConfigMap présente mais dashboard absent | Sélecteur, RBAC, sidecar, provisioning |
| Dashboard ancien | Révision, délai, collision UID, contenu |
| Dashboard chargé sans données | Datasource et PromQL, hors périmètre du test de déploiement |

## 12. Projet Tooling

```text
tooling/
├── license-inventory/
└── grafana-deployment-validation/
    ├── README.md
    ├── config.json
    ├── validate.py
    └── results/
```

Le script lit les manifests attendus, interroge ArgoCD, Kubernetes et Grafana, compare les états et génère un rapport. Les secrets proviennent de l'environnement ou d'un mécanisme approuvé. Les résultats contenant des informations internes ne doivent pas être publiés.

Prévoir des délais bornés, quelques tentatives espacées pour tenir compte de la réconciliation, et des erreurs explicites. Ne jamais déclencher une synchronisation, modifier une ConfigMap ou importer un dashboard en production.

## 13. Rapport simulé

```json
{
  "environment": "production",
  "expectedRevision": "example-commit",
  "dashboards": [
    {
      "uid": "example-dashboard",
      "argocd": "PASS",
      "configMap": "PASS",
      "grafana": "PASS",
      "configuration": "PASS"
    }
  ],
  "status": "PASS"
}
```

PASS : tous les contrôles requis sont concluants. FAIL : divergence démontrée. UNKNOWN : contrôle impossible ou preuve insuffisante. Retourner un code non nul si la validation globale n'est pas PASS. Ne pas considérer un contrôle ignoré comme réussi.

## 14. Prompt OpenCode

Dans le dépôt Tooling interne, créer le projet grafana-deployment-validation sans modifier les autres projets. Commencer par analyser les manifests GitOps et identifier le mécanisme réel de provisioning. Implémenter un outil Python simple, configurable, en lecture seule, avec tests unitaires sur des données fictives et un README détaillant les prérequis, commandes, erreurs et limites. Ne pas exécuter de contrôle en production sans les accès et autorisations appropriés. Ne pas effectuer de commit automatique.

## 15. Critères de réussite

- Révision attendue effectivement synchronisée.
- ConfigMaps présentes et contenu conforme.
- Tous les UID attendus accessibles dans Grafana.
- Configuration effective conforme après normalisation documentée.
- Rapport reproductible, sans secrets.
- Aucune mutation de la production.

La validation fonctionnelle des métriques et requêtes PromQL est un niveau supplémentaire, distinct du contrôle de déploiement.

## 16. Références

- https://argo-cd.readthedocs.io/en/stable/
- https://kubernetes.io/docs/concepts/configuration/configmap/
- https://grafana.com/docs/grafana/latest/administration/provisioning/
- https://grafana.com/docs/grafana/latest/developers/http_api/dashboard/

Ce guide est générique. Les commandes n'ont pas été exécutées sur un environnement de production. Les versions, accès, namespaces et mécanismes de provisioning doivent être confirmés avant utilisation.
