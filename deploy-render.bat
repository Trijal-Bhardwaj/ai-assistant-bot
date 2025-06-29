@echo off
chcp 65001 >nul
echo 🚀 Render Deployment Script
echo ==========================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Error: Git repository not found!
    echo Please initialize git and push your code to GitHub first:
    echo   git init
    echo   git add .
    echo   git commit -m "Initial commit"
    echo   git remote add origin ^<your-github-repo-url^>
    echo   git push -u origin main
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ❌ Error: .env file not found!
    echo Please create your .env file first:
    echo   copy .env.example .env
    echo   # Edit .env with your configuration
    pause
    exit /b 1
)

REM Check if .npmrc file exists
if not exist ".npmrc" (
    echo ❌ Error: .npmrc file not found!
    echo Please create your .npmrc file first:
    echo   copy .npmrc.example .npmrc
    echo   # Edit .npmrc with your npm configuration
    pause
    exit /b 1
)

REM Check if render.yaml exists
if not exist "render.yaml" (
    echo ❌ Error: render.yaml not found!
    echo Please ensure render.yaml is in your repository
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Check git status
echo.
echo 📋 Checking git status...
git status --porcelain

if %errorlevel% equ 0 (
    echo.
    echo ⚠️  You have uncommitted changes!
    set /p commit_changes="Do you want to commit and push changes? (y/n): "
    if /i "%commit_changes%"=="y" (
        echo 📝 Committing changes...
        git add .
        git commit -m "Update for Render deployment"
        echo 📤 Pushing to GitHub...
        git push
    ) else (
        echo ❌ Please commit and push your changes before deploying
        pause
        exit /b 1
    )
)

echo.
echo 🎯 Render Deployment Steps:
echo ==========================
echo.
echo 1. 📱 Go to https://dashboard.render.com
echo 2. 🔗 Click 'New +' and select 'Blueprint'
echo 3. 📂 Connect your GitHub account
echo 4. 🏗️  Select your repository
echo 5. ⚙️  Configure environment variables:
echo.
echo    Required Environment Variables:
echo    - NODE_ENV=production
echo    - MONGODB_URI=your_mongodb_connection_string
echo    - REDIS_URL=your_redis_connection_string
echo    - BOT_NUMBER=your_bot_whatsapp_number
echo    - USER_NUMBER=your_user_whatsapp_number
echo    - ALLOWED_NUMBERS=your_bot_number,your_user_number
echo    - NPM_TOKEN=your_npm_token
echo.
echo    Optional Environment Variables:
echo    - LOG_LEVEL=info
echo    - PORT=3000
echo.
echo 6. 🗄️  Set up databases:
echo    - MongoDB: Use MongoDB Atlas (free tier)
echo    - Redis: Use Render's Redis service (free tier)
echo.
echo 7. 🚀 Click 'Create Blueprint' to deploy
echo.
echo 📖 For detailed instructions, see: RENDER_DEPLOYMENT.md
echo.
echo ⚠️  Important Notes:
echo - Render free tier sleeps after 15 minutes of inactivity
echo - First request after sleep takes 30-60 seconds to wake up
echo - Consider upgrading to paid plan for 24/7 operation
echo.
echo 🔗 Your bot will be available at: https://your-app-name.onrender.com
echo.
echo ✅ Deployment script completed!
pause 