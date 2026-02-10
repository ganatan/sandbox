@echo off
setlocal enabledelayedexpansion

set MODE=%1
if "%MODE%"=="" set MODE=kraft

set ROOT=%~dp0..\..
set PROJECT=ganatan-kafka

set KAFKA_KRAFT=%ROOT%\infra\kafka\compose.kraft.yml
set KAFKA_ZK=%ROOT%\infra\kafka\compose.zookeeper.yml

echo ===============================================
echo Kafka start - mode=%MODE%
echo Project=%PROJECT%
echo ===============================================

if /I "%MODE%"=="kraft" (
  docker compose -p "%PROJECT%" -f "%KAFKA_KRAFT%" up -d
  goto :done
)

if /I "%MODE%"=="zookeeper" (
  docker compose -p "%PROJECT%" -f "%KAFKA_ZK%" up -d
  goto :done
)

echo Mode invalide: %MODE%
echo Modes supportes: kraft ^| zookeeper
exit /b 1

:done
echo.
echo ===============================================
echo Kafka UI : http://localhost:8085
echo Broker   : localhost:9092
if /I "%MODE%"=="zookeeper" echo Zookeeper: localhost:2181
echo ===============================================
exit /b 0
