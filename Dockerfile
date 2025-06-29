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

# Remove any .npmrc and force public registry to avoid authentication issues
RUN rm -f .npmrc && \
  npm config set registry https://registry.npmjs.org/ && \
  npm install -g npm@9.x && \
  npm install --only=production --no-audit --no-fund --registry=https://registry.npmjs.org/ && \
  npm cache clean --force

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