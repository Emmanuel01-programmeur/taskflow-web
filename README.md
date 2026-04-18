# Ks-TaskFlow

Application de gestion de projets et tâches fullstack.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth)
- Zustand

## Démarrage

1. Clone le repo
2. Copie `.env.example` → `.env.local` et remplis les valeurs
3. Lance `pnpm install`
4. Lance `pnpm dev`

## Structure
\`\`\`
src/
├── app/          # Pages et routes
├── components/   # Composants réutilisables
├── hooks/        # Logique réutilisable
├── store/        # État global Zustand
├── types/        # Types TypeScript
└── lib/          # Connexions externes
\`\`\`

## Backlog
- [ ] Dark mode
- [ ] Reset mot de passe
- [ ] Avatar utilisateur
- [ ] Google Auth
- [ ] GitHub Auth
- [ ] Resend (emails prod)