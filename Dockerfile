FROM node:carbon
WORKDIR /
COPY package*.json ./
COPY . .
RUN git clone https://github.com/vishnubob/wait-for-it.git
RUN npm install
RUN npm run build:prod
EXPOSE 3004
CMD node server/index.js