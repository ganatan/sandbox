@echo off
setlocal
cd /d "%~dp0"
if exist .out rmdir /s /q .out
mkdir .out\model .out\catalogue .out\format
for %%M in (film-model film-catalogue film-format) do (
    if not exist "%%M\dist" mkdir "%%M\dist"
    if exist "%%M\dist\*.jar" del /q "%%M\dist\*.jar"
)
javac -source 8 -target 8 -d .out\model film-model\src\com\ganatan\cinema\model\Film.java || exit /b 1
jar cf film-model\dist\film-model.jar -C .out\model . || exit /b 1
javac -source 8 -target 8 -cp film-model\dist\film-model.jar -d .out\catalogue film-catalogue\src\com\ganatan\cinema\catalogue\Catalogue.java || exit /b 1
jar cf film-catalogue\dist\film-catalogue.jar -C .out\catalogue . || exit /b 1
javac -source 8 -target 8 -cp film-model\dist\film-model.jar -d .out\format film-format\src\com\ganatan\cinema\format\FormatFilm.java || exit /b 1
jar cf film-format\dist\film-format.jar -C .out\format . || exit /b 1
echo 3 bibliotheques compilees.
