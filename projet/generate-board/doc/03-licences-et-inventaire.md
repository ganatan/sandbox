# 03 — Licences, copyleft et saisie du JSON

## 1. Une licence

Une licence indique ce qui est permis avec un logiciel et à quelles conditions : utilisation, copie, modification, redistribution et obligations associées.

**Copyleft** : certaines licences demandent, dans certaines conditions de redistribution ou de mise à disposition, de conserver la licence et de fournir du code source correspondant. Cela ne rend pas automatiquement tous les logiciels d'une entreprise Open Source.

## 2. Exemples concrets

| Logiciel | Licence courante | Copyleft | Conséquence typique |
|---|---|---|---|
| Angular | MIT | Non | Une application propriétaire peut utiliser Angular ; conserver les mentions requises lors de la redistribution |
| Git | GPL-2.0-only | Fort | Utiliser Git ne place pas le code géré sous GPL ; distribuer Git modifié peut créer des obligations |
| OpenJDK | GPL v2 avec Classpath Exception sur les composants concernés | Avec exception | Utiliser les bibliothèques Java couvertes ne force pas à publier le code de son application |

Toujours vérifier la **version**, la **distribution** et les notices applicables. Une licence copyleft n'est pas automatiquement un problème.

| Famille | Idée principale |
|---|---|
| MIT, BSD, Apache-2.0 | Licences permissives, avec notices et conditions à respecter |
| GPL | Copyleft fort dans les situations concernées |
| LGPL | Copyleft plus limité, notamment pour certaines bibliothèques |
| AGPL | Copyleft comprenant des dispositions relatives à certaines interactions réseau |

Les obligations dépendent du contexte : usage interne, modification, distribution au client, service en réseau. Un classement `copyleft: strong` n'est pas une conclusion juridique.

## 3. Remplir data.json manuellement

Fichier : `generate-board/code/data.json`.

Il contient actuellement la dernière révision **REV002**. Son contenu et ses valeurs descriptives sont en **anglais**.

Exemple de composant de catégorie :

```json
{
  "name": "Angular",
  "version": null,
  "license": "MIT",
  "copyleft": "none",
  "verification": "unverified"
}
```

Exemple de dépendance :

```json
{
  "name": "@angular/core",
  "version": "20.1.0",
  "direct": true,
  "license": "MIT",
  "copyleft": "none",
  "licenseStatus": "assumed",
  "source": "package-lock.json",
  "licenseSource": "npm registry or LICENSE file to verify"
}
```

**Ces exemples sont fictifs.** `null` veut dire « inconnu », pas « inexistant ».

- `assumed` : hypothèse.
- `to_be_verified` : à vérifier.
- `unverified` : non vérifié.
- `verified` : vérifié avec une preuve identifiable.

Dans le JSON actuel, certaines catégories utilisent `verification` et certaines dépendances `licenseStatus`. Respecter la structure existante lors de la première saisie ; ne pas inventer des champs en pensant qu'ils sont déjà exploités.

## 4. Pour chaque composant

1. Noter le nom exact.
2. Relever la version observée ou laisser `null`.
3. Identifier la source : commande, manifeste, lockfile, notice, métadonnée.
4. Vérifier la licence réellement applicable à cette version ; sinon laisser le statut incertain.
5. Classer le copyleft uniquement si la licence est suffisamment identifiée.
6. Ne pas conclure à des obligations sans le contexte d'usage et de distribution.

Une mention `licenseSource: "to verify"` ne constitue pas une preuve. Conserver les preuves professionnelles dans un emplacement autorisé.

## 5. Cas infrastructure

Un chart Helm mentionnant Kafka ou Redis ne prouve pas que le service est actif. Distinguer **déclaré**, **installé** et **déployé**. Attention aux changements de licences selon les éditions et versions, notamment Redis.

**Objectif :** chaque valeur du rapport doit pouvoir être reliée à un constat ou être clairement marquée comme hypothèse.
