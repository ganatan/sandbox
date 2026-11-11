# OpenCode — SBOM report generator

Work from `generate-board/`.

## Input and templates

- `code/data.json` is the current input snapshot.
- `models/report-v1.0.md` is the English report template.
- `models/glossary-v1.0.md` is the English glossary template.

## Delivery rules

1. Read `code/data.json` and its `delivery.revision`, e.g. `REV02`.
2. Use uppercase folder `results/REV02/` and lowercase suffix `rev02`.
3. Do not overwrite an existing archived revision. Stop and report the collision.
4. First archive the JSON as `xxxx-data-001-rev02.json`, unchanged.
5. Generate the English primary `xxxx-sbom-001-rev02.md` and `xxxx-glossary-001-rev02.md`.
6. Translate those English documents faithfully into `xxxx-sbom-001-rev02-fr.md` and `xxxx-glossary-001-rev02-fr.md`.
7. Keep all numbers, versions, SPDX license identifiers, tables, uncertainties and source paths identical between English and French.
8. The glossary is alphabetical, factual, concise and restricted to terms used by the generated report.
9. Clearly mark the documents as simulations. Do not claim any license is verified when the JSON says otherwise.
10. Compare the new archived input with the preceding revision if available; mention only genuine, traceable changes.
11. Do not create any other deliverables and do not edit existing archives.
12. Verify that exactly five files are present for the revision and that the archived JSON matches the input.

English is authoritative. `-fr` is the translated version. The numbering is an internal controlled-document convention aligned with ISO document-control principles, not an ISO-mandated filename syntax.
