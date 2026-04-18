'use client'

import Link from 'next/dist/client/link'
import { useState } from 'react'

// Les props définissent ce que le composant reçoit depuis l'extérieur
interface AuthFormProps {
  mode: 'login' | 'signup'  // login ou signup — ça change le comportement
  onSubmit: (data: {
    name?: string
    email: string
    password: string
  }) => Promise<void>
  error: string
  loading: boolean
}

export default function AuthForm({ mode, onSubmit, error, loading }: AuthFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const[validationError, setValidationError] = useState('')
  
  const isLogin = mode === 'login'

  async function handleSubmit() {
    //vérification côté client pour signup
    if (!isLogin && password !==confirmPassword){
      setValidationError('Les mots de passe ne correspondent pas')
      return
    }
    setValidationError('')
    await onSubmit({ name, email, password })
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md">

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {isLogin ? 'Accédez à votre espace Ks-TaskFlow' : 'Rejoignez Ks-TaskFlow gratuitement'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">

          {/* Ce champ apparaît seulement sur signup */}
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-800 mb-1 block">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Emmanuel"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-800 mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800 mb-1 block">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900 placeholder:text-gray-400"
            />
          </div>
          {!isLogin && (<div>
                 <label className="text-sm font-medium text-gray-800 mb-1 block">
                   Confirmer le mot de passe
                 </label>
               <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 text-gray-900 placeholder:text-gray-400"
                />
    {/* Affiche l'erreur dès que l'utilisateur tape */}
    {confirmPassword && password !== confirmPassword && (
      <p className="text-red-500 text-xs mt-1">
        Les mots de passe ne correspondent pas
      </p>
    )}
    {confirmPassword && password === confirmPassword && (
      <p className="text-teal-600 text-xs mt-1">
        Les mots de passe correspondent
      </p>
    )}
  </div>
)}
         {/* Ce champ apparaît seulement sur signup */}
            {validationError && (
               <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {validationError}
               </div>)
            }

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password ||(!isLogin && !name) || (!isLogin && password !== confirmPassword)}
            className="bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
          >
            {loading
              ? isLogin ? 'Connexion...' : 'Création...'
              : isLogin ? 'Se connecter' : 'Créer mon compte'
            }
          </button>

          <p className="text-center text-sm text-gray-500">
            {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
            <Link             
              href={isLogin ? '/signup' : '/login'}
              className="text-teal-600 hover:underline">
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}