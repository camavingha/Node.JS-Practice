'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [books, setBooks] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push('/login')
    } else {
      setUser(data.user)
      fetchBooks()
    }
  }

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setBooks(data || [])
  }

  const addBook = async () => {
    if (!user) return

    await supabase.from('books').insert([
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        status: 'reading',
        pages: 320,
        current_page: 10,
        user_id: user.id,
      },
    ])

    fetchBooks()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Books</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      <button
        onClick={addBook}
        className="bg-blue-500 text-white px-4 py-2 mb-6"
      >
        Add Sample Book
      </button>

      {books.length === 0 && (
        <p>No books yet.</p>
      )}

      {books.map((book) => (
        <div
          key={book.id}
          className="border p-4 mb-4 rounded"
        >
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Status: {book.status}</p>
          <p>
            Progress: {book.current_page} / {book.pages}
          </p>
        </div>
      ))}
    </main>
  )
}
