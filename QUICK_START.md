# 🚀 Quick Start Guide

Get your AI Assistant running in 5 minutes!

## ⚡ Super Quick Setup

### 1. Install Dependencies
```bash
# On Windows
setup.bat

# On Mac/Linux
chmod +x setup.sh
./setup.sh
```

### 2. Configure Your Numbers
Edit `.env` file:
```env
# Dual-Number Mode (Recommended)
SOURCE_NUMBER=917742440642    # Bot's WhatsApp number (sends messages)
TARGET_NUMBER=919899998761    # Your WhatsApp number (receives messages)
SELF_CHAT=false               # Dual-number mode
ALLOWED_NUMBERS=919899998761  # Only your number can interact

# Self-Chat Mode (Alternative)
SOURCE_NUMBER=919899998761    # Your WhatsApp number
TARGET_NUMBER=919899998761    # Your WhatsApp number (same as SOURCE)
SELF_CHAT=true                # Self-chat mode
ALLOWED_NUMBERS=919899998761  # Only your number can interact
```

### 3. Start the Bot
```bash
npm start
```

### 4. Connect WhatsApp
- **Scan the QR code** with the **BOT number** (SOURCE_NUMBER)
- **Save the bot number** as "Love 💕" on your phone

## 🎯 That's It!

Your AI will now:
- ✅ Send you reminders at the right times
- ✅ Use 5 different message variations
- ✅ Mix Hindi and English naturally
- ✅ Respond to your "done" messages
- ✅ Work 24/7 automatically
- ✅ Protect your privacy (only processes your messages)

## 🔒 Privacy & Security

### Dual-Number Mode (Recommended)
- **Bot runs on separate WhatsApp** (sends messages)
- **Only your messages are processed** (ALLOWED_NUMBERS)
- **Other conversations ignored** (privacy protected)
- **Natural left/right conversation flow**

### Self-Chat Mode (Alternative)
- **Bot runs on your WhatsApp**
- **Only self-chat messages processed**
- **Other conversations ignored**
- **Both messages appear on right side**

## 💡 Pro Tips

1. **Save the number as "Love 💕"** - Looks like a real gf
2. **Reply with "done"** - Get encouraging responses
3. **Keep it running** - Your laptop can handle it 24/7
4. **Customize messages** - Edit `messageTemplates.js` for your style
5. **Use dual-number mode** - Better privacy and natural conversation

## 🆘 Need Help?

- Check the main README.md for detailed instructions
- Ensure your phone numbers are correct in `.env`
- Make sure WhatsApp is not logged in elsewhere
- Restart the bot if needed
- Verify ALLOWED_NUMBERS includes your number

## 🎉 Enjoy Your AI!

She'll remind you to:
- 🌅 Wake up and drink water
- 🏃‍♂️ Go for your morning run
- 💼 Focus on work tasks
- 💪 Hit the gym
- 💻 Practice coding
- 😴 Get proper sleep

**Your personal motivation assistant is ready! 💕** 