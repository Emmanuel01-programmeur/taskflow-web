'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthForm from '@/components/ui/AuthForm'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin({ email, password }: {
    email: string
    password: string
    name?: string
  }) {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <AuthForm
      mode="login"
      onSubmit={handleLogin}
      error={error}
      loading={loading}
    />
  )
}