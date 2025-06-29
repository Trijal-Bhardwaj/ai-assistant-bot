const Redis = require("redis");
const logger = require("../config/logger");

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  }

  async connect() {
    try {
      logger.info("🔌 Connecting to Redis...");

      this.client = Redis.createClient({
        url: this.redisUrl,
        socket: {
          connectTimeout: 10000,
          lazyConnect: true,
          reconnectStrategy: (retries) => {
            if (retries > 10) {
              logger.error("❌ Redis max retry attempts reached");
              return false;
            }
            return Math.min(retries * 100, 3000);
          },
        },
      });

      this.client.on("error", (error) => {
        logger.error(`❌ Redis error: ${error.message}`);
        this.isConnected = false;
      });

      this.client.on("connect", () => {
        logger.success("✅ Redis connected successfully");
        this.isConnected = true;
      });

      this.client.on("ready", () => {
        logger.info("✅ Redis ready");
        this.isConnected = true;
      });

      this.client.on("end", () => {
        logger.warning("⚠️ Redis connection ended");
        this.isConnected = false;
      });

      await this.client.connect();
      return true;
    } catch (error) {
      logger.error(`❌ Failed to connect to Redis: ${error.message}`);
      this.isConnected = false;
      return false;
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.quit();
        this.isConnected = false;
        logger.info("🔌 Redis disconnected");
      }
    } catch (error) {
      logger.error(`❌ Error disconnecting from Redis: ${error.message}`);
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      if (!this.isConnected) return false;

      const serializedValue =
        typeof value === "object" ? JSON.stringify(value) : value;
      await this.client.setEx(key, ttl, serializedValue);
      logger.debug(`💾 Cached: ${key}`);
      return true;
    } catch (error) {
      logger.error(`❌ Cache set error: ${error.message}`);
      return false;
    }
  }

  async get(key) {
    try {
      if (!this.isConnected) return null;

      const value = await this.client.get(key);
      if (!value) return null;

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      logger.error(`❌ Cache get error: ${error.message}`);
      return null;
    }
  }

  async delete(key) {
    try {
      if (!this.isConnected) return false;

      await this.client.del(key);
      logger.debug(`🗑️ Deleted cache: ${key}`);
      return true;
    } catch (error) {
      logger.error(`❌ Cache delete error: ${error.message}`);
      return false;
    }
  }

  async exists(key) {
    try {
      if (!this.isConnected) return false;

      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`❌ Cache exists error: ${error.message}`);
      return false;
    }
  }

  async increment(key, value = 1) {
    try {
      if (!this.isConnected) return false;

      const result = await this.client.incrBy(key, value);
      return result;
    } catch (error) {
      logger.error(`❌ Cache increment error: ${error.message}`);
      return false;
    }
  }

  async setUserData(phoneNumber, data) {
    const key = `user:${phoneNumber}`;
    return await this.set(key, data, 86400); // 24 hours
  }

  async getUserData(phoneNumber) {
    const key = `user:${phoneNumber}`;
    return await this.get(key);
  }

  async setMessageHistory(phoneNumber, messages) {
    const key = `messages:${phoneNumber}`;
    return await this.set(key, messages, 3600); // 1 hour
  }

  async getMessageHistory(phoneNumber) {
    const key = `messages:${phoneNumber}`;
    return (await this.get(key)) || [];
  }

  async addMessageToHistory(phoneNumber, message) {
    const history = await this.getMessageHistory(phoneNumber);
    history.push({
      ...message,
      timestamp: Date.now(),
    });

    // Keep only last 50 messages
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }

    return await this.setMessageHistory(phoneNumber, history);
  }

  async setAICache(activity, message) {
    const key = `ai:${activity}:${Date.now()}`;
    return await this.set(key, message, 1800); // 30 minutes
  }

  async getAICache(activity) {
    const pattern = `ai:${activity}:*`;
    try {
      if (!this.isConnected) return null;

      const keys = await this.client.keys(pattern);
      if (keys.length === 0) return null;

      // Get the most recent cache
      const latestKey = keys.sort().pop();
      return await this.get(latestKey);
    } catch (error) {
      logger.error(`❌ AI cache get error: ${error.message}`);
      return null;
    }
  }

  async getStats() {
    try {
      if (!this.isConnected) return null;

      const info = await this.client.info();
      const keys = await this.client.dbSize();

      return {
        connected: this.isConnected,
        keys: keys,
        info: info,
      };
    } catch (error) {
      logger.error(`❌ Cache stats error: ${error.message}`);
      return null;
    }
  }

  isAvailable() {
    return this.isConnected;
  }
}

module.exports = new CacheService();
