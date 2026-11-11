# Generate Board

Generate an Open Source report and glossary with OpenCode.

## 1. Prepare the next revision

The file `code/data.json` currently contains the latest completed revision: **REV002**.

To prepare **REV003**:

1. Open `code/data.json`.
2. Replace `"revision": "REV002"` with `"revision": "REV003"` in `delivery`.
3. Set `snapshotDate` and `delivery.date` to the new report date (`YYYY-MM-DD`).
4. Update the inventory information you want to report. Keep all JSON values in English.

Do not edit the archived `results/REV002/` files.

## 2. Run OpenCode

From `generate-board/`:

```powershell
opencode
```

Enter:

```text
Read code/prompt.md and generate the report.
```

## 3. Generated files

OpenCode creates:

```text
results/
└── REV003/
    ├── xxxx-data-rev003.json
    ├── xxxx-sbom-rev003.md
    ├── xxxx-sbom-rev003-fr.md
    ├── xxxx-glossary-rev003.md
    └── xxxx-glossary-rev003-fr.md
```

The English report and glossary are the originals. Files ending in `-fr.md` are French translations.

For the following delivery, repeat with **REV004**, then **REV005**, and so on.
