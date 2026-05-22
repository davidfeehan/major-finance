# Local Development Setup Guide

Complete guide to set up Major Finance on your local machine.

---

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **pnpm 8+** - Install with: `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)
- **Supabase Account** - [Sign up here](https://supabase.com/)

---

## Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/davidfeehan/major-finance.git

# Navigate into the project
cd major-finance

# Verify you're on main branch
git branch
```

---

## Step 2: Install Dependencies

```bash
# Install all dependencies with pnpm
pnpm install

# This will install 100+ packages
# Should complete in 1-2 minutes
```

**Expected output:**
```
Packages: +XXX
++++++++++++++++++++++++++++++++++++
Done in XXs
```

---

## Step 3: Set Up Environment Variables

### Create .env.local file:

```bash
# Create environment file
touch .env.local
```

### Add your Supabase credentials:

Open `.env.local` and add:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://yvutsqjujmekchprcvkf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dXRzcWp1am1la2NocHJjdmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MzkxNTMsImV4cCI6MjA3NDIxNTE1M30.huaA_RIoCUcwM3KzUfFEtcmqX3x1LvpKM6Qz7UeWzj8

# Optional: Service Role Key (for server functions)
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**⚠️ Important:**
- `.env.local` is already in `.gitignore` - never commit it!
- The anon key above is safe to expose (it's your existing project)
- Get service role key from: https://supabase.com/dashboard/project/yvutsqjujmekchprcvkf/settings/api

---

## Step 4: Update Import Paths (Important!)

Since this is a Figma Make project, you need to update file imports:

### Option A: Quick Find & Replace (VS Code)

1. Open VS Code: `code .`
2. Press `Ctrl+Shift+H` (Cmd+Shift+H on Mac)
3. Find: `from './utils/supabase/info'`
4. Replace: `from '../utils/supabase/info'`
5. Find: `from '/utils/supabase/info'`
6. Replace: `from './utils/supabase/info'`

### Option B: Manual Updates

The key imports to check:
- `src/app/utils/api.ts` - Supabase info import
- `src/app/components/AuthFlow.tsx` - Supabase client import

---

## Step 5: Set Up Supabase Backend

### Deploy Edge Function (Optional)

If you want the full backend experience:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref yvutsqjujmekchprcvkf

# Deploy the server function
supabase functions deploy server --no-verify-jwt

# Set environment variables for the function
supabase secrets set SUPABASE_URL=https://yvutsqjujmekchprcvkf.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Or Use Demo Mode

The app has a built-in demo mode that works without backend!

---

## Step 6: Run Development Server

**Note:** This is NOT a standard Vite project - it's a Figma Make project.

### For Figma Make Development:
You'll need to continue using Figma Make's preview system.

### For Standard Development:

Create a standard index.html:

```bash
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Major Finance</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
```

Create main.tsx entry point:

```bash
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF
```

Then run:

```bash
# Start development server
pnpm dev

# Or
pnpm vite

# Server will start on http://localhost:5173
```

---

## Step 7: Verify Setup

Open your browser and check:

1. **App loads** - You should see the auth/welcome screen
2. **Console** - Check for errors (should see minimal warnings)
3. **Demo mode** - Try clicking "Enter Demo Mode"
4. **Navigation** - Test screen transitions

### Common Issues:

**"Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**"Supabase connection failed"**
- Check `.env.local` exists
- Verify credentials are correct
- App should still work in demo mode

**"Build errors"**
```bash
# Check Vite config
cat vite.config.ts

# Try building
pnpm build
```

---

## Step 8: Development Workflow

### Daily Workflow:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
pnpm install

# 3. Start dev server
pnpm dev

# 4. Make your changes...

# 5. Test changes
pnpm build  # Check for build errors

# 6. Commit changes
git add .
git commit -m "Your message"
git push origin main
```

### Branch Workflow:

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes...

# Commit and push
git add .
git commit -m "Add feature description"
git push origin feature/your-feature-name

# Create pull request on GitHub
```

---

## Step 9: Recommended VS Code Extensions

Install these for better development experience:

```
1. ESLint - dbaeumer.vscode-eslint
2. Prettier - esbenp.prettier-vscode
3. Tailwind CSS IntelliSense - bradlc.vscode-tailwindcss
4. TypeScript Vue Plugin (Volar) - Vue.vscode-typescript-vue-plugin
5. GitLens - eamodio.gitlens
6. Error Lens - usernamehw.errorlens
```

Install from VS Code:
- Press `Ctrl+Shift+X` (Cmd+Shift+X on Mac)
- Search and install each extension

---

## Step 10: Optional - Database Setup

If you want to run migrations locally:

```bash
# Initialize Supabase locally
supabase init

# Start local Supabase (Docker required)
supabase start

# Apply migrations
supabase db push

# View local database
supabase db studio
```

---

## Folder Structure

```
major-finance/
├── src/
│   ├── app/                    # Main application
│   │   ├── components/        # React components
│   │   ├── contexts/          # Context providers
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilities
│   │   └── constants/         # Constants
│   └── styles/                # Global styles
├── supabase/
│   └── functions/server/      # Edge functions
├── .env.local                 # Environment variables (create this)
├── package.json               # Dependencies
├── vite.config.ts            # Vite configuration
└── README.md                  # Project readme
```

---

## Quick Reference Commands

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Check for errors
pnpm type-check  # If configured

# Update dependencies
pnpm update

# Add new package
pnpm add package-name

# Remove package
pnpm remove package-name
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
pnpm vite --port 3000
```

### pnpm Not Found
```bash
npm install -g pnpm
```

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist .vite
pnpm install
pnpm build
```

### Supabase Errors
- App has offline/demo mode - should still work
- Check Supabase dashboard: https://supabase.com/dashboard
- Verify API keys are correct

---

## Next Steps

1. ✅ Complete this setup guide
2. 📖 Read the main README.md
3. 🎯 Try the developer mode (Settings → Developer)
4. 🚀 Start building features!
5. 📝 Create issues on GitHub for bugs/features

---

## Need Help?

- **GitHub Issues**: https://github.com/davidfeehan/major-finance/issues
- **Supabase Docs**: https://supabase.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

---

**You're all set! Happy coding! 🎉**
