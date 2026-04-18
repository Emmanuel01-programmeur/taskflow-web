import { createClient } from '@supabase/supabase-js'

// process.env lit les variables de ton fichier .env.local
// En prod, Vercel injecte ces mêmes variables automatiquement
// Le ! dit à TypeScript "je garantis que cette valeur existe"
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)