# 🚀 Northflank Deployment Guide

Deploy your AI Assistant to Northflank for **24/7 free hosting** with no sleep mode!

## 🎯 Why Northflank?

- ✅ **Completely Free** - No credit card required
- ✅ **True 24/7** - No sleep mode, always running
- ✅ **Unlimited Hours** - No monthly limits
- ✅ **Better Performance** - 512MB RAM, 0.5 CPU
- ✅ **Easy Setup** - GitHub integration
- ✅ **Auto-deploy** - Updates automatically

## 📋 Prerequisites

### Required Accounts (All Free)
- **GitHub Account**: [github.com](https://github.com)
- **Northflank Account**: [northflank.com](https://northflank.com)
- **MongoDB Atlas**: [mongodb.com/atlas](https://www.mongodb.com/atlas) (Free tier: 512MB)
- **Redis Cloud**: [redis.com/try-free](https://redis.com/try-free) (Free tier: 30MB)
- **OpenAI Account**: [platform.openai.com](https://platform.openai.com) (Free credits available)

### WhatsApp Setup
- **Bot Number**: `917742440642` (your brother's number)
- **Your Number**: `919899998761` (receives messages)

## 🚀 Quick Deployment

### Option 1: Automated Script (Recommended)

#### For Windows:
```bash
deploy-northflank.bat
```

#### For Mac/Linux:
```bash
chmod +x deploy-northflank.sh
./deploy-northflank.sh
```

### Option 2: Manual Setup

## 📁 Step 1: Prepare Your Repository

### 1.1 Create Private GitHub Repository
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `ai-assistant-bot`
3. **Make it PRIVATE** (important!)
4. Don't initialize with README
5. Click "Create repository"

### 1.2 Push Your Code
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: AI Assistant WhatsApp Bot"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/ai-assistant-bot.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Northflank Setup

### 2.1 Create Northflank Account
1. Go to [https://northflank.com](https://northflank.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Verify your email

### 2.2 Create Project
1. Click "New Project"
2. Name: `ai-assistant`
3. Click "Create"

### 2.3 Add Service
1. Click "Add Service" → "Application"
2. Connect your GitHub repository
3. Select your repository: `YOUR_USERNAME/ai-assistant-bot`

### 2.4 Configure Service
```bash
Name: whatsapp-bot
Source: GitHub
Repository: YOUR_USERNAME/ai-assistant-bot
Branch: main
Build Command: npm install
Start Command: npm start
```

## 🔐 Step 3: Environment Variables

### 3.1 Required Variables
Go to "Variables" tab and add:

```env
# WhatsApp Configuration
SOURCE_NUMBER=917742440642
TARGET_NUMBER=919899998761
SELF_CHAT=false
ALLOWED_NUMBERS=919899998761

# Bot Configuration
BOT_NAME=Love
BOT_STATUS=Your forever love 💕
BOT_ABOUT=Always here to love and care for you

# Timezone
TIMEZONE=Asia/Kolkata

# Production Settings
NODE_ENV=production
DEBUG_MODE=false
LOG_LEVEL=info

# Voice Messages
VOICE_MESSAGES_ENABLED=false
TTS_PROVIDER=gtts
TTS_LANGUAGE=hi-IN

# Message Control
MIN_MESSAGE_INTERVAL=5

# Monitoring
ENABLE_MONITORING=true
MONITORING_PORT=3000
```

### 3.2 Optional Variables (Add if you have them)
```env
# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Cache (Redis Cloud)
REDIS_URL=redis://default:password@redis-server.com:port

# AI Features (OpenAI)
OPENAI_API_KEY=sk-your-openai-api-key-here
```

## 🚀 Step 4: Deploy

### 4.1 Deploy Service
1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Check "Logs" tab for progress

### 4.2 Monitor Deployment
Watch the logs for:
- ✅ Dependencies installed
- ✅ Services connected
- ✅ Bot initialized
- ✅ QR code generated

## 📱 Step 5: Connect WhatsApp

### 5.1 Scan QR Code
1. Check Northflank logs for QR code
2. **Scan with bot number** (`917742440642`)
3. Wait for connection confirmation

### 5.2 Test Bot
1. Bot will send test message to your number
2. Reply with "ok" to test response
3. Check if bot responds correctly

## 🔒 Step 6: Security & Privacy

### 6.1 Verify Privacy
- ✅ Only your number (`919899998761`) can interact
- ✅ Other conversations are ignored
- ✅ Bot only processes configured chat

### 6.2 Monitor Access
- Check logs for unauthorized attempts
- Verify ALLOWED_NUMBERS is working
- Monitor bot responses

## 📊 Step 7: Monitoring

### 7.1 Northflank Dashboard
- **URL**: [https://app.northflank.com](https://app.northflank.com)
- **Features**:
  - Real-time logs
  - Resource usage
  - Deployment status
  - Environment variables

### 7.2 Bot Status
Check logs for:
- ✅ Connection status
- ✅ Message sending
- ✅ User responses
- ✅ Error messages

## 🛠️ Troubleshooting

### Common Issues

#### Bot Not Starting
```bash
# Check logs for errors
# Common fixes:
- Verify all environment variables
- Check MongoDB connection
- Ensure Redis URL is correct
- Verify Node.js version (16+)
```

#### QR Code Not Appearing
```bash
# Wait 2-3 minutes for full deployment
# Check "Logs" tab
# Restart service if needed
# Verify WhatsApp not logged in elsewhere
```

#### Messages Not Sending
```bash
# Verify phone numbers in environment
# Check ALLOWED_NUMBERS includes your number
# Ensure bot is connected (check logs)
# Verify timezone is correct
```

#### Database Connection Issues
```bash
# Check MongoDB Atlas connection
# Verify network access
# Ensure database user permissions
# Check connection string format
```

### Performance Optimization

#### For Northflank Free Tier
```bash
# Optimize memory usage
NODE_ENV=production
DEBUG_MODE=false
LOG_LEVEL=error

# Reduce dependencies
# Remove unused packages
# Use lightweight alternatives
```

## 🔄 Updates & Maintenance

### Automatic Updates
Northflank automatically redeploys on Git push:
```bash
git add .
git commit -m "Update bot features"
git push origin main
```

### Manual Updates
```bash
# In Northflank dashboard
# Click "Redeploy" button
# Or restart service
```

### Environment Variable Updates
1. Go to Northflank dashboard
2. Click "Variables" tab
3. Add/modify variables
4. Click "Save"
5. Service auto-restarts

## 📈 Scaling

### Free Tier Limits
- **CPU**: 0.5 cores
- **Memory**: 512MB RAM
- **Storage**: 1GB
- **Hours**: Unlimited

### Performance Tips
- Monitor resource usage
- Optimize code for memory
- Use efficient algorithms
- Cache frequently used data

## 🆘 Support

### Northflank Support
- **Documentation**: [docs.northflank.com](https://docs.northflank.com)
- **Community**: [community.northflank.com](https://community.northflank.com)
- **Email**: support@northflank.com

### Bot Issues
- Check logs for error messages
- Verify environment variables
- Test locally first
- Review configuration

## 🎯 Success Checklist

- ✅ Repository created and private
- ✅ Code pushed to GitHub
- ✅ Northflank account created
- ✅ Service deployed successfully
- ✅ Environment variables added
- ✅ QR code scanned with bot number
- ✅ Test message received
- ✅ Bot responds to replies
- ✅ Privacy protection working
- ✅ 24/7 operation confirmed

## 🎉 Congratulations!

Your AI Assistant is now running 24/7 on Northflank for free! 

**Features Active:**
- 📅 Smart scheduling
- 💕 Personalized messages
- 🔒 Privacy protection
- 💬 Two-way communication
- 🌍 Hindi-English mix
- 🎤 Voice support (if enabled)
- 📊 Monitoring dashboard

**Your bot will:**
- Send reminders at scheduled times
- Respond to your confirmations
- Work 24/7 without interruption
- Protect your privacy
- Scale automatically

Enjoy your personal AI assistant! 💕 