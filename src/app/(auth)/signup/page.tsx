'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthForm from '@/components/ui/AuthForm'
import Link from 'next/link'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignup({ name, email, password }: {
    name?: string
    email: string
    password: string
  }) {
    setLoading(true)
    setError('')

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, name })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Compte créé
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Vérifie ton email pour confirmer puis connecte-toi.
          </p>
          
           <Link href="/login"
            className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 inline-block"
          >
            Aller au login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
      error={error}
      loading={loading}
    />
  )
}