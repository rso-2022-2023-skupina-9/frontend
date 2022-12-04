FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN ng build --prod

FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html