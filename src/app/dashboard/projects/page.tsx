'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Project } from '@/types'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur:', error)
      return
    }

    setProjects(data || [])
  }

  async function handleCreateProject() {
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('projects')
      .insert({
        title,
        description,
        user_id: user.id,
        status: 'active'
      })

    if (error) {
      console.error('Erreur:', error)
      setLoading(false)
      return
    }

    setTitle('')
    setDescription('')
    setShowModal(false)
    setLoading(false)
    fetchProjects()
  }

  async function handleDeleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erreur suppression:', error)
      return
    }

    fetchProjects()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Projets
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          Nouveau projet
        </button>
      </div>

      {/* Liste des projets */}
      {projects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-400 text-sm">
            Aucun projet — cliquez sur "Nouveau projet" pour commencer
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-teal-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                    {project.status}
                  </span>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              {project.description && (
                <p className="text-sm text-gray-500">{project.description}</p>
              )}
              <p className="text-xs text-gray-400 mt-3">
                {new Date(project.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal création projet */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md">

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Nouveau projet
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1 block">
                  Nom du projet
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Mon projet"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-800 mb-1 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description du projet..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900 placeholder:text-gray-400 resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setTitle('')
                    setDescription('')
                  }}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!title || loading}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Création...' : 'Créer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}