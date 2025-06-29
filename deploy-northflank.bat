@echo off
REM Northflank Deployment Script for AI Assistant (Windows)

echo 🚀 Northflank Deployment Script for AI Assistant
echo ================================================

REM Check if git is installed
where git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /B 1
)

REM Check if Node.js is installed
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /B 1
)

echo ✅ Prerequisites check passed

REM Get repository information
echo.
echo 📝 Setting up GitHub repository...
set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter repository name (default: ai-assistant-bot): "

if "%REPO_NAME%"=="" set REPO_NAME=ai-assistant-bot

echo.
echo 🔧 Updating configuration files...

REM Update package.json (using PowerShell for sed-like functionality)
powershell -Command "(Get-Content package.json) -replace 'yourusername', '%GITHUB_USERNAME%' | Set-Content package.json"
powershell -Command "(Get-Content package.json) -replace 'ai-assistant-bot', '%REPO_NAME%' | Set-Content package.json"

REM Update northflank.yaml
powershell -Command "(Get-Content northflank.yaml) -replace 'yourusername', '%GITHUB_USERNAME%' | Set-Content northflank.yaml"
powershell -Command "(Get-Content northflank.yaml) -replace 'ai-assistant-bot', '%REPO_NAME%' | Set-Content northflank.yaml"

REM Initialize git repository if not already done
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo 📁 Git repository already exists
)

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Initial commit: AI Assistant WhatsApp Bot with dual-number support"

REM Instructions for creating GitHub repository
echo.
echo 📋 Creating private repository on GitHub...
echo ⚠️ You need to create the repository manually on GitHub:
echo.
echo 1. Go to https://github.com/new
echo 2. Repository name: %REPO_NAME%
echo 3. Make it PRIVATE
echo 4. Don't initialize with README (we already have one)
echo 5. Click 'Create repository'
echo.
pause

REM Add remote origin
echo 🔗 Adding remote origin...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

REM Push to GitHub
echo 📤 Pushing to GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo ✅ Code pushed to GitHub successfully!
) else (
    echo ❌ Failed to push to GitHub. Please check your credentials.
    pause
    exit /B 1
)

echo.
echo ✅ GitHub repository setup complete!
echo.

REM Northflank deployment instructions
echo 📋 Next steps for Northflank deployment:
echo.
echo 1. 🌐 Go to https://northflank.com
echo 2. 📝 Sign up with your GitHub account
echo 3. 🆕 Click 'New Project'
echo 4. 📦 Name: ai-assistant
echo 5. ➕ Click 'Add Service' → 'Application'
echo 6. 🔗 Connect your GitHub repository: %GITHUB_USERNAME%/%REPO_NAME%
echo 7. ⚙️ Configure service:
echo    - Name: whatsapp-bot
echo    - Source: GitHub
echo    - Repository: %GITHUB_USERNAME%/%REPO_NAME%
echo    - Branch: main
echo    - Build Command: npm install
echo    - Start Command: npm start
echo.
echo 8. 🔐 Add Environment Variables:
echo    - SOURCE_NUMBER=917742440642
echo    - TARGET_NUMBER=919899998761
echo    - SELF_CHAT=false
echo    - ALLOWED_NUMBERS=919899998761
echo    - MONGODB_URI=your-mongodb-uri
echo    - REDIS_URL=your-redis-url
echo    - OPENAI_API_KEY=your-openai-key
echo    - TIMEZONE=Asia/Kolkata
echo    - BOT_NAME=Love
echo    - BOT_STATUS=Your forever love 💕
echo    - BOT_ABOUT=Always here to love and care for you
echo    - VOICE_MESSAGES_ENABLED=false
echo    - DEBUG_MODE=false
echo    - NODE_ENV=production
echo.
echo 9. 🚀 Click 'Deploy'
echo 10. 📱 Check logs for QR code
echo 11. 📲 Scan QR code with bot number (917742440642)
echo.

echo ✅ Your AI Assistant will be running 24/7 on Northflank!
echo ⚠️ Remember to add your environment variables in Northflank dashboard
echo.
echo 📁 Repository URL: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo 🌐 Northflank Dashboard: https://app.northflank.com
echo.
echo 🎉 Deployment script completed!
pause 