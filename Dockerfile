# Stage 1: Build an Angular Docker Image
FROM node as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY src /app/src
COPY angular.json tsconfig* ngsw-config.json package.json /app/
ARG configuration=production
RUN npm run build -- --outputPath=./dist/out --configuration $configuration

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY ./Infrastructure/nginx-custom.conf /etc/nginx/conf.d/default.conf