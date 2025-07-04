# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for Puppeteer (WhatsApp Web)
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  && rm -rf /var/cache/apk/*

# Set Puppeteer environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package files first for better caching
COPY package*.json ./

# Copy .npmrc if it exists (for npm configuration)
COPY .npmrc* ./

# Configure npm with token authentication and install dependencies
ARG NPM_TOKEN
RUN if [ -n "$NPM_TOKEN" ]; then \
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc; \
  fi && \
  npm config set registry https://registry.npmjs.org/ && \
  npm install -g npm@9.x && \
  npm install --only=production --no-audit --no-fund && \
  npm cache clean --force && \
  if [ -n "$NPM_TOKEN" ]; then \
  rm -f .npmrc; \
  fi

# Copy application code
COPY . .

# Create directories for WhatsApp sessions and voice messages
RUN mkdir -p whatsapp-sessions voice_messages

# Set proper permissions
RUN chown -R node:node /app
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "console.log('Health check passed')" || exit 1

# Start the application
CMD ["npm", "start"] 