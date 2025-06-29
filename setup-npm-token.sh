#!/bin/bash

# NPM Token Setup Script
# This script helps you set up your NPM token for deployment

echo "🔑 NPM Token Setup Script"
echo "========================"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create your .env file first:"
    echo "  cp .env.example .env"
    exit 1
fi

echo "📋 NPM Token Setup Instructions:"
echo "================================"
echo ""
echo "1. 🌐 Go to https://www.npmjs.com/settings/tokens"
echo "2. 🔐 Sign in to your npm account"
echo "3. ➕ Click 'Generate New Token'"
echo "4. 📝 Select 'Automation' token type"
echo "5. ⏰ Set expiration (recommend: 90 days)"
echo "6. 🔑 Click 'Generate Token'"
echo "7. 📋 Copy the token (it starts with 'npm_')"
echo ""
echo "⚠️  IMPORTANT: Copy the token immediately - you won't see it again!"
echo ""

# Ask user for their token
read -p "🔑 Enter your NPM token (starts with 'npm_'): " npm_token

# Validate token format
if [[ ! $npm_token =~ ^npm_[a-zA-Z0-9]{36}$ ]]; then
    echo "❌ Invalid token format!"
    echo "Token should start with 'npm_' and be 40 characters long"
    echo "Example: npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    exit 1
fi

echo ""
echo "✅ Valid token format detected!"
echo ""

# Update .env file
echo "📝 Updating .env file..."
if grep -q "NPM_TOKEN=" .env; then
    # Replace existing NPM_TOKEN
    sed -i "s/NPM_TOKEN=.*/NPM_TOKEN=$npm_token/" .env
    echo "✅ Updated existing NPM_TOKEN in .env"
else
    # Add NPM_TOKEN if not exists
    echo "NPM_TOKEN=$npm_token" >> .env
    echo "✅ Added NPM_TOKEN to .env"
fi

echo ""
echo "🔍 Verifying setup..."
echo ""

# Test the token
TEMP_NPMRC=".npmrc.temp"
echo "//registry.npmjs.org/:_authToken=$npm_token" > "$TEMP_NPMRC"
echo "registry=https://registry.npmjs.org/" >> "$TEMP_NPMRC"

# Test npm whoami
echo "Testing npm authentication..."
NPM_USER=$(npm --userconfig "$TEMP_NPMRC" whoami 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ NPM authentication successful!"
    echo "   User: $NPM_USER"
else
    echo "❌ NPM authentication failed!"
    echo "   Please check your token and try again"
    rm -f "$TEMP_NPMRC"
    exit 1
fi

# Clean up
rm -f "$TEMP_NPMRC"

echo ""
echo "🎉 NPM Token Setup Complete!"
echo "============================"
echo ""
echo "✅ Token added to .env file"
echo "✅ Authentication verified"
echo "✅ Ready for deployment"
echo ""
echo "📖 Next steps:"
echo "1. Set NPM_TOKEN in your hosting platform"
echo "2. Deploy your application"
echo "3. Monitor build logs"
echo ""
echo "📚 For more information:"
echo "- NPM_TOKEN_SETUP.md - Detailed guide"
echo "- verify-npm-token.sh - Verification script"
echo "- README.md - Project documentation"
echo ""
echo "🔒 Security reminder:"
echo "- Never commit your .env file to git"
echo "- Rotate your token every 30-90 days"
echo "- Keep your repository private" 