#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
: "${JUNIT_JAR:?Definir JUNIT_JAR avec le chemin de junit-3.8.2.jar}"
test -f "$JUNIT_JAR" || { echo "JAR JUnit introuvable : $JUNIT_JAR"; exit 1; }
choix="${1:-all}"
case "$choix" in
    all|film-model|film-catalogue|film-format) ;;
    *) echo 'Usage : bash test.sh [all|film-model|film-catalogue|film-format]'; exit 1 ;;
esac
bash build.sh
mkdir -p .out/tests
cp="film-model/dist/film-model.jar:film-catalogue/dist/film-catalogue.jar:film-format/dist/film-format.jar:$JUNIT_JAR"
execute_test() {
    local module="$1" paquet="$2" classe="$3"
    javac -source 8 -target 8 -cp "$cp" -d .out/tests "$module/test/com/ganatan/cinema/$paquet/$classe.java"
    java -cp ".out/tests:$cp" junit.textui.TestRunner "com.ganatan.cinema.$paquet.$classe"
}
case "$choix" in
    all)
        execute_test film-model model FilmTest
        execute_test film-catalogue catalogue CatalogueTest
        execute_test film-format format FormatFilmTest
        ;;
    film-model) execute_test film-model model FilmTest ;;
    film-catalogue) execute_test film-catalogue catalogue CatalogueTest ;;
    film-format) execute_test film-format format FormatFilmTest ;;
esac
