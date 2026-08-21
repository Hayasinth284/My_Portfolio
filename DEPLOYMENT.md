# Deployment Guide for Hayasinth M's Portfolio

This guide details step-by-step instructions for deploying your portfolio to **Vercel**, **Netlify**, **Heroku**, or **Render**.

---

## 1. Option A: Vercel (Recommended Full-Stack)

Vercel provides free, instant deployment for both the React frontend and Express serverless backend.

### Steps:
1. Push your project repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/YOUR_USERNAME/My_Portfolio.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository `My_Portfolio`.
4. Vercel automatically detects `vercel.json` and builds both frontend and serverless API endpoints.
5. Click **Deploy**. Your site will be live at `https://my-portfolio-xxx.vercel.app`.

---

## 2. Option B: Netlify (Frontend + API Proxy)

Netlify is ideal for hosting the static React SPA frontend.

### Steps:
1. Push code to GitHub.
2. Sign into [Netlify](https://netlify.com) and click **"Add new site" -> "Import from Git"**.
3. Select your repository.
4. Set **Build command**: `cd client && npm install && npm run build`
5. Set **Publish directory**: `client/dist`
6. Click **Deploy Site**.

---

## 3. Option C: Render / Heroku (Full-Stack Express Node Server)

To run the Node.js Express server with SQLite database persistent hosting:

### Steps on Render (Free tier):
1. Go to [Render Dashboard](https://render.com) and select **"New Web Service"**.
2. Connect your GitHub repository.
3. Set **Environment**: `Node`
4. Set **Build Command**: `npm install && cd client && npm install && npm run build`
5. Set **Start Command**: `node server/server.js`
6. Set Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
7. Click **Create Web Service**. Your app will be running live!

---

## 4. Database Deployment Notes

- **SQLite (Default)**: Embedded database stored in `server/portfolio.sqlite`. It runs automatically out-of-the-box on local dev, Render, and Heroku.
- **PostgreSQL / MySQL / MongoDB**: To use PostgreSQL (e.g. Supabase / ElephantSQL) or MongoDB Atlas, simply set `DATABASE_URL` in your environment variables.
