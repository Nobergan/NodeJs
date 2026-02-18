# Use official lightweight Node.js 20 image based on Alpine Linux
FROM node:20-alpine

# Specify the author/maintainer of this Docker image
MAINTAINER Some Dev

# Create /app directory inside the container
RUN mkdir /app
# Set /app as the working directory for subsequent commands
WORKDIR /app

# Copy package.json from local backend folder to the root of container's working directory
COPY ./backend/package.json .

# Install all dependencies specified in package.json
RUN npm i