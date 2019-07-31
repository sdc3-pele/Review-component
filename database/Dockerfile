FROM node:carbon
WORKDIR /database
COPY package*.json ./
COPY . .
RUN npm install
CMD node seeddb.js