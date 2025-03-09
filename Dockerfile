FROM node:23.7.0-alpine3.20
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
CMD ["node","app.js"]