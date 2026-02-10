@echo off
setlocal

set ROOT=%~dp0..\..
set KAFKA_KRAFT=%ROOT%\infra\kafka\compose.kraft.yml
set KAFKA_ZK=%ROOT%\infra\kafka\compose.zookeeper.yml

echo ===============================================
echo Stopping Kafka containers
echo ===============================================

docker compose -f "%KAFKA_KRAFT%" down 2>nul
docker compose -f "%KAFKA_ZK%" down 2>nul

echo.
echo ===============================================
echo Kafka stopped
echo ===============================================

endlocal
