FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
EXPOSE 8001
CMD ["npm", "run", "devStart"]