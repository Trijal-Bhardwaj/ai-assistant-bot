const mongoose = require("mongoose");
const logger = require("./logger");

class Database {
  constructor() {
    this.isConnected = false;
    this.connectionString =
      process.env.MONGODB_URI ||
      "mongodb+srv://trijalbhardwaj14:O4eayFa3wiNq19QS@project-whatsapp-chatbo.izeqvux.mongodb.net/?retryWrites=true&w=majority&appName=Project-WhatsApp-ChatBot-Cluster";
  }

  async connect() {
    try {
      logger.info("🔌 Connecting to MongoDB...");

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
      };

      await mongoose.connect(this.connectionString, options);

      this.isConnected = true;
      logger.success("✅ MongoDB connected successfully");

      // Handle connection events
      mongoose.connection.on("error", (error) => {
        logger.error(`❌ MongoDB connection error: ${error.message}`);
        this.isConnected = false;
      });

      mongoose.connection.on("disconnected", () => {
        logger.warning("⚠️ MongoDB disconnected");
        this.isConnected = false;
      });

      mongoose.connection.on("reconnected", () => {
        logger.success("✅ MongoDB reconnected");
        this.isConnected = true;
      });

      return true;
    } catch (error) {
      logger.error(`❌ Failed to connect to MongoDB: ${error.message}`);
      this.isConnected = false;
      return false;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info("🔌 MongoDB disconnected");
    } catch (error) {
      logger.error(`❌ Error disconnecting from MongoDB: ${error.message}`);
    }
  }

  getStatus() {
    return {
      connected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    };
  }
}

module.exports = new Database();
