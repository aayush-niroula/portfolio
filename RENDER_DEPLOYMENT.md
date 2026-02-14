# Deployment Guide for Render

This guide covers deploying your portfolio to Render.com with separate frontend and backend services.

## Prerequisites

1. A [Render account](https://render.com/)
2. Your code pushed to GitHub/GitLab/Bitbucket

## Architecture

- **Database**: Neon PostgreSQL (already configured)
- **Backend**: Express.js API on Render Web Service
- **Frontend**: React static site on Render

## Deployment Steps

### Step 1: Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### Step 2: Create Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub/GitLab repository
4. Configure the service:
   - **Name**: `portfolio-backend`
   - **Region**: Oregon (or closest to you)
   - **Branch**: main
   - **Build Command**: `cd backend && npm run build && npx prisma generate`
   - **Start Command**: `cd backend && npm run start`
   - **Plan**: Free (or paid for more resources)

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: Your Neon PostgreSQL connection string (from backend/.env)
   - `JWT_SECRET`: A strong random string (generate at least 32 characters)
   - `SUPERADMIN_EMAIL`: `admin@portfolio.com`
   - `SUPERADMIN_PASSWORD`: Your admin password
   - `FRONTEND_URL`: `https://your-frontend.onrender.com` (update after frontend deployment)

6. Click "Create Web Service"

### Step 3: Create Frontend Static Site

1. After backend is deployed, go to Render Dashboard
2. Click "New +" and select "Static Site"
3. Connect your GitHub/GitLab repository
4. Configure the service:
   - **Name**: `portfolio-frontend`
   - **Region**: Oregon
   - **Branch**: main
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: `https://your-backend.onrender.com` (use your actual backend URL)

6. Click "Create Static Site"

### Step 4: Update Environment Variables

After deploying both services:

1. Update Backend's `FRONTEND_URL` to your frontend's URL
2. Update Frontend's `VITE_API_URL` to your backend's URL
3. Redeploy both services to apply the changes

### Step 5: Verify Deployment

1. Visit your frontend URL
2. Test the contact form
3. Access admin panel at `/admin`
4. Upload a resume in the admin dashboard

## Troubleshooting

### CORS Errors
If you see CORS errors, ensure:
- `FRONTEND_URL` is set correctly in backend environment variables
- Backend is redeployed after changing environment variables

### 500 Errors
- Check Render logs for detailed error messages
- Ensure `DATABASE_URL` is correct
- Verify `JWT_SECRET` is set

### Static Files Not Loading
- Ensure uploads directory is properly mounted
- Check that the backend is serving static files correctly

## Environment Variables Reference

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=5000
SUPERADMIN_EMAIL=admin@portfolio.com
SUPERADMIN_PASSWORD=your-password
FRONTEND_URL=https://your-frontend.onrender.com
NODE_ENV=production
```

### Frontend
```
VITE_API_URL=https://your-backend.onrender.com
```
