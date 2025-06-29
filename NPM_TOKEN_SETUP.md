# NPM Token Setup Guide

## Why NPM Token is Required

The NPM token is essential for:
- **Deployment Authentication**: Many hosting platforms require npm authentication during build
- **Private Packages**: Access to private npm packages (if needed in future)
- **Rate Limiting**: Higher rate limits for authenticated requests
- **Security**: Secure package installation without exposing credentials

## How to Get Your NPM Token

### Step 1: Login to npmjs.com
1. Go to [https://www.npmjs.com/](https://www.npmjs.com/)
2. Sign in to your account (or create one if you don't have it)

### Step 2: Generate Access Token
1. Click on your profile picture → **Access Tokens**
2. Click **Generate New Token**
3. Select **Automation** token type
4. Set expiration (recommend: 90 days for security)
5. Click **Generate Token**

### Step 3: Copy the Token
- **IMPORTANT**: Copy the token immediately - you won't see it again!
- The token looks like: `npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Local Setup

### Option 1: Environment Variable (Recommended)
Add to your `.env` file:
```bash
NPM_TOKEN=npm_your_actual_token_here
```

### Option 2: Direct .npmrc Configuration
Create/update `.npmrc` file in your project root:
```
//registry.npmjs.org/:_authToken=npm_your_actual_token_here
registry=https://registry.npmjs.org/
```

## Deployment Setup

### Render.com
1. Go to your service dashboard
2. Navigate to **Environment** tab
3. Add environment variable:
   - **Key**: `NPM_TOKEN`
   - **Value**: `npm_your_actual_token_here`
4. Mark as **Secret** (recommended)

### Northflank
1. Go to your project dashboard
2. Navigate to **Secrets** section
3. Add new secret:
   - **Name**: `NPM_TOKEN`
   - **Value**: `npm_your_actual_token_here`

### Railway
1. Go to your project dashboard
2. Navigate to **Variables** tab
3. Add variable:
   - **Key**: `NPM_TOKEN`
   - **Value**: `npm_your_actual_token_here`

### Heroku
```bash
heroku config:set NPM_TOKEN=npm_your_actual_token_here
```

## Security Best Practices

### ✅ DO:
- Use **Automation** tokens (not Read-Only)
- Set reasonable expiration dates (30-90 days)
- Store tokens as environment variables
- Use different tokens for different environments
- Rotate tokens regularly

### ❌ DON'T:
- Commit tokens to git repositories
- Share tokens publicly
- Use personal access tokens for automation
- Set very long expiration dates
- Use the same token across multiple projects

## Token Permissions

### Automation Token (Recommended)
- ✅ Read public packages
- ✅ Read private packages (if you have access)
- ✅ Publish packages (if needed)
- ✅ Manage tokens
- ❌ No 2FA bypass

### Read-Only Token
- ✅ Read public packages
- ✅ Read private packages (if you have access)
- ❌ Cannot publish packages
- ❌ Cannot manage tokens

## Troubleshooting

### Common Issues:

1. **"npm ERR! 401 Unauthorized"**
   - Check if token is valid and not expired
   - Verify token is correctly set in environment

2. **"npm ERR! 403 Forbidden"**
   - Token might not have required permissions
   - Check if trying to access private packages without access

3. **Build fails during deployment**
   - Ensure NPM_TOKEN is set in hosting platform
   - Check if token is marked as secret/environment variable

### Verification Commands:
```bash
# Check if token is working
npm whoami

# Test package access
npm view whatsapp-web.js

# Check npm configuration
npm config list
```

## Token Rotation

### When to Rotate:
- Every 30-90 days
- After security incidents
- When team members leave
- When switching hosting platforms

### How to Rotate:
1. Generate new token
2. Update all environment variables
3. Test deployment
4. Delete old token after successful deployment

## Environment-Specific Tokens

### Development
```bash
# .env.development
NPM_TOKEN=npm_dev_token_here
```

### Production
```bash
# .env.production
NPM_TOKEN=npm_prod_token_here
```

### Staging
```bash
# .env.staging
NPM_TOKEN=npm_staging_token_here
```

## Monitoring Token Usage

### Check Token Status:
```bash
# List all tokens
npm token list

# Check token details
npm token list --json
```

### Set Up Alerts:
- Monitor for 401/403 errors in logs
- Set up alerts for token expiration
- Track npm registry usage

## Emergency Procedures

### If Token is Compromised:
1. **Immediately** revoke the token
2. Generate new token
3. Update all environments
4. Check for unauthorized usage
5. Review security logs

### If Build Fails:
1. Check token validity
2. Verify environment variables
3. Test locally with new token
4. Check hosting platform logs
5. Contact support if needed

---

## Quick Setup Checklist

- [ ] Generate npm automation token
- [ ] Add NPM_TOKEN to `.env` file
- [ ] Update `.npmrc` file
- [ ] Set token in hosting platform
- [ ] Test local build
- [ ] Test deployment
- [ ] Set up token rotation reminder
- [ ] Document token management procedures

## Support

If you encounter issues:
1. Check this guide first
2. Review npm documentation
3. Check hosting platform documentation
4. Contact platform support
5. Review project logs for specific errors 