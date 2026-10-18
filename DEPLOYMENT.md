# Deployment Guide for Hayasinth M's Portfolio

This guide details step-by-step instructions for deploying your portfolio to **Vercel** (recommended), as well as **Netlify** and **Render**.

---

## 1. Deploying to Vercel (Recommended Full-Stack)

Vercel provides free, high-speed global hosting for your portfolio's **Vite React Frontend** (via CDN) and the **Node.js REST API Backend** (via Vercel Serverless Functions).

### How it is configured:
- **`vercel.json`**: Directs all `/api/*` traffic to `api/index.js` (Serverless Function) and all frontend routes to `client/dist/index.html`.
- **`api/index.js`**: Serverless function entry point serving all REST API routes (`/api/projects`, `/api/skills`, `/api/stats`, `/api/health`, `/api/contact`).
- **`client/dist`**: Production-ready static bundle containing all responsive UI components, canvas particle engines, and project assets.

---

### Method A: Deploy via GitHub & Vercel Dashboard (Easiest)

1. **Commit and push your changes to GitHub**:
   ```bash
   git add .
   git commit -m "Configure project for Vercel deployment"
   git push origin main
   ```
   *(If you haven't connected a remote repo yet, create one on [GitHub](https://github.com/new) and run):*
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/My_Portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Open Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in (or sign up with your GitHub account).
   - Click **"Add New..."** -> **"Project"**.

3. **Import your repository**:
   - Select `My_Portfolio` from your GitHub repositories list.

4. **Verify Project Settings**:
   - **Framework Preset**: `Other` (or `Vite`)
   - **Root Directory**: `./` (leave blank / default)
   - **Build Command**: `npm run build` *(auto-detected from `vercel.json`)*
   - **Output Directory**: `client/dist` *(auto-detected from `vercel.json`)*

5. **Click "Deploy"**:
   - Vercel will install dependencies, build the frontend, deploy the `/api` serverless function, and assign you a live production URL:
   - Example: `https://my-portfolio-hayasinth.vercel.app`

---

### Method B: Deploy via Vercel CLI (Direct from Terminal)

If you prefer deploying directly from your computer without GitHub:

1. Open PowerShell or Command Prompt in this project root:
   ```bash
   cd c:\Users\hayas\OneDrive\Desktop\My_Portfolio
   ```

2. Run the Vercel CLI tool:
   ```bash
   npx vercel
   ```

3. Follow the on-screen prompts:
   - `Set up and deploy?` -> **Y**
   - `Which scope do you want to deploy to?` -> Select your account
   - `Link to existing project?` -> **N**
   - `What's your project's name?` -> `hayasinth-portfolio`
   - `In which directory is your code located?` -> `./` (Press Enter)
   - `Want to modify these settings?` -> **N** *(Vercel reads `vercel.json` automatically)*

4. To deploy directly to production with custom domain / main URL:
   ```bash
   npx vercel --prod
   ```

---

## 2. Testing Your Vercel Deployment

Once deployed, you can verify your live website:

| URL Path | Expected Result |
| :--- | :--- |
| `https://YOUR-APP.vercel.app/` | Portfolio home page with 3D Canvas animations |
| `https://YOUR-APP.vercel.app/api/health` | Returns `{ "status": "OK", "developer": "Hayasinth M" }` |
| `https://YOUR-APP.vercel.app/api/projects` | Returns complete list of projects in JSON |
| `https://YOUR-APP.vercel.app/api/skills` | Returns list of developer skills |
| `https://YOUR-APP.vercel.app/api/stats` | Returns college and project statistics |

---

## 3. Alternative Hosting Options

### Netlify (Static Frontend)
- **Build command**: `cd client && npm install && npm run build`
- **Publish directory**: `client/dist`

### Render (Traditional Node.js Server)
- **Build command**: `npm install && cd client && npm install && npm run build`
- **Start command**: `node server/server.js`
- **Environment variables**: `PORT=5000`, `NODE_ENV=production`
