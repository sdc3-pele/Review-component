FROM node:carbon
WORKDIR /database
COPY package*.json ./
COPY . .
RUN git clone https://github.com/vishnubob/wait-for-it.git
RUN ["chmod", "+x", "wait-for-it/wait-for-it.sh"]
RUN npm install
CMD node seeddb.js