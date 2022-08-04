FROM node:16.7.0 as build

LABEL version="1.0"
LABEL description="This is the base docker image for the Venus application frontend"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

RUN npm run build

FROM nginx:1.23.1-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
