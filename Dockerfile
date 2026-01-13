FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.25-alpine

COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html
COPY --chown=nginx:nginx docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --chmod=755 docker/entrypoint-env.sh /docker-entrypoint.d/99-env.sh

EXPOSE 8080
