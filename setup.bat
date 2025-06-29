@echo off
REM AI Assistant Windows Setup Script

ECHO 🚀 AI Assistant Windows Setup Script
ECHO ==================================

REM Check for Node.js
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO ❌ Node.js is not installed. Please install Node.js first.
    EXIT /B 1
)

REM Check for npm
where npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO ❌ npm is not installed. Please install npm first.
    EXIT /B 1
)

REM Check for git
where git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO ❌ Git is not installed. Please install Git first.
    EXIT /B 1
)

ECHO ✅ Prerequisites check passed

REM Install dependencies
ECHO 📦 Installing dependencies...
npm install
IF %ERRORLEVEL% NEQ 0 (
    ECHO ❌ Failed to install dependencies
    EXIT /B 1
)
ECHO ✅ Dependencies installed

REM Check if .env exists
IF NOT EXIST .env (
    ECHO 📝 Creating .env file...
    copy .env.example .env >nul
    ECHO ✅ .env file created
    ECHO ⚠️  Please update .env file with your configuration
) ELSE (
    ECHO ✅ .env file already exists
)

REM Check for Railway CLI
where railway >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO 📥 Installing Railway CLI...
    npm install -g @railway/cli
    IF %ERRORLEVEL% NEQ 0 (
        ECHO ❌ Failed to install Railway CLI
        ECHO Please install manually: npm install -g @railway/cli
    ) ELSE (
        ECHO ✅ Railway CLI installed
    )
) ELSE (
    ECHO ✅ Railway CLI already installed
)

REM Git status and commit
IF EXIST .git (
    ECHO 📊 Checking git status...
    git status
    FOR /F "tokens=*" %%i IN ('git status --porcelain') DO SET UNCOMMITTED=1
    IF DEFINED UNCOMMITTED (
        ECHO 📝 Committing changes...
        git add .
        git commit -m "Update AI Assistant with dual-number mode"
    )
    git remote get-url origin >nul 2>nul
    IF %ERRORLEVEL% NEQ 0 (
        ECHO ⚠️  No remote repository found
        ECHO Please create a GitHub repository and add it as remote:
        ECHO git remote add origin <your-repo-url>
    ) ELSE (
        ECHO ✅ Remote repository configured
        ECHO 📤 Pushing to GitHub...
        git push origin main
    )
) ELSE (
    ECHO 📝 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit: AI Assistant with dual-number mode"
    ECHO ⚠️  Please add remote repository:
    ECHO git remote add origin <your-repo-url>
    ECHO git push -u origin main
)

ECHO.
ECHO 🎯 Next Steps:
ECHO ==============
ECHO.
ECHO 🔧 Configuration:
ECHO 1. 📝 Update .env file with your phone numbers:
ECHO    - SOURCE_NUMBER=917742440642 (Bot's WhatsApp number)
ECHO    - TARGET_NUMBER=919899998761 (Your WhatsApp number)
ECHO    - ALLOWED_NUMBERS=919899998761 (Only your number)
ECHO    - SELF_CHAT=false (Dual-number mode)
ECHO    - MONGODB_URI=your-mongodb-uri
ECHO    - REDIS_URL=your-redis-url (optional)
ECHO    - OPENAI_API_KEY=your-openai-key (optional)
ECHO.
ECHO 🚀 Starting the bot:
ECHO 2. Run 'npm start' to start the bot
ECHO 3. Scan QR code with the BOT number (SOURCE_NUMBER)
ECHO 4. Save bot number as 'Love 💕' on your phone
ECHO.
ECHO 🔒 Privacy & Security:
ECHO - Only messages from ALLOWED_NUMBERS are processed
ECHO - Other conversations are completely ignored
ECHO - Bot only reads messages from configured chat
ECHO.
ECHO 🚀 Deploy to Railway (Optional):
ECHO 1. Go to https://railway.app
ECHO 2. Sign in with GitHub
ECHO 3. Create new project
ECHO 4. Select your repository
ECHO 5. Add environment variables
ECHO.
ECHO 📚 For detailed instructions, see DEPLOYMENT_GUIDE.md
ECHO.
ECHO 🎉 Setup complete! Follow the next steps above to configure and start. 