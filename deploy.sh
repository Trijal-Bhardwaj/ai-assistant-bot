#!/bin/bash

# AI Assistant Deployment Script
# This script helps you deploy your AI Assistant to Railway

echo "🚀 AI Assistant Deployment Script"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update .env file with your configuration"
else
    echo "✅ .env file already exists"
fi

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📥 Installing Railway CLI..."
    npm install -g @railway/cli
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Railway CLI"
        echo "Please install manually: npm install -g @railway/cli"
    else
        echo "✅ Railway CLI installed"
    fi
else
    echo "✅ Railway CLI already installed"
fi

# Check git status
if [ -d .git ]; then
    echo "📊 Checking git status..."
    git status
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo "📝 Committing changes..."
        git add .
        git commit -m "Update AI Assistant with advanced features"
    fi
    
    # Check if remote exists
    if ! git remote get-url origin &> /dev/null; then
        echo "⚠️  No remote repository found"
        echo "Please create a GitHub repository and add it as remote:"
        echo "git remote add origin <your-repo-url>"
    else
        echo "✅ Remote repository configured"
        echo "📤 Pushing to GitHub..."
        git push origin main
    fi
else
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: AI Assistant"
    echo "⚠️  Please add remote repository:"
    echo "git remote add origin <your-repo-url>"
    echo "git push -u origin main"
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. 📝 Update .env file with your configuration:"
echo "   - TARGET_PHONE_NUMBER=919899998761"
echo "   - MONGODB_URI=your-mongodb-uri"
echo "   - REDIS_URL=your-redis-url (optional)"
echo "   - OPENAI_API_KEY=your-openai-key (optional)"
echo ""
echo "2. 🚀 Deploy to Railway:"
echo "   - Go to https://railway.app"
echo "   - Sign in with GitHub"
echo "   - Create new project"
echo "   - Select your repository"
echo "   - Add environment variables"
echo ""
echo "3. 📱 Connect WhatsApp:"
echo "   - Check Railway logs for QR code"
echo "   - Scan QR code with WhatsApp"
echo "   - Your bot is live!"
echo ""
echo "4. 📊 Monitor your bot:"
echo "   - Access dashboard: https://your-app.railway.app/dashboard"
echo "   - Check logs and statistics"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "🔒 Security Note: Bot is configured to ONLY respond to 9198999998761"
echo ""

# Test local setup
echo "🧪 Testing local setup..."
if npm test &> /dev/null; then
    echo "✅ Local tests passed"
else
    echo "⚠️  No tests found or tests failed"
fi

echo ""
echo "🎉 Setup complete! Follow the next steps above to deploy." 