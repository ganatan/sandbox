#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
: "${JUNIT_JAR:?Definir JUNIT_JAR avec le chemin du JAR JUnit 3.8.2}"
bash build.sh
mkdir -p build/tests
javac -source 8 -target 8 -cp "dist/*:$JUNIT_JAR" -d build/tests $(find film-model/test film-catalogue/test film-format/test cinema-app/test -name '*.java')
java -cp "build/tests:dist/*:$JUNIT_JAR" junit.textui.TestRunner com.ganatan.cinema.model.FilmTest
java -cp "build/tests:dist/*:$JUNIT_JAR" junit.textui.TestRunner com.ganatan.cinema.catalogue.CatalogueTest
java -cp "build/tests:dist/*:$JUNIT_JAR" junit.textui.TestRunner com.ganatan.cinema.format.FormatFilmTest
java -cp "build/tests:dist/*:$JUNIT_JAR" junit.textui.TestRunner com.ganatan.cinema.app.CinemaAppTest
