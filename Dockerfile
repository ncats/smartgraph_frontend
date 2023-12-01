# Stage 1: Build the Angular application
FROM node:20.4 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the Angular CLI and application's npm dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the application's files
COPY . .

# Build the application
RUN ng build --configuration=production --base-href /ui/

# Stage 2: Setup NGINX
FROM nginx:alpine

# Copy the custom NGINX configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy the build output from Stage 1 to the NGINX html directory
COPY --from=build /app/dist /usr/share/nginx/app
RUN chmod og+r -R /usr/share/nginx/app

# Copy the entrypoint script
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80 & 4200
EXPOSE 80
EXPOSE 4200

# Use the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
