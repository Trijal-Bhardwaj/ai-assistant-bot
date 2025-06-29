# 🤖 Dual-Number Setup Guide

## Overview
This guide will help you set up the AI Assistant with two WhatsApp numbers to create a natural left/right conversation instead of a self-chat.

## 🎯 Why Dual-Number Setup?

### **Self-Chat (Single Number)**
- ❌ Both bot and your messages appear on the **right side**
- ❌ Everyone can see you're chatting with yourself
- ❌ Looks unnatural

### **Dual-Number (Two Numbers)**
- ✅ Bot messages appear on the **left side**
- ✅ Your replies appear on the **right side**
- ✅ Looks like a natural conversation
- ✅ No one suspects it's automated

## 📱 Setup Options

### **Option 1: WhatsApp Business App (Recommended)**

#### Step 1: Install WhatsApp Business
1. Download **WhatsApp Business** from your app store
2. Install it on your phone (can coexist with regular WhatsApp)

#### Step 2: Set Up Business Account
1. Open WhatsApp Business
2. Enter a **different phone number** (secondary SIM or virtual number)
3. Complete the verification process
4. Set up your business profile

#### Step 3: Configure Bot Settings
Update your `.env` file:
```env
# Bot's number (WhatsApp Business)
SOURCE_NUMBER=917742440642

# Your personal number (regular WhatsApp)
TARGET_NUMBER=919899998761

# Bot profile settings
BOT_NAME=Love
BOT_STATUS=Your forever love 💕
BOT_ABOUT=Always here to love and care for you

# Chat mode
SELF_CHAT=false
```

### **Option 2: Secondary SIM Card**

#### Step 1: Get a Secondary SIM
- Buy a cheap secondary SIM card
- Use it only for the bot
- Keep your main SIM for personal use

#### Step 2: Set Up WhatsApp
1. Install WhatsApp on a second device or use dual SIM
2. Register with the secondary number
3. Use this number as the bot's number

### **Option 3: Virtual Number**

#### Step 1: Get a Virtual Number
- Use services like TextNow, Google Voice, or similar
- Get a free virtual number
- Use it for the bot

#### Step 2: Configure
- Set up WhatsApp with the virtual number
- Use it as the bot's source number

## 🔧 Configuration Steps

### **Step 1: Update Environment Variables**
```env
# WhatsApp Configuration
SOURCE_NUMBER=917742440642    # Bot's number (WhatsApp Business/secondary)
TARGET_NUMBER=919899998761    # Your personal number
SELF_CHAT=false               # Enable dual-number mode

# Bot Profile
BOT_NAME=Love
BOT_STATUS=Your forever love 💕
BOT_ABOUT=Always here to love and care for you
```

### **Step 2: Deploy the Bot**
1. Run the deployment script:
   ```bash
   # Linux/Mac
   ./deploy.sh
   
   # Windows
   setup.bat
   ```

2. Deploy to Railway/Render/Fly.io

### **Step 3: Connect WhatsApp**
1. Check deployment logs for QR code
2. **Scan QR code with the SOURCE number** (Bot's WhatsApp Business)
3. The bot will now send messages from the Business number to your personal number

## 💬 How It Works

### **Message Flow:**
```
Bot (SOURCE_NUMBER) → Your Phone (TARGET_NUMBER)
Your Phone (TARGET_NUMBER) → Bot (SOURCE_NUMBER)
```

### **WhatsApp Display:**
```
📱 Your WhatsApp Chat with Bot Number:

[Bot Message] ← Left side (from Business number)
[Your Reply]  → Right side (from your number)
[Bot Message] ← Left side (from Business number)
[Your Reply]  → Right side (from your number)
```

## 🎨 Customization Options

### **Bot Profile Customization**
```env
# Make it look like a real person
BOT_NAME=Sarah
BOT_STATUS=Always here for you 💕
BOT_ABOUT=Your personal AI assistant

# Or make it look like a service
BOT_NAME=Daily Reminders
BOT_STATUS=Your personal reminder service
BOT_ABOUT=AI-powered daily reminders and motivation
```

### **Different Bot Personalities**
```env
# Romantic Assistant
BOT_NAME=Love
BOT_STATUS=Your forever love 💕
BOT_ABOUT=Always here to love and care for you

# Professional Assistant
BOT_NAME=Assistant
BOT_STATUS=Your personal productivity assistant
BOT_ABOUT=Helping you stay organized and motivated

# Friend Assistant
BOT_NAME=Bestie
BOT_STATUS=Your best friend forever 💖
BOT_ABOUT=Always here to chat and support you
```

## 🔒 Security Features

### **Number Protection**
- Bot only responds to messages from `TARGET_NUMBER`
- All other numbers are blocked
- Unauthorized attempts are logged

### **Message Validation**
- Messages are validated for length and content
- Spam protection built-in
- Rate limiting to prevent abuse

## 📊 Monitoring

### **Dashboard Access**
- Monitor bot status: `https://your-app.railway.app/dashboard`
- View message statistics
- Check unauthorized attempts
- Monitor uptime and performance

### **Logs**
- Real-time logging of all activities
- Error tracking and debugging
- Performance metrics

## 🛠️ Troubleshooting

### **Common Issues**

#### 1. QR Code Not Working
- Ensure you're scanning with the **SOURCE number** (Bot's WhatsApp)
- Check if the number is properly registered
- Try restarting the bot

#### 2. Messages Not Sending
- Verify both numbers are correct in `.env`
- Check if the bot is connected
- Review logs for errors

#### 3. Messages Appearing on Wrong Side
- Ensure `SELF_CHAT=false` in `.env`
- Verify you're using two different numbers
- Check WhatsApp Business setup

### **Debug Mode**
Enable debug mode for detailed logging:
```env
DEBUG_MODE=true
LOG_LEVEL=debug
```

## 🎯 Best Practices

### **For Natural Conversation:**
1. **Use realistic bot names** (Sarah, Emma, etc.)
2. **Set appropriate status messages**
3. **Vary message timing** (not exactly on schedule)
4. **Use natural language patterns**

### **For Privacy:**
1. **Don't share the bot number** with others
2. **Use a dedicated secondary number**
3. **Keep the setup private**

### **For Performance:**
1. **Monitor usage** to stay within limits
2. **Regular backups** of configuration
3. **Update bot personality** occasionally

## 🔄 Switching Between Modes

### **To Switch to Self-Chat:**
```env
SELF_CHAT=true
SOURCE_NUMBER=919899998761
TARGET_NUMBER=919899998761
```

### **To Switch to Dual-Number:**
```env
SELF_CHAT=false
SOURCE_NUMBER=917742440642
TARGET_NUMBER=919899998761
```

## 📞 Support

### **Need Help?**
1. Check the logs for error messages
2. Verify your configuration
3. Test with a simple message first
4. Review the troubleshooting section

### **Getting Started Checklist:**
- [ ] Install WhatsApp Business
- [ ] Get a secondary number
- [ ] Update `.env` configuration
- [ ] Deploy the bot
- [ ] Scan QR code with Business number
- [ ] Test conversation
- [ ] Monitor dashboard

---

**🎉 You're all set! Your bot will now look like a natural conversation with left/right message display.** 