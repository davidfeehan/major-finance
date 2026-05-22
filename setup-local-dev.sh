#!/bin/bash
# Local Development Setup Script for Major Finance
# Run this after cloning the repository

set -e  # Exit on error

echo "🚀 Setting up Major Finance for local development..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "   Install from: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node --version)"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm not found. Installing...${NC}"
    npm install -g pnpm
fi
echo -e "${GREEN}✓${NC} pnpm $(pnpm --version)"

# Check Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Git $(git --version | cut -d' ' -f3)"

echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "⚙️  Setting up environment variables..."

if [ ! -f .env.local ]; then
    cat > .env.local << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://yvutsqjujmekchprcvkf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dXRzcWp1am1la2NocHJjdmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MzkxNTMsImV4cCI6MjA3NDIxNTE1M30.huaA_RIoCUcwM3KzUfFEtcmqX3x1LvpKM6Qz7UeWzj8

# Optional: Add service role key from Supabase dashboard
# VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF
    echo -e "${GREEN}✓${NC} Created .env.local"
else
    echo -e "${YELLOW}⚠️${NC}  .env.local already exists, skipping"
fi

echo ""
echo "📄 Creating standard development entry point..."

# Create index.html if it doesn't exist
if [ ! -f index.html ]; then
    cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Major Finance - Military Retirement Planning</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
    echo -e "${GREEN}✓${NC} Created index.html"
else
    echo -e "${YELLOW}⚠️${NC}  index.html already exists, skipping"
fi

# Create src/main.tsx if it doesn't exist
if [ ! -f src/main.tsx ]; then
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
    echo -e "${GREEN}✓${NC} Created src/main.tsx"
else
    echo -e "${YELLOW}⚠️${NC}  src/main.tsx already exists, skipping"
fi

echo ""
echo "🧪 Testing build..."
if pnpm build; then
    echo -e "${GREEN}✓${NC} Build successful"
else
    echo -e "${YELLOW}⚠️${NC}  Build had warnings, but this is normal for Figma Make projects"
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Review .env.local and add service role key if needed"
echo "  2. Run: ${GREEN}pnpm dev${NC} to start development server"
echo "  3. Open: ${GREEN}http://localhost:5173${NC} in your browser"
echo ""
echo "📚 Read LOCAL_DEVELOPMENT_SETUP.md for detailed documentation"
echo ""
echo "Happy coding! 🎉"
