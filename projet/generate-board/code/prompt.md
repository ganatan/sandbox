# OpenCode — SBOM report generator

Work from `generate-board/`.

## Input

- `code/data.json`: current JSON input (English).
- `models/report-v1.0.md`: English report template.
- `models/glossary-v1.0.md`: English glossary template.

## Output and revision naming

- First delivery: `results/REV001/`; next delivery: `results/REV002/`, then `results/REV003/`, etc.
- `delivery.revision` in `code/data.json` determines the directory and file suffix.
- For `REV003`, generate exactly:
  - `xxxx-data-rev003.json`
  - `xxxx-sbom-rev003.md`
  - `xxxx-sbom-rev003-fr.md`
  - `xxxx-glossary-rev003.md`
  - `xxxx-glossary-rev003-fr.md`

## Requirements

1. Do not overwrite an existing revision or modify validated archived files.
2. Copy the JSON input without modification to the archive.
3. Generate the authoritative English report and glossary using the versioned English templates.
4. Translate both English documents into French; do not independently regenerate French from JSON.
5. Check numerical totals, version numbers, SPDX identifiers, sources and uncertainties match in both languages.
6. Compare with the previous archived snapshot; describe only differences supported by the two JSON files.
7. Glossary: alphabetic, factual, concise, and only terms actually used in the report.
8. Do not invent licenses, versions, deployment claims or compliance conclusions. Mark simulations explicitly.
9. Keep templates and work input unchanged. Stop if there is a collision or validation failure.
10. Report the paths of the five generated files.

`REV001` is an internal sequential document revision convention consistent with general ISO document control principles; it is not a mandatory ISO format.
