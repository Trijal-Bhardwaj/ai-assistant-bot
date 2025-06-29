#!/bin/bash

# Render Deployment Script
# This script helps you deploy your WhatsApp bot to Render

echo "🚀 Render Deployment Script"
echo "=========================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found!"
    echo "Please initialize git and push your code to GitHub first:"
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m 'Initial commit'"
    echo "  git remote add origin <your-github-repo-url>"
    echo "  git push -u origin main"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create your .env file first:"
    echo "  cp .env.example .env"
    echo "  # Edit .env with your configuration"
    exit 1
fi

# Check if .npmrc file exists
if [ ! -f ".npmrc" ]; then
    echo "❌ Error: .npmrc file not found!"
    echo "Please create your .npmrc file first:"
    echo "  cp .npmrc.example .npmrc"
    echo "  # Edit .npmrc with your npm configuration"
    exit 1
fi

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found!"
    echo "Please ensure render.yaml is in your repository"
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Check git status
echo ""
echo "📋 Checking git status..."
git status --porcelain

if [ $? -eq 0 ] && [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "⚠️  You have uncommitted changes!"
    read -p "Do you want to commit and push changes? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 Committing changes..."
        git add .
        git commit -m "Update for Render deployment"
        echo "📤 Pushing to GitHub..."
        git push
    else
        echo "❌ Please commit and push your changes before deploying"
        exit 1
    fi
fi

echo ""
echo "🎯 Render Deployment Steps:"
echo "=========================="
echo ""
echo "1. 📱 Go to https://dashboard.render.com"
echo "2. 🔗 Click 'New +' and select 'Blueprint'"
echo "3. 📂 Connect your GitHub account"
echo "4. 🏗️  Select your repository"
echo "5. ⚙️  Configure environment variables:"
echo ""
echo "   Required Environment Variables:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your_mongodb_connection_string"
echo "   - REDIS_URL=your_redis_connection_string"
echo "   - BOT_NUMBER=your_bot_whatsapp_number"
echo "   - USER_NUMBER=your_user_whatsapp_number"
echo "   - ALLOWED_NUMBERS=your_bot_number,your_user_number"
echo "   - NPM_TOKEN=your_npm_token"
echo ""
echo "   Optional Environment Variables:"
echo "   - LOG_LEVEL=info"
echo "   - PORT=3000"
echo ""
echo "6. 🗄️  Set up databases:"
echo "   - MongoDB: Use MongoDB Atlas (free tier)"
echo "   - Redis: Use Render's Redis service (free tier)"
echo ""
echo "7. 🚀 Click 'Create Blueprint' to deploy"
echo ""
echo "📖 For detailed instructions, see: RENDER_DEPLOYMENT.md"
echo ""
echo "⚠️  Important Notes:"
echo "- Render free tier sleeps after 15 minutes of inactivity"
echo "- First request after sleep takes 30-60 seconds to wake up"
echo "- Consider upgrading to paid plan for 24/7 operation"
echo ""
echo "🔗 Your bot will be available at: https://your-app-name.onrender.com"
echo ""
echo "✅ Deployment script completed!" 