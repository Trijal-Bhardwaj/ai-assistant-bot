const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const cron = require("node-cron");
const moment = require("moment-timezone");
const fs = require("fs-extra");
const path = require("path");

// Import services
const logger = require("./config/logger");
const database = require("./config/database");
const aiService = require("./services/aiService");
const cacheService = require("./services/cacheService");

// Import models
const User = require("./models/User");
const Message = require("./models/Message");

// Import message templates
const { messageTemplates, responseMessages } = require("./messageTemplates");

// Load timetable data
const timetableData = require("./timetable.json");

// Configuration
const SOURCE_NUMBER = process.env.SOURCE_NUMBER || "917742440642"; // Bot's number (WhatsApp Business/secondary)
const TARGET_NUMBER = process.env.TARGET_NUMBER || "919899998761"; // Your personal number
const ALLOWED_NUMBERS = [TARGET_NUMBER]; // Only your number can send messages to bot
const TIMEZONE = process.env.TIMEZONE || "Asia/Kolkata";
const VOICE_MESSAGES_ENABLED =
  process.env.VOICE_MESSAGES_ENABLED === "true" || false;
const DEBUG_MODE = process.env.DEBUG_MODE === "true" || false;
const MIN_MESSAGE_INTERVAL = parseInt(process.env.MIN_MESSAGE_INTERVAL) || 5;
const SELF_CHAT = process.env.SELF_CHAT === "true" || false;
const BOT_NAME = process.env.BOT_NAME || "Sarah";
const BOT_STATUS = process.env.BOT_STATUS || "Always here for you 💕";
const BOT_ABOUT = process.env.BOT_ABOUT || "Your personal AI assistant";

