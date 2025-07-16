@echo off
IF "%1"=="build" (
  docker build -t backend-springboot-21 .
) ELSE IF "%1"=="run" (
  docker rm -f backend-springboot-21-container
  docker run -d --name backend-springboot-21-container -p 8080:8080 backend-springboot-21
) ELSE IF "%1"=="stop" (
  docker stop backend-springboot-21-container
) ELSE IF "%1"=="logs" (
  docker logs backend-springboot-21-container
) ELSE (
  echo Usage: docker-backend-springboot-21.bat [build|run|stop|logs]
)