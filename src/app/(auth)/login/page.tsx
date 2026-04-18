'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AuthForm from '@/components/ui/AuthForm'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

 async function handleLogin({ email, password }: {
  email: string
  password: string
  name?: string
}) {
  setLoading(true)
  setError('')

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  console.log('data:', data)
  console.log('error:', error)

  if (error) {
    setError(error.message)
    setLoading(false)
    return
  }

  console.log('session:', data.session)
  console.log('user:', data.user)

  router.push('/dashboard')
  router.refresh()
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