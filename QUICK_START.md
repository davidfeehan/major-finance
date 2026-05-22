# 🚀 Quick Start Guide

Get up and running with Major Finance in 5 minutes!

---

## One-Command Setup

```bash
# Clone the repository
git clone https://github.com/davidfeehan/major-finance.git
cd major-finance

# Run automated setup (macOS/Linux)
./setup-local-dev.sh

# Start development
pnpm dev
```

That's it! Open http://localhost:5173

---

## Manual Setup (Windows or if script fails)

```bash
# 1. Clone repository
git clone https://github.com/davidfeehan/major-finance.git
cd major-finance

# 2. Install dependencies
pnpm install

# 3. Create .env.local file
# Copy from .env.example or use the credentials in LOCAL_DEVELOPMENT_SETUP.md

# 4. Start dev server
pnpm dev
```

---

## Essential Commands

```bash
# Development
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Build for production
pnpm preview      # Preview production build

# Git
git pull          # Get latest changes
git status        # Check status
git add .         # Stage all changes
git commit -m ""  # Commit changes
git push          # Push to GitHub

# Dependencies
pnpm add pkg      # Add package
pnpm remove pkg   # Remove package
pnpm update       # Update packages
```

---

## Key Files to Know

```
src/app/App.tsx              # Main app component
src/app/components/          # All React components
src/app/utils/supabase/      # Supabase configuration
supabase/functions/server/   # Backend API
.env.local                   # Your environment variables (create this)
```

---

## Important Links

- **Repository**: https://github.com/davidfeehan/major-finance
- **Supabase Dashboard**: https://supabase.com/dashboard/project/yvutsqjujmekchprcvkf
- **Live Preview**: (Deploy to Vercel/Netlify for live URL)

---

## Developer Mode

The app has a built-in developer mode:

1. Open the app
2. Go to Settings
3. Enable "Developer Mode"
4. Access developer tools and data inspection

---

## Demo Mode

Try the app without backend setup:

1. Click "Enter Demo Mode" on auth screen
2. Use demo token: `demo-token-offline-mode`
3. All features work with mock data

---

## Need Help?

1. **Full Setup Guide**: See `LOCAL_DEVELOPMENT_SETUP.md`
2. **Deployment Guide**: See `DEPLOYMENT_GUIDE.md`
3. **GitHub Issues**: https://github.com/davidfeehan/major-finance/issues
4. **Supabase Docs**: https://supabase.com/docs

---

## Project Structure

```
major-finance/
├── src/app/              # Frontend application
│   ├── components/       # 60+ React components
│   ├── contexts/         # Context providers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── constants/       # App constants
├── supabase/
│   └── functions/server/ # Backend API (Hono)
├── src/styles/          # Global styles (Tailwind v4)
└── docs/                # Documentation
```

---

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS v4
- **Backend**: Supabase + Hono Edge Functions
- **UI**: Radix UI + shadcn/ui components
- **Build**: Vite
- **State**: React Context API
- **Charts**: Recharts

---

## Features

✅ 15+ Financial Education Missions  
✅ Gamified XP & Leveling System  
✅ Admin Dashboard with RBAC  
✅ AI Chatbot Integration  
✅ Offline/Demo Mode  
✅ Developer Settings Panel  
✅ Responsive Design  
✅ Dark Mode Support  

---

**Ready to build? Run `pnpm dev` and start coding! 🎉**
