#!/bin/bash

echo "🌟 AI Assistant Setup"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    
    # Install Python dependencies
    echo "📦 Installing Python dependencies..."
    pip3 install -r requirements.txt
    
    echo "✅ Python dependencies installed"
else
    echo "⚠️ Python 3 not found. Voice messages will be disabled."
    echo "Install Python 3 to enable voice messages."
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️ Please edit .env file with your configuration before starting the bot"
else
    echo "✅ .env file already exists"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p whatsapp-sessions
mkdir -p voice_messages
mkdir -p test_voice

echo "✅ Directories created"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "🔧 Configuration:"
echo "1. Edit .env file with your phone numbers:"
echo "   - SOURCE_NUMBER: Bot's WhatsApp number (sends messages)"
echo "   - TARGET_NUMBER: Your WhatsApp number (receives messages)"
echo "   - ALLOWED_NUMBERS: Your number only (for privacy)"
echo "   - SELF_CHAT: false (for dual-number mode)"
echo ""
echo "🚀 Starting the bot:"
echo "2. Run 'npm start' to start the bot"
echo "3. Scan the QR code with the BOT number (SOURCE_NUMBER)"
echo "4. Save the bot number as 'Love 💕' on your phone"
echo ""
echo "🔒 Privacy & Security:"
echo "- Only messages from ALLOWED_NUMBERS are processed"
echo "- Other conversations are completely ignored"
echo "- Bot only reads messages from configured chat"
echo ""
echo "🎤 Voice messages (optional):"
echo "1. Ensure Python 3 is installed"
echo "2. Set VOICE_MESSAGES_ENABLED=true in .env"
echo "3. Run 'python3 voiceGenerator.py test' to test voice generation"
echo ""
echo "Happy coding! 💕" 