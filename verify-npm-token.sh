#!/bin/bash

# NPM Token Verification Script
# This script verifies your npm token configuration

echo "🔑 NPM Token Verification Script"
echo "================================"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create your .env file first:"
    echo "  cp .env.example .env"
    exit 1
fi

# Check if .npmrc file exists
if [ ! -f ".npmrc" ]; then
    echo "❌ Error: .npmrc file not found!"
    echo "Please create your .npmrc file first:"
    echo "  cp .npmrc.example .npmrc"
    exit 1
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

echo "📋 Checking NPM Token Configuration..."
echo ""

# Check if NPM_TOKEN is set in environment
if [ -z "$NPM_TOKEN" ]; then
    echo "❌ NPM_TOKEN not found in environment variables"
    echo "Please add NPM_TOKEN to your .env file:"
    echo "  NPM_TOKEN=npm_your_actual_token_here"
    exit 1
else
    echo "✅ NPM_TOKEN found in environment variables"
    echo "   Token: ${NPM_TOKEN:0:10}...${NPM_TOKEN: -4}"
fi

# Check .npmrc configuration
echo ""
echo "📄 Checking .npmrc file..."
if grep -q "_authToken" .npmrc; then
    echo "✅ .npmrc contains auth token configuration"
else
    echo "⚠️  .npmrc doesn't contain explicit auth token"
    echo "   (This is okay if using environment variable)"
fi

# Test npm authentication
echo ""
echo "🔐 Testing NPM Authentication..."
echo ""

# Create temporary .npmrc with token
TEMP_NPMRC=".npmrc.temp"
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > "$TEMP_NPMRC"
echo "registry=https://registry.npmjs.org/" >> "$TEMP_NPMRC"

# Test npm whoami
echo "Testing npm whoami..."
NPM_USER=$(npm --userconfig "$TEMP_NPMRC" whoami 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ NPM authentication successful"
    echo "   User: $NPM_USER"
else
    echo "❌ NPM authentication failed"
    echo "   Please check your NPM_TOKEN"
    rm -f "$TEMP_NPMRC"
    exit 1
fi

# Test package access
echo ""
echo "📦 Testing package access..."
NPM_TEST=$(npm --userconfig "$TEMP_NPMRC" view whatsapp-web.js version 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Package access successful"
    echo "   whatsapp-web.js version: $NPM_TEST"
else
    echo "❌ Package access failed"
    echo "   Please check your NPM_TOKEN permissions"
    rm -f "$TEMP_NPMRC"
    exit 1
fi

# Clean up
rm -f "$TEMP_NPMRC"

echo ""
echo "🎉 NPM Token Verification Complete!"
echo "=================================="
echo ""
echo "✅ Your NPM token is properly configured"
echo "✅ Authentication is working"
echo "✅ Package access is working"
echo ""
echo "🚀 You're ready to deploy!"
echo ""
echo "📖 Next steps:"
echo "1. Set NPM_TOKEN in your hosting platform"
echo "2. Deploy your application"
echo "3. Monitor build logs for any issues"
echo ""
echo "📚 For more information:"
echo "- NPM_TOKEN_SETUP.md - Detailed setup guide"
echo "- README.md - Project documentation" 