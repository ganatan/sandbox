# Generate Board — Project xxxx

**Organization:** ganatan  
**Status:** simulated data and reports

## Layout

```text
generate-board/
├── README.md
├── models/
│   ├── data-model.json
│   ├── report-v1.0.md
│   └── glossary-v1.0.md
├── code/
│   ├── data.json
│   └── prompt.md
└── results/
    ├── REV00/
    │   ├── xxxx-data-001-rev00.json
    │   ├── xxxx-sbom-001-rev00.md
    │   ├── xxxx-sbom-001-rev00-fr.md
    │   ├── xxxx-glossary-001-rev00.md
    │   └── xxxx-glossary-001-rev00-fr.md
    └── REV01/
        ├── xxxx-data-001-rev01.json
        ├── xxxx-sbom-001-rev01.md
        ├── xxxx-sbom-001-rev01-fr.md
        ├── xxxx-glossary-001-rev01.md
        └── xxxx-glossary-001-rev01-fr.md
```

## Conventions

- **XXXX-SBOM-001** identifies the controlled report series.
- **REV00, REV01, ...** are revisions of that series, independent of date.
- File names carry the revision, so they remain identifiable outside their folders.
- English is the authoritative language. Only French translations use `-fr`.
- Each validated revision has five files, including the immutable JSON snapshot.
- `models/*-v1.0.md` are template versions, **not** delivered report revisions.
- ISO 9001 document control guidance supports identification and revision control but does **not** mandate this naming syntax.

## Test REV00 and REV01

The two revisions are prepopulated with illustrative data and documents.

REV01 demonstrates three **simulated** differences: an Angular package version update, a Kafka version declared in Helm, and a Grafana version appearing in the inventory. None is a verified finding.

## Generate REV02 with OpenCode (PowerShell)

From the sandbox repository:

```powershell
git pull
cd projet/generate-board
```

Copy the latest JSON into the working input and change only its delivery metadata / actual collected findings:

```powershell
Copy-Item results/REV01/xxxx-data-001-rev01.json code/data.json
```

Edit `code/data.json`: set `delivery.revision` to `REV02`, update `snapshotDate`, `delivery.date` and real collected data. Preserve unknowns as `null`; never turn assumed licenses into verified licenses without evidence.

```powershell
opencode
```

Then ask:

```text
Read code/prompt.md and perform the requested delivery for code/data.json.
```

Alternative:

```powershell
opencode run --agent build "Read code/prompt.md and generate the next revision."
```

OpenCode should create exactly five files under `results/REV02/`. If that folder already contains a revision, do not overwrite it.

## Check and archive

```powershell
Get-ChildItem results/REV02
git diff -- results/
```

From the repository root:

```powershell
git add projet/generate-board
git commit -m "docs: archive SBOM revision REV02"
git push
```

Check the English and French totals and the immutable data snapshot before accepting any revision.
