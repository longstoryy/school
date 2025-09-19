# Development stage
FROM node:18-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]
