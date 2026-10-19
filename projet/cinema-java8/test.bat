@echo off
setlocal
cd /d "%~dp0"
if not defined JUNIT_JAR (
    echo Definir JUNIT_JAR avec le chemin de junit-3.8.2.jar
    exit /b 1
)
if not exist "%JUNIT_JAR%" (
    echo JAR JUnit introuvable : %JUNIT_JAR%
    exit /b 1
)
set "CHOIX=%~1"
if "%CHOIX%"=="" set "CHOIX=all"
if /I not "%CHOIX%"=="all" if /I not "%CHOIX%"=="film-model" if /I not "%CHOIX%"=="film-catalogue" if /I not "%CHOIX%"=="film-format" (
    echo Usage : test.bat [all^|film-model^|film-catalogue^|film-format]
    exit /b 1
)
call build.bat || exit /b 1
mkdir .out\tests
set "CP=film-model\dist\film-model.jar;film-catalogue\dist\film-catalogue.jar;film-format\dist\film-format.jar;%JUNIT_JAR%"
if /I "%CHOIX%"=="all" goto all
if /I "%CHOIX%"=="film-model" goto model
if /I "%CHOIX%"=="film-catalogue" goto catalogue
if /I "%CHOIX%"=="film-format" goto format
:all
call :model || exit /b 1
call :catalogue || exit /b 1
call :format || exit /b 1
exit /b 0
:model
javac -source 8 -target 8 -cp "%CP%" -d .out\tests film-model\test\com\ganatan\cinema\model\FilmTest.java || exit /b 1
java -cp ".out\tests;%CP%" junit.textui.TestRunner com.ganatan.cinema.model.FilmTest
exit /b %errorlevel%
:catalogue
javac -source 8 -target 8 -cp "%CP%" -d .out\tests film-catalogue\test\com\ganatan\cinema\catalogue\CatalogueTest.java || exit /b 1
java -cp ".out\tests;%CP%" junit.textui.TestRunner com.ganatan.cinema.catalogue.CatalogueTest
exit /b %errorlevel%
:format
javac -source 8 -target 8 -cp "%CP%" -d .out\tests film-format\test\com\ganatan\cinema\format\FormatFilmTest.java || exit /b 1
java -cp ".out\tests;%CP%" junit.textui.TestRunner com.ganatan.cinema.format.FormatFilmTest
exit /b %errorlevel%
