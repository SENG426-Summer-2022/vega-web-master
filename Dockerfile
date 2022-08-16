FROM node:16.7.0

LABEL version="1.0"
LABEL description="This is the base docker image for the Venus application frontend"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install -g serve
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
