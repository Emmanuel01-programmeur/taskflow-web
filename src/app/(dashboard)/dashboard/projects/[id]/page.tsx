'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Task, Project } from '@/types'

const COLUMNS = [
  { id: 'todo', label: 'À faire' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'done', label: 'Terminé' },
] as const

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProject()
    fetchTasks()
  }, [id])

  async function fetchProject() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    setProject(data)
  }

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Erreur:', error)
      return
    }

    setTasks(data || [])
  }

  async function handleCreateTask() {
    setLoading(true)

    const { error } = await supabase
      .from('tasks')
      .insert({
        title: newTaskTitle,
        priority: newTaskPriority,
        status: 'todo',
        project_id: id
      })

    if (error) {
      console.error('Erreur:', error)
      setLoading(false)
      return
    }

    setNewTaskTitle('')
    setNewTaskPriority('medium')
    setShowModal(false)
    setLoading(false)
    fetchTasks()
  }

  async function handleMoveTask(taskId: string, newStatus: 'todo' | 'in_progress' | 'done') {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)

    if (error) {
      console.error('Erreur:', error)
      return
    }

    fetchTasks()
  }

  async function handleDeleteTask(taskId: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      console.error('Erreur:', error)
      return
    }

    fetchTasks()
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-amber-50 text-amber-700',
    high: 'bg-red-50 text-red-600'
  }

  const priorityLabels = {
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé'
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {project?.title || 'Chargement...'}
          </h1>
          {project?.description && (
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          Nouvelle tâche
        </button>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter(t => t.status === column.id)

          return (
            <div
              key={column.id}
              className="bg-gray-50 rounded-xl p-4"
            >
              {/* Header colonne */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-700">
                  {column.label}
                </h2>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              {/* Tâches */}
              <div className="flex flex-col gap-2">
                {columnTasks.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">
                    Aucune tâche
                  </p>
                )}
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-200 rounded-lg p-3"
                  >
                    <p className="text-sm text-gray-900 mb-2">{task.title}</p>

                    {/* Badge priorité */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                        {priorityLabels[task.priority]}
                      </span>

                      {/* Actions déplacer */}
                      {/* Actions déplacer */}
                      <div className="flex items-center gap-1">
                        {column.id !== 'todo' && (
                          <button
                            onClick={() => handleMoveTask(
                              task.id,
                              column.id === 'done' ? 'in_progress' : 'todo'
                            )}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                          >
                            ← Reculer
                          </button>
                        )}
                        {column.id !== 'done' && (
                          <button
                            onClick={() => handleMoveTask(
                              task.id,
                              column.id === 'todo' ? 'in_progress' : 'done'
                            )}
                            className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded hover:bg-teal-100 transition-colors"
                          >
                            Avancer →
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-xs bg-red-50 text-red-400 px-2 py-1 rounded hover:bg-red-100 transition-colors ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal nouvelle tâche */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md">

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Nouvelle tâche
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1 block">
                  Titre de la tâche
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Ma tâche..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-800 mb-1 block">
                  Priorité
                </label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyen</option>
                  <option value="high">Élevé</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setNewTaskTitle('')
                    setNewTaskPriority('medium')
                  }}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={!newTaskTitle || loading}
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