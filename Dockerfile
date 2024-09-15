# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the server code and dependencies
COPY ./package*.json ./

# Navigate to the 'server' directory and install the server dependencies
RUN npm install

# Copy the rest code
COPY . .

# Copy the built frontend
COPY dist/ ./dist

# Command to start the server
CMD ["node", "index.js"]
