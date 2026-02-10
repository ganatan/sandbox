@echo off
setlocal

set ROOT=%~dp0..\..
set PROJECT=ganatan-kafka

set KAFKA_KRAFT=%ROOT%\infra\kafka\compose.kraft.yml
set KAFKA_ZK=%ROOT%\infra\kafka\compose.zookeeper.yml

echo ===============================================
echo Cleaning Kafka (project=%PROJECT%)
echo ===============================================

docker compose -p "%PROJECT%" -f "%KAFKA_KRAFT%" down --volumes --remove-orphans 2>nul
docker compose -p "%PROJECT%" -f "%KAFKA_ZK%" down --volumes --remove-orphans 2>nul

for /f %%v in ('docker volume ls -q --filter "label=com.docker.compose.project=%PROJECT%"') do docker volume rm -f %%v >nul 2>nul

echo.
echo ===============================================
echo Kafka cleanup complete
echo ===============================================

endlocal
