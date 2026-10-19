#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
rm -rf build dist
mkdir -p build/model build/catalogue build/format build/app dist
javac -source 8 -target 8 -d build/model film-model/src/com/ganatan/cinema/model/Film.java
jar cf dist/film-model.jar -C build/model .
javac -source 8 -target 8 -cp dist/film-model.jar -d build/catalogue film-catalogue/src/com/ganatan/cinema/catalogue/Catalogue.java
jar cf dist/film-catalogue.jar -C build/catalogue .
javac -source 8 -target 8 -cp dist/film-model.jar -d build/format film-format/src/com/ganatan/cinema/format/FormatFilm.java
jar cf dist/film-format.jar -C build/format .
javac -source 8 -target 8 -cp 'dist/*' -d build/app cinema-app/src/com/ganatan/cinema/app/Main.java
jar cfm dist/cinema-app.jar cinema-app/MANIFEST.MF -C build/app .
echo 'Compilation terminee : java -jar dist/cinema-app.jar'
