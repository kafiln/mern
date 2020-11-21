FROM node:13.12.0-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE $APP_PORT

CMD ["npm","run","dev"]