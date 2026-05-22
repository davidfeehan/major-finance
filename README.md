# Major Finance

A gamified military retirement planning application designed to help service members achieve financial readiness through engaging missions and comprehensive education.

## Features

- 🎮 **Gamified Learning**: Complete financial missions to earn XP and level up
- 🎯 **Military-Focused**: Tailored specifically for military retirement planning
- 🔐 **Secure Backend**: Powered by Supabase with Role-Based Access Control (RBAC)
- 📊 **Comprehensive Tools**: Retirement calculators, budget tracking, and investment education
- 💡 **AI Assistance**: Built-in AI chatbot for financial guidance
- 🌐 **Offline Support**: Graceful degradation with demo mode for offline use

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context API
- **Charts**: Recharts
- **Authentication**: Supabase Auth with social login support

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Supabase account (for backend)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Create .env.local with your Supabase credentials
# SUPABASE_URL=your-project-url
# SUPABASE_ANON_KEY=your-anon-key

# Run development server
# Note: This is a Figma Make project - use Figma Make preview
```

## Project Structure

```
├── src/app/                    # Main application code
│   ├── components/            # React components
│   ├── contexts/              # Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   └── constants/             # App constants and data
├── supabase/                  # Supabase backend
│   └── functions/server/      # Edge functions (Hono API)
└── src/styles/                # Global styles and themes
```

## Key Features

### Financial Missions
- Emergency Fund Planning
- TSP (Thrift Savings Plan) Education
- Investment Fundamentals
- Budget Management
- Debt Management
- VA Benefits Overview
- Asset Allocation Strategies
- Market Analysis

### Backend API Endpoints
- `/signup` - User registration
- `/profile` - Profile management
- `/progress` - XP and mission tracking
- `/retirement-plan` - Retirement planning data
- `/calculator-state` - Calculator state persistence
- `/accounts` - Banking/accounts management
- `/settings` - User preferences

### Developer Features
- **Banking Toggle**: Hide/show banking features in settings
- **Demo Mode**: Full offline functionality with mock data
- **Developer Console**: Debug utilities and data inspection

## Security

- Row Level Security (RLS) policies on all database tables
- Service role key protected server-side operations
- Secure authentication with auto-refresh tokens
- Audit logging for admin actions

## Contributing

This is a Figma Make project. Development should be done through the Figma Make interface.

## License

Proprietary - All rights reserved

## Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for military service members
