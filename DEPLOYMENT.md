# Deployment Guide

## Frontend Deployment on Netlify

The frontend is configured for Netlify deployment with the `netlify.toml` file.

### Steps to Deploy:

1. **Push code to GitHub** (Already done ✅)

2. **Update Netlify Build Settings:**
   - Go to your Netlify dashboard
   - Navigate to Site Settings → Build & Deploy
   - Set the following:
     - **Base directory:** `frontend`
     - **Build command:** `npm run build`
     - **Publish directory:** `frontend/dist`

3. **Trigger a new deployment:**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

## Backend Deployment Options

Since Netlify is for static sites, you need to deploy the backend separately. Choose one:

### Option 1: Railway (Recommended - Free tier available)

1. Go to [railway.app](https://railway.app)
2. Sign up and create a new project
3. Connect your GitHub repository
4. Add a new service and select the `backend` folder
5. Railway will auto-detect Node.js and deploy
6. Note the deployed URL (e.g., `https://your-backend.railway.app`)

### Option 2: Render (Free tier available)

1. Go to [render.com](https://render.com)
2. Sign up and create a new Web Service
3. Connect your GitHub repository
4. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Deploy and get the URL

### Option 3: Heroku

1. Install Heroku CLI
2. In the `backend` directory:
```bash
heroku create your-app-name
git subtree push --prefix backend heroku main
```

## Important: Update Frontend API URLs

After deploying the backend, you need to update the frontend to use your deployed backend URL.

### For Development:
- Update `frontend/vite.config.js` - proxy is already set for localhost:5000

### For Production:
You have two options:

**Option A: Update Netlify Environment Variables**
1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add: `VITE_API_URL=https://your-backend-url.com`
3. Then update all API calls in the frontend to use `import.meta.env.VITE_API_URL`

**Option B: Quick Fix - Update Vite Config**
Update `frontend/vite.config.js` to include production API:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

## Current Status

✅ Frontend: Pushed to GitHub, needs Netlify configuration update
⏳ Backend: Needs to be deployed to Railway/Render/Heroku
⏳ API Integration: Needs to be updated after backend deployment

## Quick Deploy Checklist

- [ ] Configure Netlify build settings (base dir: `frontend`)
- [ ] Redeploy on Netlify
- [ ] Deploy backend to Railway/Render
- [ ] Update frontend API URLs
- [ ] Test the full application

## Need Help?

If you're getting 404 errors:
1. Check Netlify build logs for errors
2. Verify the build command ran successfully
3. Ensure the publish directory is correctly set
4. Check that the base directory is set to `frontend`

If API calls are failing:
1. Verify the backend is deployed and running
2. Check CORS is enabled (already done ✅)
3. Update the API URL in the frontend

