# Render Deployment Guide

This guide will help you deploy your WhatsApp bot to Render, a cloud platform that offers free hosting with some limitations.

## Prerequisites

1. A GitHub account with your bot code pushed to a repository
2. A Render account (sign up at https://render.com)
3. Your `.env` file with all required environment variables

## Step 1: Prepare Your Repository

Ensure your repository contains:
- `render.yaml` (deployment configuration)
- `Dockerfile` (container configuration)
- `package.json` (Node.js dependencies)
- All your bot source code

## Step 2: Connect to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Blueprint"
3. Connect your GitHub account if not already connected
4. Select your repository containing the bot code

## Step 3: Configure Deployment

1. **Service Name**: `vibe-coding-bot` (or your preferred name)
2. **Environment**: Docker
3. **Region**: Choose closest to you (Oregon recommended for US)
4. **Branch**: `main` (or your default branch)
5. **Root Directory**: Leave empty (if bot is in root)
6. **Build Command**: `docker build -t vibe-coding-bot .`
7. **Start Command**: `docker run -p $PORT:3000 vibe-coding-bot`

## Step 4: Set Environment Variables

In the Render dashboard, go to your service and add these environment variables:

### Required Variables
```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
BOT_NUMBER=your_bot_whatsapp_number
USER_NUMBER=your_user_whatsapp_number
ALLOWED_NUMBERS=your_bot_number,your_user_number
NPM_TOKEN=your_npm_token
```

### Optional Variables
```
LOG_LEVEL=info
PORT=3000
```

## Step 5: Configure Databases

### MongoDB Setup
1. In Render dashboard, go to "New +" → "PostgreSQL" (Render doesn't have MongoDB)
2. **Alternative**: Use MongoDB Atlas (free tier available)
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Get connection string
   - Add to `MONGODB_URI` environment variable

### Redis Setup
1. In Render dashboard, go to "New +" → "Redis"
2. Choose "Starter" plan (free)
3. Select region
4. Copy the Redis URL to your `REDIS_URL` environment variable

## Step 6: Deploy

1. Click "Create Blueprint"
2. Render will automatically:
   - Build your Docker container
   - Set up databases
   - Deploy your application
   - Provide a public URL

## Step 7: Configure WhatsApp

1. Your bot will be available at: `https://your-app-name.onrender.com`
2. The bot will start and show QR code in logs
3. Scan QR code with your bot number
4. Bot will be ready to send scheduled messages

## Step 8: Monitor and Maintain

### View Logs
- Go to your service in Render dashboard
- Click "Logs" tab
- Monitor for any errors or issues

### Health Check
- Your bot includes a health check endpoint: `/health`
- Render will monitor this automatically
- If health check fails, Render will restart your service

## Render Free Tier Limitations

### Web Services
- **Sleep after 15 minutes** of inactivity
- **512 MB RAM** maximum
- **0.1 CPU** cores
- **750 hours/month** (about 31 days)

### Redis
- **25 MB** storage
- **No sleep** (always available)

### PostgreSQL (if using instead of MongoDB)
- **1 GB** storage
- **No sleep** (always available)

## Important Notes

### Sleep Behavior
- Your bot will sleep after 15 minutes of inactivity
- First request after sleep will take 30-60 seconds to wake up
- This affects message delivery timing
- Consider upgrading to paid plan for 24/7 operation

### Environment Variables
- Never commit sensitive data to your repository
- Use Render's environment variable system
- All variables marked `sync: false` in `render.yaml` must be set manually

### Scaling
- Free tier: 1 instance maximum
- Paid plans: Auto-scaling available
- Consider paid plan for production use

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Dockerfile syntax
   - Verify all files are in repository
   - Check build logs in Render dashboard

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify connection strings are correct

3. **Database Connection**
   - Test MongoDB/Redis connection strings locally
   - Ensure IP allowlist includes Render's IPs
   - Check database credentials

4. **WhatsApp Connection**
   - Monitor logs for QR code
   - Ensure bot number is correct
   - Check for authentication errors

### Getting Help

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Check your service logs for detailed error messages

## Cost Comparison

| Platform | Free Tier | Paid Plans | 24/7 Operation |
|----------|-----------|------------|----------------|
| Render   | Yes (sleeps) | $7/month | Yes |
| Northflank | Yes (sleeps) | $5/month | Yes |
| Railway  | No longer free | $5/month | Yes |
| Fly.io   | Yes (limited) | $1.94/month | Yes |

## Next Steps

1. **Test your deployment** thoroughly
2. **Monitor logs** for the first few days
3. **Set up alerts** for any issues
4. **Consider upgrading** to paid plan for production use
5. **Backup your data** regularly

Your WhatsApp bot should now be running on Render! 🚀 