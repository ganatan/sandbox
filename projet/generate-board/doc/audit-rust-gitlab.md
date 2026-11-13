# Audit open source — collecte GitLab avec Rust

Date : 2026-11-13

## 1. Objectif

Produire un inventaire traçable des composants open source à partir des dépôts GitLab locaux, puis alimenter `code/data.json` du projet Generate Board. OpenCode intervient ensuite pour la rédaction des rapports et glossaires, sans inventer de données.

## 2. Environnement retenu

- Poste Fedora, avec Rust et Cargo disponibles.
- Dépôts GitLab clonés sous `~/workspace/repositories/`.
- Syft non disponible : ne pas en faire un prérequis.
- Podman et Distrobox disponibles sur le poste ; ils ne prouvent pas leur utilisation en production.
- Applications : Angular, React, éventuellement Java et Rust.
- Infrastructure : Kubernetes, Helm, Argo CD, Redis, Kafka, Grafana, Prometheus.
- Nexus peut contenir des artefacts et dépendances, à vérifier selon les droits disponibles.
- Terraform n'est pas retenu dans le périmètre annoncé.

## 3. Architecture

```text
~/workspace/repositories/
  ui/
    angular-app/
      package.json
      package-lock.json
    react-app/
      package.json
      package-lock.json
  infra/
    argocd/
      applications.yaml
    helm/
      Chart.yaml
    kubernetes/
      redis.yaml

Analyseur Rust
  -> inventaire technique validé
  -> generate-board/code/data.json
  -> OpenCode
  -> generate-board/results/REVxxx/
```

Les deux dépôts sont des **simulations** ; les noms, versions et résultats cités ci-dessous sont fictifs.

## 4. Application Rust

Projet minimal :

```text
audit/
  Cargo.toml
  src/
    main.rs
    audit.rs
```

`main.rs` appelle le module `audit.rs`. Le module parcourt les dépôts en lecture seule, analyse les manifestes et écrit un JSON. Pour des JSON et YAML fiables, utiliser des parseurs adaptés disponibles dans le cache Cargo ou Nexus ; ne pas supposer leur disponibilité hors ligne.

Exécution cible :

```bash
cargo run --offline
```

Cette commande ne fonctionne hors ligne que si toutes les dépendances nécessaires sont déjà disponibles.

## 5. Dépôt UI : Angular et React

- Lire `package.json` pour les dépendances directes déclarées.
- Lire `package-lock.json` pour les versions résolues et, si présent, l'inventaire transitif.
- Conserver le chemin du fichier, la référence Git et la nature de la preuve.
- Ne pas confondre une plage `^20.0.0` avec une version exacte.

Exemple fictif : Angular 20.1.2, RxJS 7.8.2, React 19.1.0.

## 6. Dépôt infrastructure

- `Chart.yaml` : dépendances Helm et versions **des charts**, pas nécessairement des logiciels.
- `Chart.lock` : versions des charts résolues lorsqu'il existe.
- Manifeste Kubernetes : images déclarées dans les ressources (Deployment, StatefulSet, DaemonSet, Job, CronJob, Pod, etc.).
- Argo CD `Application` / `ApplicationSet` : sources Git, chemins, révisions et destinations déclarées.
- `values.yaml` : valeurs et références d'images, à interpréter selon les templates Helm.
- Les images OCI peuvent être utilisées avec Podman sans moteur Docker.

Exemple fictif : image `redis:7.2.4`, chart Grafana `8.5.0`, chart Prometheus `27.0.0`.

Une configuration GitOps ne prouve pas un déploiement réel. L'état d'Argo CD et du cluster doit être consulté séparément si l'accès est autorisé.

## 7. Règles de fiabilité

Pour chaque élément, conserver au minimum :

- nom, catégorie, version ou contrainte de version ;
- dépôt, chemin du fichier, commit Git ;
- preuve d'identification et statut : `declared`, `resolved` ou `deployed` ;
- licence et source de licence, ou `null` si non vérifiée ;
- erreurs et éléments non résolus.

Ne jamais déduire automatiquement la licence d'un composant depuis son nom. Ne pas déclarer un inventaire exhaustif si seules les dépendances directes sont analysées. Les versions déclarées, résolues et effectivement déployées doivent rester distinctes.

## 8. Format de sortie

```json
{
  "repository": "ui",
  "applications": [
    {
      "name": "angular-app",
      "components": [
        {
          "name": "@angular/core",
          "version": "20.1.2",
          "status": "resolved",
          "license": null,
          "source": "angular-app/package-lock.json"
        }
      ]
    }
  ]
}
```

Cet extrait illustre le **format intermédiaire de collecte**, pas nécessairement le schéma déjà attendu par `generate-board/code/data.json`. Prévoir une transformation et une validation explicites avant de remplacer les données du générateur.

## 9. Procédure sur le poste

1. Cloner les dépôts autorisés dans `~/workspace/repositories/`.
2. Relever la branche et le commit de chaque dépôt.
3. Examiner manuellement un dépôt UI et un dépôt infrastructure.
4. Tester le programme Rust sur ces deux dépôts.
5. Comparer les résultats aux manifestes et fichiers lock.
6. Conserver les composants inconnus et les erreurs d'analyse.
7. Consolider l'inventaire, sans supprimer les doublons de versions différentes.
8. Valider le JSON contre le schéma d'entrée Generate Board.
9. Préparer une nouvelle révision dans `code/data.json`.
10. Lancer OpenCode avec `code/prompt.md`, contrôler les livrables et archiver la révision dans `results/`.

## 10. Séparation des responsabilités

**Rust** : collecte, normalisation, contrôles, preuves et génération déterministe.

**OpenCode** : rédaction et mise en forme à partir des données vérifiées.

**Relecture humaine** : contrôle des licences, des ambiguïtés, du périmètre et de la pertinence du rapport.

L'inventaire technique n'est pas à lui seul une preuve de conformité juridique ni une SBOM exhaustive.

## 11. Évolutions

Commencer par deux applications UI et trois manifestes d'infrastructure. Étendre ensuite aux autres types de ressources Kubernetes, aux images par digest, aux dépendances transitives, aux licences vérifiées, à Argo CD et éventuellement à Nexus. Ne pas introduire de complexité avant d'avoir validé le premier flux de bout en bout.
