# Generate Board

Generate an Open Source inventory report and a glossary with OpenCode.

## 1. Prepare the data

Edit `code/data.json`.

Set `delivery.revision` to the next revision, such as `REV003`, and update the date and inventory data.

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

For `REV003`, OpenCode creates:

```text
results/
└── REV003/
    ├── xxxx-data-rev003.json
    ├── xxxx-sbom-rev003.md
    ├── xxxx-sbom-rev003-fr.md
    ├── xxxx-glossary-rev003.md
    └── xxxx-glossary-rev003-fr.md
```

English is the reference version. Files ending in `-fr.md` are French translations.

Previous revisions remain unchanged.
