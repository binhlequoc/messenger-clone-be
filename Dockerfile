FROM node:18

WORKDIR /app

COPY --chown=app:app . .

COPY package*.json ./

RUN npm install

COPY . .
