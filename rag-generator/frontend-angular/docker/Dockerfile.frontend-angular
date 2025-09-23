FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/angular-starter/browser ./

EXPOSE 4000

RUN sed -i 's/listen       80;/listen 4000;/' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
