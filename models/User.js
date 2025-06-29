const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    default: "User",
  },
  preferences: {
    language: {
      type: String,
      enum: ["en", "hi", "mixed"],
      default: "mixed",
    },
    messageStyle: {
      type: String,
      enum: ["romantic", "caring", "professional", "casual"],
      default: "romantic",
    },
    voiceEnabled: {
      type: Boolean,
      default: false,
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
  },
  stats: {
    messagesReceived: {
      type: Number,
      default: 0,
    },
    responsesSent: {
      type: Number,
      default: 0,
    },
    lastInteraction: {
      type: Date,
      default: Date.now,
    },
    totalInteractions: {
      type: Number,
      default: 0,
    },
  },
  schedule: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
