
FROM node:latest

WORKDIR /nayar-app

COPY package*.json ./

RUN npm install -g pm2

RUN npm i

COPY . .

RUN npm run build

WORKDIR /nayar-app/dist/src

CMD ["pm2-runtime", "start", "index.js"]