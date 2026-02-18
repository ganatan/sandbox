@echo off
docker compose -f docker\compose.elk.yml logs -f --tail=200 kibana