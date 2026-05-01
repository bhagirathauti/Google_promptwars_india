# Use Node.js LTS as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json files first for better caching
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for both client and server
RUN cd client && npm install
RUN cd server && npm install

# Copy all the source code
COPY shared ./shared
COPY client ./client
COPY server ./server

# Build the Vite React frontend
RUN cd client && npm run build

# Expose the port Cloud Run expects (8080 by default)
EXPOSE 8080

# Set environment variable to run on 8080
ENV PORT=8080

# Start the Node.js Express server
CMD ["node", "server/index.js"]
