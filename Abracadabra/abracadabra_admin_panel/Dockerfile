FROM node:latest
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# COPY package.json .
# COPY app.js .
COPY . /usr/src/app

RUN npm install
RUN npm run build
EXPOSE 3001
ENTRYPOINT ["npm", "start"]