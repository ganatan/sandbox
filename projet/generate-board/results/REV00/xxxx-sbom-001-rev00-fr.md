# Rapport d'inventaire Open Source et des licences

**Organisation :** ganatan  
**Projet :** xxxx  
**Référence :** XXXX-SBOM-001  
**Révision :** REV00  
**Date :** 2026-11-11  
**Modèle :** 1.0  
**Statut :** SIMULATION — données non auditées

## 1. Objet et périmètre

Inventaire simulé des postes homogènes, dépôts applicatifs, contrats et infrastructure déclarée. Il ne s'agit ni d'un SBOM normalisé ni d'une validation de conformité.

## 2. Synthèse

- **Technologies dans le périmètre :** 26
- **Dépôts simulés :** 6
- **Exemples de dépendances :** 11
- **Licences de dépendances non vérifiées :** 11

| Domaine | Technologies |
|---|---:|
| postes | 4 |
| outils-developpement | 10 |
| applications-frameworks | 5 |
| infrastructure-deploiement | 5 |
| supervision | 2 |

## 3. Dépendances et licences (extrait simulé)

| Dépendance | Version | Licence présumée | Copyleft | Vérification |
|---|---|---|---|---|
| @angular/core | 20.0.0 | MIT | none | presume |
| rxjs | 7.8.2 | Apache-2.0 | none | presume |
| @angular-architects/module-federation | Not established | Not established | unknown | a_verifier |
| react | 18.3.1 | MIT | none | presume |
| react-dom | 18.3.1 | MIT | none | presume |
| io.quarkus:quarkus-rest | Not established | Apache-2.0 | none | presume |
| io.quarkus:quarkus-hibernate-orm-panache | Not established | Apache-2.0 | none | presume |
| org.example:shared-contracts | Not established | Not established | unknown | a_verifier |
| serde | 1.0.210 | MIT OR Apache-2.0 | none | presume |
| tokio | 1.40.0 | MIT | none | presume |
| au.com.dius.pact:consumer:junit5 | Not established | Not established | unknown | a_verifier |

Les licences et versions proviennent du JSON de simulation ; aucune n'a été contrôlée sur les logiciels publiés. La catégorie `none` n'est pas une attestation de conformité.

## 4. Évolution de la révision

Première livraison fictive ; aucune précédente à comparer.

## 5. Points à vérifier

- Confirmer les éditions et les versions effectivement utilisées.
- Lire les fichiers `pom.xml`, `Cargo.toml`, `package.json` et les fichiers de verrouillage associés.
- Recueillir les preuves des licences, y compris pour les dépendances transitives.
- Examiner en priorité les composants à copyleft et les licences inconnues.
- Distinguer logiciels déclarés, installés et effectivement déployés.

## 6. Référentiels

SBOM : inventaire logiciel structuré ; SPDX (ISO/IEC 5962) : standard d'échange ; OpenChain (ISO/IEC 5230) : programme de conformité des licences. Ces références ne démontrent aucune conformité du projet.

**Conclusion :** exercice de reporting uniquement. Toute décision de conformité exige un inventaire réellement vérifié.
