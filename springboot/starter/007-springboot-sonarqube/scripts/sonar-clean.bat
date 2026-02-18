@echo off
docker compose -f docker\compose.sonarqube.yml down -v --remove-orphans
