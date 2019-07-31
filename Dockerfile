
FROM node:carbon
WORKDIR /reviews
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build:prod
EXPOSE 3004
CMD node database/seeddb.js