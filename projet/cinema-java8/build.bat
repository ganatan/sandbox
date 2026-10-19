@echo off
setlocal
cd /d "%~dp0"
if exist .out rmdir /s /q .out
mkdir .out\model .out\catalogue .out\format .out\app
for %%M in (film-model film-catalogue film-format cinema-app) do (
    if not exist "%%M\dist" mkdir "%%M\dist"
    del /q "%%M\dist\*.jar" 2>nul
)
javac -source 8 -target 8 -d .out\model film-model\src\com\ganatan\cinema\model\Film.java || exit /b 1
jar cf film-model\dist\film-model.jar -C .out\model . || exit /b 1
javac -source 8 -target 8 -cp film-model\dist\film-model.jar -d .out\catalogue film-catalogue\src\com\ganatan\cinema\catalogue\Catalogue.java || exit /b 1
jar cf film-catalogue\dist\film-catalogue.jar -C .out\catalogue . || exit /b 1
javac -source 8 -target 8 -cp film-model\dist\film-model.jar -d .out\format film-format\src\com\ganatan\cinema\format\FormatFilm.java || exit /b 1
jar cf film-format\dist\film-format.jar -C .out\format . || exit /b 1
set "CP=film-model\dist\film-model.jar;film-catalogue\dist\film-catalogue.jar;film-format\dist\film-format.jar"
javac -source 8 -target 8 -cp "%CP%" -d .out\app cinema-app\src\com\ganatan\cinema\app\Main.java || exit /b 1
jar cfm cinema-app\dist\cinema-app.jar cinema-app\MANIFEST.MF -C .out\app . || exit /b 1
echo java -jar cinema-app\dist\cinema-app.jar
