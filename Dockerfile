# Use Node.js LTS as base image
FROM node:18-bullseye-slim

# Set working directory inside the container
WORKDIR /app

# Copy list of dependencies
COPY package*.json ./

# Install dependencies according to dependencies list
RUN npm install

# Copy project to WORKDIR
COPY . .

# Install `json-server` globally
RUN npm install -g json-server

# Expose ports for Node.js project and Database
EXPOSE 3000 8080

# Run the application
CMD ["sh" , "-c", "json-server -p 8080 --watch data/db.json & npm start"]