# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies deterministically
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the production assets
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the built assets to the Nginx serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# The default Nginx configuration is fine for standard Vite routing
# If you have complex routing, you might need a custom nginx.conf
CMD ["nginx", "-g", "daemon off;"]
