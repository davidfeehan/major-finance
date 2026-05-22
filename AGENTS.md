# AGENTS.md

## Cursor Cloud specific instructions

### Repository State

This repository currently contains **no runnable source code** — only `README.md` and `.gitignore`. The commit message references a full application (React + Supabase), but only documentation files were committed. The README states: *"This is a Figma Make project. Development should be done through the Figma Make interface."*

### Prerequisites (already available in the Cloud VM)

- **Node.js 18+** (v22 installed via nvm)
- **pnpm 8+** (v10 installed)

### What cannot be done until source code is committed

- `pnpm install` — no `package.json` exists
- `pnpm dev` / build / lint / test — no application code exists
- Supabase integration — no `supabase/` directory or edge functions exist

### Environment Variables (per README, for when code is added)

A `.env.local` file will be needed with:
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — Supabase anonymous key

### Update Script

The update script guards `pnpm install` behind a `package.json` existence check, so it is safe to run even while the repo has no code.
