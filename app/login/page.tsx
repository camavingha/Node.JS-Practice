'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/')
    }
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email to confirm!')
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Login / Signup</h1>

      <input
        className="border p-2 mb-3 block w-64"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 mb-3 block w-64"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="space-x-3">
        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Signup
        </button>
      </div>
    </div>
  )
}
