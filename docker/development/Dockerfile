# Using Lightweight docker image for node
FROM node:20-alpine as base

# Setting Up Working Directory
WORKDIR /usr/src/backend-app

# Copying Package Files
COPY package*.json ./

# Installing Dependencies
RUN npm Ci

# Copying Files
COPY . .

# Exposing Port
EXPOSE 3000

# Start Application
CMD [ "npm","run","dev" ]