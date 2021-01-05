FROM node:12.20
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# COPY package.json .
# COPY app.js .
COPY . /usr/src/app

RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
