# Generate Board — Project xxxx

**Company:** ganatan  
**Purpose:** Simulate an Open Source inventory and license analysis with OpenCode.

## Structure

```text
generate-board/
├── README.md
├── README-fr.md
├── models/
│   ├── data-model.json
│   ├── report-v1.0.md
│   └── glossary-v1.0.md
├── code/
│   ├── data.json
│   └── prompt.md
└── results/
    ├── REV001/
    │   ├── xxxx-data-rev001.json
    │   ├── xxxx-sbom-rev001.md
    │   ├── xxxx-sbom-rev001-fr.md
    │   ├── xxxx-glossary-rev001.md
    │   └── xxxx-glossary-rev001-fr.md
    └── REV002/
        ├── xxxx-data-rev002.json
        ├── xxxx-sbom-rev002.md
        ├── xxxx-sbom-rev002-fr.md
        ├── xxxx-glossary-rev002.md
        └── xxxx-glossary-rev002-fr.md
```

## Rules

- One sequential number: `REV001`, `REV002`, `REV003`; no additional document serial number.
- Version in **folder and every filename**.
- English is authoritative; French translations use `-fr`.
- Five files per release, including the immutable input JSON snapshot.
- Template versions (`v1.0`) are independent of delivery revisions.
- ISO 9001/10013 document control principles do **not** prescribe this exact naming syntax.
- All data and sample reports are fictitious, not verified audit findings.

## Generate REV003 (PowerShell)

From the sandbox repository root:

```powershell
git pull github master
cd projet/generate-board
opencode
```

Then enter:

```text
Read code/prompt.md and generate REV003 using code/data.json.
```

`code/data.json` is preconfigured with `delivery.revision: REV003`. Update actual collected data and snapshot dates before real releases. Do not overwrite an existing revision.

## Validate and commit

```powershell
Get-ChildItem results/REV003
git diff -- results/
```

From the sandbox root:

```powershell
git add projet/generate-board
git commit -m "docs: archive SBOM REV003"
git push github master
```

Validate English/French consistency and the archived JSON before publishing.
