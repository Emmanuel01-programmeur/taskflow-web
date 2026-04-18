import Link from 'next/link'
import LogoutButton from '@/components/ui/LogoutButton'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Si pas de user valide → redirect login
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">
            Ks-TaskFlow
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Vue d'ensemble
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Projets
          </Link>
        </nav>

        {/* Bas de sidebar */}
        <div className="p-3 border-t border-gray-200">
          <LogoutButton />
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-medium text-gray-500">
            Tableau de bord
          </h2>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">
          {children}
        </div>

      </main>
    </div>
  )
}