FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7000
EXPOSE 7001
CMD ["npm", "run", "devStart"]