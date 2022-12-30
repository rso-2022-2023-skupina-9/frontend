FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod --base-href /mikrostoritev-za-frontend/

FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html