FROM node:lts-alpine3.16 AS build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.4-perl AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]