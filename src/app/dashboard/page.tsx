export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Vue d'ensemble
      </h1>

      {/* Cartes de stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Projets actifs</p>
          <p className="text-3xl font-semibold text-gray-900">0</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Tâches en cours</p>
          <p className="text-3xl font-semibold text-gray-900">0</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Tâches terminées</p>
          <p className="text-3xl font-semibold text-gray-900">0</p>
        </div>
      </div>

      {/* Projets récents */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-base font-medium text-gray-900 mb-4">
          Projets récents
        </h2>
        <p className="text-sm text-gray-400 text-center py-8">
          Aucun projet pour l'instant — créez votre premier projet
        </p>
      </div>
    </div>
  )
}