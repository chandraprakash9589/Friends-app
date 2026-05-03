<h1 align="center">✨ Friends Chat & Video Calling App ✨</h1>

![Demo App]()

## Highlights

- 🌐 Real-time Messaging with Typing Indicators & Reactions
- 📹 1-on-1 and Group Video Calls with Screen Sharing & Recording
- 🔐 JWT Authentication & Protected Routes
- 🌍 Language Exchange Platform with 32 Unique UI Themes
- ⚡ Tech Stack: React + Express + MongoDB + TailwindCSS + TanStack Query
- 🧠 Global State Management with Zustand
- 🚨 Error Handling (Frontend & Backend)
- 🚀 Free Deployment (Render + Vercel)
- 🎯 Built with Scalable Technologies like Stream Chat
- ⏳ And much more!

---

## 🧪 .env Setup

### Backend (`/backend`)

```
PORT=5001
MONGO_URI=your_mongo_uri
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

> Get Stream API keys from: https://getstream.io/dashboard

### Frontend (`/frontend`)

```
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=your_render_backend_url
```

---

## 🔧 Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> ⚠️ Requires Node.js v20 LTS. Node.js v25 has known DNS and package compatibility issues.

---

## 🚀 Deployment

### Backend → Render

1. Create account at [render.com](https://render.com)
2. New Web Service → connect GitHub repo
3. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
4. Add all backend environment variables in Render dashboard
5. Set `FRONTEND_URL` to your Vercel frontend URL after deploying frontend

### Frontend → Vercel

1. Create account at [vercel.com](https://vercel.com)
2. New Project → connect GitHub repo
3. Settings:
   - Root Directory: `frontend`
   - Framework Preset: Vite
4. Add `VITE_STREAM_API_KEY` in environment variables
5. Deploy
