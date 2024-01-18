
FROM node:latest

WORKDIR /cw-app

COPY package*.json ./

RUN npm install -g pm2

RUN npm i

COPY . .

RUN npm run build

WORKDIR /cw-app/dist/src

CMD ["pm2-runtime", "start", "index.js"]