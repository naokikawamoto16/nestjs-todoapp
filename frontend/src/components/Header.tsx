"use client"

import Link from "next/link"

export function Header() {

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-slate-900 text-2xl font-bold">ToDo App</h1>
        <Link href="/profile" className="text-slate-600">
          Profile
        </Link>
      </div>
    </header>
  )
}
