# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the server code and dependencies
COPY ./package*.json ./

# Install the server dependencies
RUN npm install

# Copy the built frontend
COPY dist/ ./dist

# Set the working directory for the server
WORKDIR /app

# Command to start the server
CMD ["node", "index.js"]