class WhatsAppBot {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.startTime = Date.now();
    this.scheduledJobs = new Map();
    this.messageHistory = [];
    this.userData = null;
    this.lastBotMessageTime = 0; // Track when bot sends messages
    this.stats = {
      messagesSent: 0,
      messagesReceived: 0,
      unauthorizedAttempts: 0,
      errors: 0,
    };
  }

  // Enhanced security validation
  isAuthorizedNumber(phoneNumber) {
    const cleanNumber = phoneNumber.replace("@c.us", "");
    const isAllowed = ALLOWED_NUMBERS.includes(cleanNumber);

    if (!isAllowed) {
      this.stats.unauthorizedAttempts++;
      logger.warning(`Unauthorized access attempt from: ${cleanNumber}`);
    }

    return isAllowed;
  }

  // Enhanced message validation
  validateMessage(message) {
    if (!message || !message.body) {
      logger.warning("Received empty or invalid message");
      return false;
    }

    if (message.body.length > 1000) {
      logger.warning("Message too long, ignoring");
      return false;
    }

    return true;
  }

  async initializeServices() {
    logger.info("🔧 Initializing services...");

    // Initialize database
    const dbConnected = await database.connect();
    if (dbConnected) {
      logger.success("✅ Database initialized");
    } else {
      logger.warning(
        "⚠️ Database not available, continuing without persistence"
      );
    }

    // Initialize cache
    const cacheConnected = await cacheService.connect();
    if (cacheConnected) {
      logger.success("✅ Cache initialized");
    } else {
      logger.warning("⚠️ Cache not available, continuing without caching");
    }

    // Load or create user data
    await this.loadUserData();
  }

  async loadUserData() {
    try {
      // Try to get from cache first
      if (cacheService.isAvailable()) {
        this.userData = await cacheService.getUserData(TARGET_NUMBER);
      }

      // If not in cache, try database
      if (!this.userData && database.isConnected) {
        this.userData = await User.findOne({ phoneNumber: TARGET_NUMBER });

        if (this.userData) {
          // Cache the user data
          if (cacheService.isAvailable()) {
            await cacheService.setUserData(TARGET_NUMBER, this.userData);
          }
        }
      }

      // Create default user data if none exists
      if (!this.userData) {
        this.userData = new User({
          phoneNumber: TARGET_NUMBER,
          name: BOT_NAME,
          preferences: {
            language: "mixed",
            messageStyle: "romantic",
            voiceEnabled: VOICE_MESSAGES_ENABLED,
            timezone: TIMEZONE,
          },
        });

        if (database.isConnected) {
          await this.userData.save();
        }

        if (cacheService.isAvailable()) {
          await cacheService.setUserData(TARGET_NUMBER, this.userData);
        }
      }

      logger.success(`✅ User data loaded for ${this.userData.name}`);
    } catch (error) {
      logger.error(`❌ Error loading user data: ${error.message}`);
      this.userData = null;
    }
  }

  async initialize() {
    try {
      logger.info("🚀 Initializing WhatsApp Bot...");
      logger.info(`🤖 Source number (Bot): ${SOURCE_NUMBER}`);
      logger.info(`👤 Target number (You): ${TARGET_NUMBER}`);
      logger.info(`🔒 Allowed numbers: ${ALLOWED_NUMBERS.join(", ")}`);
      logger.info(
        `💬 Chat mode: ${
          SELF_CHAT ? "Self-chat (both right)" : "Dual-number (left/right)"
        }`
      );

      // Initialize services first
      await this.initializeServices();

      // Create auth directory if it doesn't exist
      await fs.ensureDir("./whatsapp-sessions");

      this.client = new Client({
        authStrategy: new LocalAuth({
          clientId: "ai-assistant",
        }),
        puppeteer: {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--single-process",
            "--disable-gpu",
          ],
        },
      });

      // Handle QR code generation
      this.client.on("qr", (qr) => {
        logger.info(
          `📱 Scan this QR code with the BOT number (${SOURCE_NUMBER}):`
        );
        qrcode.generate(qr, { small: true });
      });

      // Handle ready event
      this.client.on("ready", async () => {
        logger.success("✅ WhatsApp Bot connected successfully!");
        this.isConnected = true;

        // Set bot profile information
        await this.setBotProfile();

        await this.setupScheduler();
        this.logSystemStatus();

        // Update global bot status for monitoring
        global.botStatus = {
          connected: this.isConnected,
          messagesSent: this.stats.messagesSent,
          messagesReceived: this.stats.messagesReceived,
          unauthorizedAttempts: this.stats.unauthorizedAttempts,
          errors: this.stats.errors,
          uptime: Date.now() - this.startTime,
        };
      });

      // Handle authentication failure
      this.client.on("auth_failure", (msg) => {
        logger.error(`❌ Authentication failed: ${msg}`);
        this.stats.errors++;
      });

      // Handle disconnection
      this.client.on("disconnected", (reason) => {
        logger.warning(`❌ WhatsApp Bot disconnected: ${reason}`);
        this.isConnected = false;
      });

      // Handle incoming messages with enhanced security
      this.client.on("message", async (message) => {
        await this.handleIncomingMessage(message);
      });

      // Initialize the client
      await this.client.initialize();
    } catch (error) {
      logger.error(`❌ Error initializing bot: ${error.message}`);
      this.stats.errors++;
      setTimeout(() => this.initialize(), 5000);
    }
  }

  async setBotProfile() {
    try {
      // Set bot's display name
      await this.client.setProfileName(BOT_NAME);
      logger.success(`✅ Bot name set to: ${BOT_NAME}`);

      // Set bot's status
      await this.client.setProfileStatus(BOT_STATUS);
      logger.success(`✅ Bot status set to: ${BOT_STATUS}`);

      // Set bot's about info
      await this.client.setProfileAbout(BOT_ABOUT);
      logger.success(`✅ Bot about set to: ${BOT_ABOUT}`);
    } catch (error) {
      logger.warning(`⚠️ Could not set bot profile: ${error.message}`);
    }
  }

  async setupScheduler() {
    logger.info("⏰ Setting up message scheduler...");

    // Clear existing jobs
    this.scheduledJobs.forEach((job) => job.stop());
    this.scheduledJobs.clear();

    const today = moment().tz(TIMEZONE).format("dddd");
    let scheduleType = "weekend";

    if (timetableData.wfo.days.includes(today)) {
      scheduleType = "wfo";
    } else if (timetableData.wfh.days.includes(today)) {
      scheduleType = "wfh";
    }

    const schedule = timetableData[scheduleType].schedule;

    schedule.forEach((item) => {
      const { time, activity } = item;
      const [hour, minute] = time.split(":");

      // Create cron expression (minute hour * * *)
      const cronExpression = `${minute} ${hour} * * *`;

      const job = cron.schedule(
        cronExpression,
        async () => {
          await this.sendScheduledMessage(activity);
        },
        {
          scheduled: true,
          timezone: TIMEZONE,
        }
      );

      this.scheduledJobs.set(activity, job);
      logger.success(`✅ Scheduled: ${activity} at ${time}`);
    });

    logger.success(`📅 Scheduler setup complete for ${scheduleType} schedule`);
  }

  async sendScheduledMessage(activity) {
    if (!this.isConnected) {
      logger.warning("❌ Bot not connected, skipping message");
      return;
    }

    try {
      let message = null;

      // Try AI-generated message first
      if (aiService.isAvailable()) {
        const userContext = {
          name: this.userData?.name || BOT_NAME,
          preferences: this.userData?.preferences || {},
          lastMessages: await this.getRecentMessages(),
        };

        message = await aiService.generateDynamicMessage(activity, userContext);

        if (message) {
          // Cache the AI message
          if (cacheService.isAvailable()) {
            await cacheService.setAICache(activity, message);
          }
        }
      }

      // Fallback to template messages
      if (!message) {
        const messages = messageTemplates[activity];
        if (!messages) {
          logger.warning(`⚠️ No messages found for activity: ${activity}`);
          return;
        }

        // Select random message variation
        const randomIndex = Math.floor(Math.random() * messages.length);
        message = messages[randomIndex];
      }

      // Check if we sent a message recently for this activity
      const now = Date.now();
      const lastSent = this.lastBotMessageTime || 0;
      const timeDiff = now - lastSent;

      // Don't send if we sent a message for this activity in the last 5 minutes
      if (timeDiff < MIN_MESSAGE_INTERVAL * 60 * 1000) {
        logger.info(`⏰ Skipping ${activity} - sent recently`);
        return;
      }

      await this.sendMessage(message);
      this.lastBotMessageTime = now;
      this.stats.messagesSent++;

      // Save message to database
      await this.saveMessage({
        type: "scheduled",
        content: message,
        activity: activity,
      });

      // Log message history
      this.messageHistory.push({
        timestamp: now,
        type: "scheduled",
        activity: activity,
        message: message.substring(0, 50) + "...",
      });

      // Keep only last 100 messages in history
      if (this.messageHistory.length > 100) {
        this.messageHistory = this.messageHistory.slice(-100);
      }

      logger.success(
        `✅ Sent message for ${activity}: ${message.substring(0, 50)}...`
      );

      // Send voice message if enabled
      if (VOICE_MESSAGES_ENABLED) {
        await this.sendVoiceMessage(message);
      }
    } catch (error) {
      logger.error(
        `❌ Error sending scheduled message for ${activity}: ${error.message}`
      );
      this.stats.errors++;
    }
  }

  async sendMessage(text) {
    try {
      const chatId = `${TARGET_NUMBER}@c.us`;
      await this.client.sendMessage(chatId, text);
      logger.debug(`Message sent from ${SOURCE_NUMBER} to ${TARGET_NUMBER}`);
    } catch (error) {
      logger.error(`❌ Error sending message: ${error.message}`);
      this.stats.errors++;
    }
  }

  async sendVoiceMessage(text) {
    try {
      // This would integrate with a TTS service
      logger.debug(`🎤 Would send voice message: ${text.substring(0, 30)}...`);

      // TODO: Integrate with gTTS or other TTS service
      // const audioBuffer = await generateVoiceMessage(text);
      // const chatId = `${TARGET_NUMBER}@c.us`;
      // await this.client.sendMessage(chatId, new MessageMedia('audio/mp3', audioBuffer));
    } catch (error) {
      logger.error(`❌ Error sending voice message: ${error.message}`);
      this.stats.errors++;
    }
  }

  async handleIncomingMessage(message) {
    try {
      // STEP 1: Determine which mode to use based on configuration
      let shouldProcessMessage = false;
      let mode = "";

      if (SELF_CHAT) {
        // SELF-CHAT MODE: Only process messages from self-chat (same number)
        const isSelfChat = message.from === `${SOURCE_NUMBER}@c.us`;
        if (isSelfChat) {
          mode = "self-chat";
          shouldProcessMessage = true;
        } else {
          return; // Silently ignore other chats
        }
      } else {
        // DUAL-NUMBER MODE: Only process messages from target number
        const isFromTarget = message.from === `${TARGET_NUMBER}@c.us`;
        if (isFromTarget) {
          mode = "dual-number";
          shouldProcessMessage = true;
        } else {
          return; // Silently ignore other chats
        }
      }

      // STEP 2: Security check - only allow configured numbers
      const isAuthorized = this.isAuthorizedNumber(message.from);
      if (!isAuthorized) {
        logger.warning(
          `🚫 Blocked message from unauthorized number: ${message.from}`
        );
        return;
      }

      // STEP 3: Validate message content
      const isValid = this.validateMessage(message);
      if (!isValid) {
        return;
      }

      // STEP 4: Handle self-chat specific logic (bot vs user message detection)
      if (SELF_CHAT) {
        const now = Date.now();
        const timeSinceLastBotMessage = now - this.lastBotMessageTime;

        // If this message came within 3 seconds of the bot's last message, it's likely the bot's own message
        if (timeSinceLastBotMessage < 3000) {
          return; // Silently ignore bot's own message
        }

        // Additional check: if message is from the bot's own number and very recent, ignore it
        if (
          message.from === `${SOURCE_NUMBER}@c.us` &&
          timeSinceLastBotMessage < 5000
        ) {
          return; // Silently ignore recent bot message
        }
      }

      // STEP 5: Process the message
      const text = message.body.toLowerCase().trim();
      logger.info(`📨 Processing ${mode} message: "${text}"`);
      this.stats.messagesReceived++;

      // Save user message to database
      await this.saveMessage({
        type: "user_message",
        content: message.body,
        trigger: text,
      });

      await this.processIncomingMessage(text);
    } catch (error) {
      logger.error(`❌ Error handling incoming message: ${error.message}`);
      this.stats.errors++;
    }
  }

  async processIncomingMessage(text) {
    try {
      logger.info(`🔍 Processing incoming message: "${text}"`);
      let response = null;

      // Try AI-generated response first
      if (aiService.isAvailable()) {
        logger.debug("🤖 Attempting AI-generated response...");
        response = await aiService.generateResponse(text, {
          userData: this.userData,
          recentMessages: await this.getRecentMessages(),
        });
        if (response) {
          logger.info("🤖 AI generated response successfully");
        }
      }

      // Fallback to template responses
      if (!response) {
        logger.debug("📝 Using template responses...");
        // Check for confirmation keywords
        if (
          text.includes("done") ||
          text.includes("complete") ||
          text.includes("finished")
        ) {
          logger.info("✅ Matched 'done' keyword");
          response = this.getRandomResponse("done");
        } else if (text.includes("ok") || text.includes("okay")) {
          logger.info("✅ Matched 'ok' keyword");
          response = this.getRandomResponse("ok");
        } else if (
          text.includes("yes") ||
          text.includes("haan") ||
          text.includes("ha")
        ) {
          logger.info("✅ Matched 'yes' keyword");
          response = this.getRandomResponse("yes");
        } else if (text.includes("completed")) {
          logger.info("✅ Matched 'completed' keyword");
          response = this.getRandomResponse("completed");
        } else {
          logger.info("❌ No keyword matched, no response will be sent");
        }
      }

      if (response) {
        logger.info(`💬 Sending response: "${response}"`);
        await this.sendMessage(response);
        logger.success(`✅ Response sent successfully`);

        // Save response to database
        await this.saveMessage({
          type: "response",
          content: response,
          trigger: text,
        });

        // Log message history
        this.messageHistory.push({
          timestamp: Date.now(),
          type: "response",
          trigger: text,
          message: response.substring(0, 50) + "...",
        });

        // Update user stats
        if (this.userData) {
          this.userData.stats.responsesSent++;
          this.userData.stats.lastInteraction = new Date();
          this.userData.stats.totalInteractions++;

          if (database.isConnected) {
            await this.userData.save();
          }

          if (cacheService.isAvailable()) {
            await cacheService.setUserData(TARGET_NUMBER, this.userData);
          }
        }
      } else {
        logger.info("❌ No response to send");
      }
    } catch (error) {
      logger.error(`❌ Error processing incoming message: ${error.message}`);
      this.stats.errors++;
    }
  }

  async saveMessage(messageData) {
    try {
      const message = new Message({
        phoneNumber: TARGET_NUMBER,
        ...messageData,
      });

      if (database.isConnected) {
        await message.save();
      }

      // Add to cache
      if (cacheService.isAvailable()) {
        await cacheService.addMessageToHistory(TARGET_NUMBER, messageData);
      }
    } catch (error) {
      logger.error(`❌ Error saving message: ${error.message}`);
    }
  }

  async getRecentMessages(limit = 10) {
    try {
      if (cacheService.isAvailable()) {
        const history = await cacheService.getMessageHistory(TARGET_NUMBER);
        return history.slice(-limit);
      }

      if (database.isConnected) {
        const messages = await Message.find({ phoneNumber: TARGET_NUMBER })
          .sort({ timestamp: -1 })
          .limit(limit);
        return messages.reverse();
      }

      return [];
    } catch (error) {
      logger.error(`❌ Error getting recent messages: ${error.message}`);
      return [];
    }
  }

  getRandomResponse(type) {
    const responses = responseMessages[type];
    if (!responses) return null;

    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  logSystemStatus() {
    const uptime = moment.duration(Date.now() - this.startTime);
    logger.info(`📊 System Status:`);
    logger.info(
      `   Uptime: ${uptime.hours()}h ${uptime.minutes()}m ${uptime.seconds()}s`
    );
    logger.info(`   Messages Sent: ${this.stats.messagesSent}`);
    logger.info(`   Messages Received: ${this.stats.messagesReceived}`);
    logger.info(`   Unauthorized Attempts: ${this.stats.unauthorizedAttempts}`);
    logger.info(`   Errors: ${this.stats.errors}`);
    logger.info(`   Connected: ${this.isConnected}`);
    logger.info(
      `   Database: ${database.isConnected ? "Connected" : "Disconnected"}`
    );
    logger.info(
      `   Cache: ${cacheService.isAvailable() ? "Available" : "Unavailable"}`
    );
    logger.info(
      `   AI: ${aiService.isAvailable() ? "Available" : "Unavailable"}`
    );
    logger.info(`   Chat Mode: ${SELF_CHAT ? "Self-chat" : "Dual-number"}`);
  }

  async start() {
    logger.info("🌟 Starting AI Assistant...");
    logger.info(`🤖 Source number (Bot): ${SOURCE_NUMBER}`);
    logger.info(`👤 Target number (You): ${TARGET_NUMBER}`);
    logger.info(`🌍 Timezone: ${TIMEZONE}`);
    logger.info(
      `🎤 Voice messages: ${VOICE_MESSAGES_ENABLED ? "Enabled" : "Disabled"}`
    );
    logger.info(`🔍 Debug mode: ${DEBUG_MODE ? "Enabled" : "Disabled"}`);
    logger.info(
      `💬 Chat mode: ${
        SELF_CHAT ? "Self-chat (both right)" : "Dual-number (left/right)"
      }`
    );

    await this.initialize();
  }

  async stop() {
    logger.info("🛑 Stopping WhatsApp Bot...");
    this.logSystemStatus();

    // Disconnect services
    if (database.isConnected) {
      await database.disconnect();
    }

    if (cacheService.isAvailable()) {
      await cacheService.disconnect();
    }

    if (this.client) {
      await this.client.destroy();
    }
    process.exit(0);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  logger.info("\n🛑 Shutting down bot...");
  if (bot) {
    await bot.stop();
  }
});

process.on("SIGTERM", async () => {
  logger.info("\n🛑 Shutting down bot...");
  if (bot) {
    await bot.stop();
  }
});

// Start the bot
const bot = new WhatsAppBot();
bot.start().catch((error) => {
  logger.error(`❌ Failed to start bot: ${error.message}`);
  process.exit(1);
});
