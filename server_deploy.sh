docker login ghcr.io -u thinhnche153157 -p $TAS_FE_TOKEN
docker stop tas_project_fe || true  
docker rm tas_project_fe || true  
docker rmi ghcr.io/thinhnche153157/tas_project_fe:latest || true 
docker run -d --name tas_project_fe --restart on-failure:5 -p 3036:80 ghcr.io/thinhnche153157/tas_project_fe:latest
