docker login ghcr.io -u ThinhNCHE153157 -p $TAS_FE_TOKEN
docker stop TAS_FE || true  
docker rm TAS_FE || true  
docker rmi ghcr.io/ThinhNCHE153157/TAS_FE:latest || true 
docker run -d --name TAS_FE --network main-proxy_default --restart on-failure:5 -p 3036:80 ghcr.io/ThinhNCHE153157/TAS_FE:latest