const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ["scheduled", "response", "user_message"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    default: null,
  },
  trigger: {
    type: String,
    default: null,
  },
  response: {
    type: String,
    default: null,
  },
  metadata: {
    messageLength: Number,
    language: String,
    sentiment: String,
    keywords: [String],
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  processed: {
    type: Boolean,
    default: false,
  },
});

// Index for efficient querying
messageSchema.index({ phoneNumber: 1, timestamp: -1 });
messageSchema.index({ type: 1, timestamp: -1 });

module.exports = mongoose.model("Message", messageSchema);
