#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
rm -rf .out
mkdir -p .out/model .out/catalogue .out/format
for module in film-model film-catalogue film-format; do
    mkdir -p "$module/dist"
    rm -f "$module/dist/"*.jar
done
javac -source 8 -target 8 -d .out/model film-model/src/com/ganatan/cinema/model/Film.java
jar cf film-model/dist/film-model.jar -C .out/model .
javac -source 8 -target 8 -cp film-model/dist/film-model.jar -d .out/catalogue film-catalogue/src/com/ganatan/cinema/catalogue/Catalogue.java
jar cf film-catalogue/dist/film-catalogue.jar -C .out/catalogue .
javac -source 8 -target 8 -cp film-model/dist/film-model.jar -d .out/format film-format/src/com/ganatan/cinema/format/FormatFilm.java
jar cf film-format/dist/film-format.jar -C .out/format .
echo "3 bibliotheques compilees."
