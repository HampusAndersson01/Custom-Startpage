FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.25-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/entrypoint-env.sh /docker-entrypoint.d/99-env.sh

RUN chmod +x /docker-entrypoint.d/99-env.sh \
  && chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080
