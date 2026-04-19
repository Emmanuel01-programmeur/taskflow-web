import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function DashboardPage() {
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

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')

  const activeProjects = projects?.filter(p => p.status === 'active') || []
  const inProgressTasks = tasks?.filter(t => t.status === 'in_progress') || []
  const doneTasks = tasks?.filter(t => t.status === 'done') || []
  const recentProjects = projects?.slice(0, 3) || []

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Vue d'ensemble
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Projets actifs</p>
          <p className="text-3xl font-semibold text-gray-900">
            {activeProjects.length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Tâches en cours</p>
          <p className="text-3xl font-semibold text-gray-900">
            {inProgressTasks.length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Tâches terminées</p>
          <p className="text-3xl font-semibold text-gray-900">
            {doneTasks.length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-base font-medium text-gray-900 mb-4">
          Projets récents
        </h2>
        {recentProjects.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            Aucun projet — créez votre premier projet
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:text-teal-600 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {project.title}
                  </p>
                  {project.description && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {project.description}
                    </p>
                  )}
                </div>
                <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                  {project.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}