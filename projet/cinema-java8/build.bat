@echo off
setlocal
cd /d "%~dp0"
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
mkdir build\model build\catalogue build\format build\app dist
javac -source 8 -target 8 -d build\model film-model\src\com\ganatan\cinema\model\Film.java || exit /b 1
jar cf dist\film-model.jar -C build\model . || exit /b 1
javac -source 8 -target 8 -cp dist\film-model.jar -d build\catalogue film-catalogue\src\com\ganatan\cinema\catalogue\Catalogue.java || exit /b 1
jar cf dist\film-catalogue.jar -C build\catalogue . || exit /b 1
javac -source 8 -target 8 -cp dist\film-model.jar -d build\format film-format\src\com\ganatan\cinema\format\FormatFilm.java || exit /b 1
jar cf dist\film-format.jar -C build\format . || exit /b 1
javac -source 8 -target 8 -cp "dist/*" -d build\app cinema-app\src\com\ganatan\cinema\app\Main.java || exit /b 1
jar cfm dist\cinema-app.jar cinema-app\MANIFEST.MF -C build\app . || exit /b 1
echo Compilation terminee : java -jar dist\cinema-app.jar
