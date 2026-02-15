@echo off
docker build -t media-api -f ./docker/Dockerfile.backend-springboot ..
pause
