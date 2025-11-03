# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /portfolio

# copy package json file
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]