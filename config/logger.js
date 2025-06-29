const winston = require("winston");
const path = require("path");

// Create logs directory if it doesn't exist
const fs = require("fs-extra");
fs.ensureDirSync("./logs");

// Custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} ${level}: ${message}\n${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
  })
);

// Custom format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: fileFormat,
  defaultMeta: { service: "ai-assistant" },
  transports: [
    // Error logs
    new winston.transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Combined logs
    new winston.transports.File({
      filename: path.join("logs", "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Add console transport for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

// Create a simple logger interface for compatibility
const simpleLogger = {
  info: (message) => {
    logger.info(message);
    if (process.env.NODE_ENV === "production") {
      console.log(`[${new Date().toISOString()}] ℹ️ ${message}`);
    }
  },
  success: (message) => {
    logger.info(`✅ ${message}`);
    if (process.env.NODE_ENV === "production") {
      console.log(`[${new Date().toISOString()}] ✅ ${message}`);
    }
  },
  warning: (message) => {
    logger.warn(`⚠️ ${message}`);
    if (process.env.NODE_ENV === "production") {
      console.log(`[${new Date().toISOString()}] ⚠️ ${message}`);
    }
  },
  error: (message) => {
    logger.error(`❌ ${message}`);
    if (process.env.NODE_ENV === "production") {
      console.log(`[${new Date().toISOString()}] ❌ ${message}`);
    }
  },
  debug: (message) => {
    if (process.env.DEBUG_MODE === "true") {
      logger.debug(`🔍 ${message}`);
      if (process.env.NODE_ENV === "production") {
        console.log(`[${new Date().toISOString()}] 🔍 ${message}`);
      }
    }
  },
};

module.exports = simpleLogger;
