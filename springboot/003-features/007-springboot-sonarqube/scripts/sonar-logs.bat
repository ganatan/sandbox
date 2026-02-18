@echo off
docker compose -f docker\compose.sonarqube.yml logs -f --tail=200 sonarqube
pause