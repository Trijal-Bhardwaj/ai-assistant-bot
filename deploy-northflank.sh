#!/bin/bash

echo "🚀 Northflank Deployment Script for AI Assistant"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_success "Prerequisites check passed"

# Get repository name from user
echo ""
print_status "Setting up GitHub repository..."
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name (default: ai-assistant-bot): " REPO_NAME
REPO_NAME=${REPO_NAME:-ai-assistant-bot}

# Update package.json with correct repository URL
print_status "Updating package.json with repository information..."
sed -i "s/yourusername/$GITHUB_USERNAME/g" package.json
sed -i "s/ai-assistant-bot/$REPO_NAME/g" package.json

# Update northflank.yaml with correct repository
print_status "Updating Northflank configuration..."
sed -i "s/yourusername/$GITHUB_USERNAME/g" northflank.yaml
sed -i "s/ai-assistant-bot/$REPO_NAME/g" northflank.yaml

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    print_success "Git repository initialized"
else
    print_status "Git repository already exists"
fi

# Add all files
print_status "Adding files to Git..."
git add .

# Commit changes
print_status "Committing changes..."
git commit -m "Initial commit: AI Assistant WhatsApp Bot with dual-number support"

# Create private repository on GitHub
print_status "Creating private repository on GitHub..."
print_warning "You'll need to create the repository manually on GitHub:"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Make it PRIVATE"
echo "4. Don't initialize with README (we already have one)"
echo "5. Click 'Create repository'"
echo ""

read -p "Press Enter after creating the repository on GitHub..."

# Add remote origin
print_status "Adding remote origin..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to GitHub
print_status "Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    print_success "Code pushed to GitHub successfully!"
else
    print_error "Failed to push to GitHub. Please check your credentials."
    exit 1
fi

echo ""
print_success "GitHub repository setup complete!"
echo ""

# Northflank deployment instructions
print_status "Next steps for Northflank deployment:"
echo ""
echo "1. 🌐 Go to https://northflank.com"
echo "2. 📝 Sign up with your GitHub account"
echo "3. 🆕 Click 'New Project'"
echo "4. 📦 Name: ai-assistant"
echo "5. ➕ Click 'Add Service' → 'Application'"
echo "6. 🔗 Connect your GitHub repository: $GITHUB_USERNAME/$REPO_NAME"
echo "7. ⚙️ Configure service:"
echo "   - Name: whatsapp-bot"
echo "   - Source: GitHub"
echo "   - Repository: $GITHUB_USERNAME/$REPO_NAME"
echo "   - Branch: main"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "8. 🔐 Add Environment Variables from your .env file:"
echo "   - Copy all variables from your .env file"
echo "   - Add them in Northflank Variables tab"
echo "   - Make sure to include:"
echo "     * SOURCE_NUMBER (your bot number)"
echo "     * TARGET_NUMBER (your personal number)"
echo "     * MONGODB_URI (your database connection)"
echo "     * REDIS_URL (your cache connection)"
echo "     * OPENAI_API_KEY (your AI API key)"
echo ""
echo "9. 🚀 Click 'Deploy'"
echo "10. 📱 Check logs for QR code"
echo "11. 📲 Scan QR code with bot number"
echo ""

print_success "Your AI Assistant will be running 24/7 on Northflank!"
print_warning "⚠️ IMPORTANT: Add your environment variables from .env file in Northflank dashboard"
print_warning "⚠️ Never commit your .env file to Git (it's already in .gitignore)"
echo ""
print_status "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
print_status "Northflank Dashboard: https://app.northflank.com"
echo ""
print_success "Deployment script completed! 🎉" 