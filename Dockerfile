FROM node:20.11.1-alpine3.19

# Update and upgrade packages to reduce vulnerabilities
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install --production
# Copy the rest of the application code to the container
COPY . .
# Expose the port the app runs on
EXPOSE 5001
# Build the application
RUN npm run build
# Start the application
CMD ["npm", "start"]