# syntax=docker/dockerfile:1
FROM node:18-bullseye AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4526

CMD ["npm", "start"]