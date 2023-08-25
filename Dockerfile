# Stage 1: Build the Angular application
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Set default build environment
ARG ENV=production

# Install the Angular CLI and application's npm dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the application's files
COPY . .

# Build the application
RUN ng build --configuration=$ENV

# Stage 2: Setup NGINX
FROM nginx:alpine

# Copy the custom NGINX configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy the build output from Stage 1 to the NGINX html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
