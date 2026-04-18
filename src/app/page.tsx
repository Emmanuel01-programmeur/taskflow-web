import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          Ks-TaskFlow
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            Commencer
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Gestion de projets simplifiée
        </div>
        <h2 className="text-5xl font-semibold text-gray-900 mb-6 leading-tight">
          Gérez vos projets et tâches efficacement
        </h2>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          Ks-TaskFlow vous permet d'organiser vos projets, suivre vos tâches 
          et collaborer avec votre équipe — le tout en un seul endroit.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Créer un compte gratuit
          </Link>
          <Link
            href="/login"
            className="text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Gestion de projets</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Créez et organisez vos projets avec une vue claire de leur avancement.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Vue Kanban</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Visualisez vos tâches en colonnes et suivez leur progression facilement.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Sécurisé</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Vos données sont privées et sécurisées. Chaque utilisateur accède uniquement à ses projets.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-6 text-center">
        <p className="text-sm text-gray-400">
          Ks-TaskFlow — Fait avec Next.js et Supabase
        </p>
      </footer>

    </main>
  )
}