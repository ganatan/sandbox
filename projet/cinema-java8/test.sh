#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
: "${JUNIT_JAR:?Definir JUNIT_JAR avec le chemin de junit-3.8.2.jar}"
bash build.sh
mkdir -p .out/tests
CP="film-model/dist/film-model.jar:film-catalogue/dist/film-catalogue.jar:film-format/dist/film-format.jar:cinema-app/dist/cinema-app.jar:$JUNIT_JAR"
javac -source 8 -target 8 -cp "$CP" -d .out/tests \
    film-model/test/com/ganatan/cinema/model/FilmTest.java \
    film-catalogue/test/com/ganatan/cinema/catalogue/CatalogueTest.java \
    film-format/test/com/ganatan/cinema/format/FormatFilmTest.java \
    cinema-app/test/com/ganatan/cinema/app/CinemaAppTest.java
for classe in com.ganatan.cinema.model.FilmTest com.ganatan.cinema.catalogue.CatalogueTest com.ganatan.cinema.format.FormatFilmTest com.ganatan.cinema.app.CinemaAppTest; do
    java -cp ".out/tests:$CP" junit.textui.TestRunner "$classe"
done
