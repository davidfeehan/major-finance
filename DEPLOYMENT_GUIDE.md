# Deployment Guide for Major Finance

## Current Status

- ✅ Local Git repository initialized
- ✅ GitHub repository created: https://github.com/davidfeehan/major-finance
- ✅ 2 commits ready to push (245 files total)
- ⏳ Waiting for authentication to push to GitHub

## Quick Deploy (Recommended)

### Option 1: Using GitHub CLI

```bash
# Install GitHub CLI if needed (macOS)
brew install gh

# Or for Linux
sudo apt install gh

# Authenticate
gh auth login

# Push all commits
git push -u origin main

# Verify
git status
```

### Option 2: Using Personal Access Token

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scope: `repo` (Full control of private repositories)
   - Generate and copy the token

2. **Configure Git:**
   ```bash
   # Set up credential helper (optional, for convenience)
   git config --global credential.helper store
   
   # Push to GitHub (you'll be prompted for username and token)
   git push -u origin main
   # Username: davidfeehan
   # Password: <paste-your-token>
   ```

### Option 3: Using SSH Key

```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/keys

# Update remote URL
git remote set-url origin git@github.com:davidfeehan/major-finance.git

# Push
git push -u origin main
```

## What Will Be Pushed

### Commits Ready:
1. **a235fd1** - Initial commit (245 files)
   - Complete Supabase backend integration
   - All React components and UI
   - Fixed package import errors
   - RBAC system
   - Demo mode functionality

2. **cfb37cb** - README documentation

### File Structure:
```
major-finance/
├── src/app/                  # Main application (150+ files)
│   ├── components/          # React components
│   ├── contexts/            # Context providers
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilities
│   └── constants/           # App constants
├── supabase/                # Backend (2 files)
│   └── functions/server/
│       ├── index.tsx        # API routes
│       └── kv_store.tsx     # KV store utilities
├── src/styles/              # Global styles (6 files)
├── package.json             # Dependencies
├── vite.config.ts          # Build config
└── README.md               # Documentation
```

## Verify Deployment

After pushing, verify at:
- Repository: https://github.com/davidfeehan/major-finance
- Files: Check all 245 files are present
- Backend: Review `/supabase/functions/server/` folder

## Next Steps After Push

1. **Set up Supabase Secrets** (if deploying functions):
   ```bash
   # Using Supabase CLI
   supabase secrets set SUPABASE_URL=your-url
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-key
   ```

2. **Configure Repository Settings:**
   - Add description
   - Add topics: `react`, `typescript`, `supabase`, `tailwindcss`, `military`, `finance`
   - Enable GitHub Actions (if needed)

3. **Update Environment:**
   - Create `.env.local` with Supabase credentials
   - Never commit `.env.local` (already in .gitignore)

## Troubleshooting

### "Authentication failed"
- Verify your token has `repo` scope
- Check token hasn't expired
- Try regenerating token

### "Remote rejected"
- Check repository permissions
- Verify you're the owner/collaborator

### "Large files"
- All files should be under 100MB
- Check with: `find . -type f -size +50M`

## Support

If you encounter issues:
1. Check GitHub's status: https://www.githubstatus.com/
2. Review git logs: `git log --oneline`
3. Check remote: `git remote -v`
