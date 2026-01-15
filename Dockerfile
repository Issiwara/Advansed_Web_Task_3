# Multi-stage Dockerfile for building and running the Angular SSR application
# Stage 1: build the app (includes devDependencies required for building)
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build
COPY . .

# Build the application (angular.json is configured for SSR)
RUN npm run build


# Stage 2: runtime image with only production dependencies
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy built output from builder stage
COPY --from=builder /app/dist ./dist

# Expose default port used in src/server.ts
EXPOSE 4000

# Start the server (server entry produced by Angular build)
CMD ["node", "dist/my-angular-app/server/server.mjs"]
