# 🚀 Northflank Deployment Checklist

## Current Status: ✅ Project Created
- **Project Name**: WhatsApp TimeTable ChatBot
- **Project ID**: project-whatsapp-timetable-chatbot
- **Region**: US - Central

## Next Steps:

### 1. 📦 Add New Service
- [ ] Click "Add new service" button
- [ ] Select "Application" (not job)
- [ ] Choose "Git" as source

### 2. 🔗 Connect GitHub Repository
- [ ] Connect GitHub account (if not already)
- [ ] Select repository: `yourusername/ai-assistant-bot`
- [ ] Choose branch: `main`

### 3. ⚙️ Configure Service
- [ ] **Name**: `whatsapp-bot`
- [ ] **Source**: `Git`
- [ ] **Repository**: `yourusername/ai-assistant-bot`
- [ ] **Branch**: `main`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`

### 4. 🔐 Add Environment Variables
Go to "Variables" tab and add these from your .env file:

#### Required Variables:
```
SOURCE_NUMBER=your-bot-phone-number
TARGET_NUMBER=your-personal-phone-number
SELF_CHAT=false
ALLOWED_NUMBERS=your-personal-phone-number
TIMEZONE=Asia/Kolkata
BOT_NAME=Your Bot Name
BOT_STATUS=Your bot status message
BOT_ABOUT=Your bot about message
NODE_ENV=production
DEBUG_MODE=false
LOG_LEVEL=info
VOICE_MESSAGES_ENABLED=false
MIN_MESSAGE_INTERVAL=5
ENABLE_MONITORING=true
MONITORING_PORT=3000
TTS_PROVIDER=gtts
TTS_LANGUAGE=hi-IN
```

#### Your Database & API Keys (from .env file):
```
MONGODB_URI=your-mongodb-atlas-connection-string
REDIS_URL=your-redis-cloud-connection-string
OPENAI_API_KEY=your-openai-api-key
```

### 5. 🚀 Deploy
- [ ] Click "Deploy" button
- [ ] Wait for deployment (2-3 minutes)
- [ ] Monitor logs for progress

### 6. 📱 Connect WhatsApp
- [ ] Check logs for QR code
- [ ] **Scan QR code with bot number**
- [ ] Wait for connection confirmation

### 7. ✅ Test Bot
- [ ] Bot sends test message to your number
- [ ] Reply with "ok" to test response
- [ ] Verify bot responds correctly

## 🎯 Success Indicators:
- ✅ Service shows "Running" status
- ✅ Logs show "Bot connected successfully"
- ✅ QR code appears in logs
- ✅ WhatsApp shows "connected" status
- ✅ Test message received on your phone
- ✅ Bot responds to your replies
- ✅ Database connection established
- ✅ Redis cache working
- ✅ AI features available

## 🆘 If Issues:
1. Check logs for error messages
2. Verify all environment variables are set
3. Ensure GitHub repository is accessible
4. Check if WhatsApp is logged in elsewhere
5. Restart service if needed

## 📊 Monitoring:
- **Dashboard**: https://app.northflank.com
- **Logs**: Available in service dashboard
- **Status**: Check "Services" tab for running status

## 🔒 Security Checklist:
- [ ] Repository is private
- [ ] .env file is in .gitignore
- [ ] No sensitive data in code files
- [ ] Environment variables added in Northflank
- [ ] API keys are secure
- [ ] Phone numbers are protected

## 🎉 Your Bot Features:
- ✅ **Full AI capabilities** with OpenAI
- ✅ **Database persistence** with MongoDB Atlas
- ✅ **Performance caching** with Redis Cloud
- ✅ **24/7 operation** on Northflank
- ✅ **Smart scheduling** based on timetable
- ✅ **Privacy protection** (only your number)
- ✅ **Hindi-English** mixed messages
- ✅ **Voice message support** (if enabled)

---
**Your bot will run 24/7 for free on Northflank with full AI capabilities! 🚀** 