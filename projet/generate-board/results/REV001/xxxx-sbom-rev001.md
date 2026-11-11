# Open Source SBOM and License Review

**Organization:** ganatan  
**Project:** xxxx  
**Document ID:** XXXX-SBOM  
**Revision:** REV001  
**Snapshot date:** 2026-11-11  
**Template version:** 1.0  
**Status:** SIMULATION — not audited

## 1. Purpose and scope

Simulated inventory of standardized workstations, application repositories, contracts and declared infrastructure. This is neither a standardized SBOM export nor a compliance certification.

## 2. Summary

- **Technologies in scope:** 26
- **Simulated repositories:** 6
- **Illustrative dependencies:** 11
- **Unverified dependency licenses:** 11

| Domain | Technologies |
|---|---:|
| postes | 4 |
| outils-developpement | 10 |
| applications-frameworks | 5 |
| infrastructure-deploiement | 5 |
| supervision | 2 |

## 3. Dependencies and licenses (simulated extract)

| Dependency | Version | Assumed license | Copyleft | Verification |
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

Licenses and versions are copied from the simulation JSON; none was checked against released packages. A `none` copyleft classification is not a compliance finding.

## 4. Revision changes

Initial fictional delivery; no previous revision.

## 5. Items to verify

- Confirm actual software editions and versions.
- Inspect `pom.xml`, `Cargo.toml`, `package.json` and associated lockfiles.
- Gather license evidence, including transitive dependencies.
- Review copyleft and unknown licensing first.
- Distinguish declared, installed and deployed software.

## 6. Standards and references

SBOM: structured software inventory; SPDX (ISO/IEC 5962): exchange standard; OpenChain (ISO/IEC 5230): license compliance program. References to standards do not demonstrate compliance.

**Conclusion:** reporting exercise only. Any compliance decision requires a verified inventory.
