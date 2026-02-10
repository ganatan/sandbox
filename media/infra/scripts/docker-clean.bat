@echo off
echo Cleaning Docker...

for /f %%i in ('docker ps -aq') do docker rm -f %%i
for /f %%i in ('docker images -aq') do docker rmi -f %%i
for /f %%i in ('docker volume ls -q') do docker volume rm %%i

docker network prune -f
docker system prune -a -f

echo Done.
pause
