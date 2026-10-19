@echo off
setlocal
cd /d "%~dp0"
if not defined JUNIT_JAR (
    echo Definir JUNIT_JAR avec le chemin de junit-3.8.2.jar
    exit /b 1
)
call build.bat || exit /b 1
mkdir .out\tests
set "CP=film-model\dist\film-model.jar;film-catalogue\dist\film-catalogue.jar;film-format\dist\film-format.jar;cinema-app\dist\cinema-app.jar;%JUNIT_JAR%"
javac -source 8 -target 8 -cp "%CP%" -d .out\tests film-model\test\com\ganatan\cinema\model\FilmTest.java film-catalogue\test\com\ganatan\cinema\catalogue\CatalogueTest.java film-format\test\com\ganatan\cinema\format\FormatFilmTest.java cinema-app\test\com\ganatan\cinema\app\CinemaAppTest.java || exit /b 1
java -cp ".out\tests;%CP%" junit.textui.TestRunner com.ganatan.cinema.model.FilmTest || exit /b 1
java -cp ".out\tests;%CP%" junit.textui.TestRunner com.ganatan.cinema.catalogue.CatalogueTest || exit /b 1
java -cp ".out\tests;%CP%" junit.textui.TestRunner com.ganatan.cinema.format.FormatFilmTest || exit /b 1
java -cp ".out\tests;%CP%" junit.textui.TestRunner com.ganatan.cinema.app.CinemaAppTest || exit /b 1
