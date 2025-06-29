# 🌟 AI Assistant - WhatsApp Bot

Your personal AI assistant that sends you timely reminders based on your daily timetable with caring, romantic, and supportive messages in Hindi-English mix.

## ✨ Features

- **📅 Smart Scheduling**: Automatically reads your timetable and sends reminders at the right time
- **💕 Personalized Messages**: 5 different variations for each activity (caring, romantic, playful, motivational, supportive)
- **🌍 Hindi-English Mix**: Messages in a natural Hindi-English style like a real gf
- **🎤 Voice Messages**: Optional voice message support using Google Text-to-Speech
- **💬 Two-Way Chat**: Responds to your confirmations with encouraging messages
- **🔄 Multiple Schedules**: Supports WFO, WFH, and weekend schedules
- **💰 Completely Free**: No server costs, runs on your local machine or free hosting
- **🔒 Privacy**: Your personal assistant, no data shared with third parties
- **📱 Dual-Number Mode**: Natural left/right conversation flow

## 📋 Your Timetable Structure

The bot supports three different schedules:

### 🏢 WFO Days (Tuesday, Thursday)
- 4:45 AM - Wake Up & Hydration
- 5:00 AM - Morning Run
- 8:05 AM - Work Sessions
- 5:05 PM - Gym Workout
- 8:05 PM - Coding & Development
- 10:45 PM - Sleep

### 🏠 WFH Days (Monday, Wednesday, Friday)
- Similar schedule but with Leetcode sessions instead of commute
- More focused on coding and development

### 🎉 Weekend Days (Saturday, Sunday)
- Leetcode contests
- System design practice
- Personal projects
- Competitive coding contests

## 🚀 Quick Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.7+ (for voice messages)
- Two WhatsApp accounts (for dual-number mode)
- Your phone number

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies (for voice messages)
pip install gtts
```

### 2. Configure Your Settings

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

Update the `.env` file:
```env
# Dual-Number Mode (Recommended)
SOURCE_NUMBER=917742440642    # Bot's WhatsApp number (e.g., brother's/sister's)
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
# Start the WhatsApp bot
npm start

# Or for development with auto-restart
npm run dev
```

### 4. Connect WhatsApp

1. **Scan the QR code** with the **BOT number** (SOURCE_NUMBER)
2. The bot will connect to the bot's WhatsApp account
3. **Save the bot's number** as "Love 💕" or any name you prefer on your phone

## 📱 Message Examples

### 🌅 Wake Up Messages
- "Uth jaa baby 🌅 Subah ho gayi hai! Pehle paani pi le, fir din shuru karte hain 💧"
- "Good morning handsome! 💕 Paani piya kya? Hydration se hi to energy aati hai 😘"

### 💧 Hydration Reminders
- "Paani pi le please... hydration se hi to energy aati hai 💧"
- "Aaj bhi tumne paani nahi piya to naraz ho jaungi 😒💕"

### 🏃‍♂️ Exercise Reminders
- "Running time! 🏃‍♂️ 5km ka target hai aaj, tu kar lega na? 💪"
- "Gym time baby! 💪 Weight training and cardio, tu ready hai na? 🏋️‍♂️"

### 💻 Work Reminders
- "Work time baby! 💼 High priority tasks pe focus karo, tu kar lega 💪"
- "Coding time baby! 💻 Leetcode, system design, projects... tu ready hai na? 💪"

## 🎤 Voice Messages

To enable voice messages:

1. Install Python dependencies:
```bash
pip install gtts
```

2. Enable voice messages in `.env`:
```env
VOICE_MESSAGES_ENABLED=true
```

3. Generate voice messages:
```bash
# Test voice generation
python voiceGenerator.py test

# Generate all voice messages
python voiceGenerator.py generate

# Generate single voice message
python voiceGenerator.py single "Uth jaa baby! Subah ho gayi hai!"
```

## 💬 Two-Way Communication

The bot responds to your messages:

| Your Message | Bot Response |
|-------------|-------------|
| "done" | "Good boy! You're taking care of yourself 😌💕" |
| "completed" | "Excellent! You're staying on track baby 😘💕" |
| "ok" | "Perfect! You're listening to me 😊💕" |
| "yes" | "Yay! You're doing it baby 😊💕" |

## 🔒 Privacy & Security

### Dual-Number Mode (Recommended)
- **Bot runs on separate WhatsApp** (brother's/sister's number)
- **Only your messages are processed** (ALLOWED_NUMBERS)
- **Other conversations ignored** (privacy protected)
- **Natural left/right conversation flow**

### Self-Chat Mode (Alternative)
- **Bot runs on your WhatsApp**
- **Only self-chat messages processed**
- **Other conversations ignored**
- **Both messages appear on right side**

## 🏠 Free Hosting Options

### Option 1: Local Machine (Recommended)
- Run on your laptop/desktop
- Keep it running 24/7
- No costs involved

### Option 2: Railway (Free Tier)
1. Push code to GitHub
2. Connect Railway to your GitHub repo
3. Deploy automatically
4. Free tier available

### Option 3: Render (Free Tier)
1. Create account on Render
2. Connect your GitHub repo
3. Deploy as a web service
4. Free tier available

## 📁 Project Structure

```
ai-assistant/
├── index.js                 # Main bot script
├── messageTemplates.js      # Message variations
├── timetable.json          # Your schedule data
├── voiceGenerator.py       # Voice message generator
├── package.json            # Node.js dependencies
├── .env.example           # Configuration template
└── README.md              # This file
```

## 🔧 Customization

### Adding New Activities
1. Edit `timetable.json` to add new activities
2. Add message variations in `messageTemplates.js`
3. Restart the bot

### Modifying Messages
Edit `messageTemplates.js` to customize:
- Message tone and style
- Emoji usage
- Hindi-English mix

### Changing Schedule
Update `timetable.json` with your new schedule:
- Time format: "HH:MM" (24-hour)
- Activity names must match message templates
- Days: "Monday", "Tuesday", etc.

## 🛠️ Troubleshooting

### Bot Not Connecting
- Check your internet connection
- Ensure WhatsApp is not logged in elsewhere
- Try restarting the bot

### Messages Not Sending
- Verify your phone numbers in `.env`
- Check if the bot number is correct
- Ensure you're in ALLOWED_NUMBERS

### Privacy Issues
- Only messages from ALLOWED_NUMBERS are processed
- Other conversations are completely ignored
- Bot only reads messages from configured chat

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review your `.env` configuration
3. Ensure proper dual-number setup

## 🔄 Updates

- **v2.0**: Added dual-number mode for better privacy
- **v1.5**: Added voice message support
- **v1.0**: Initial release with basic scheduling

---

**Made with ❤️ for your daily motivation and care** 