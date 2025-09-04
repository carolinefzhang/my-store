FROM node:iron-alpine3.22

# Update and upgrade packages to reduce vulnerabilities
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install --production
# Copy the rest of the application code to the container
COPY . .

# Accept build arguments for frontend environment variables
ARG VITE_AUTH0_AUDIENCE
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_REDIRECT_URI

# Set environment variables for the build process
ENV VITE_AUTH0_AUDIENCE=$VITE_AUTH0_AUDIENCE
ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
ENV VITE_AUTH0_REDIRECT_URI=$VITE_AUTH0_REDIRECT_URI

# Expose the port the app runs on
EXPOSE 5001
# Build the application
RUN npm run build
# Start the application
CMD ["npm", "start"]