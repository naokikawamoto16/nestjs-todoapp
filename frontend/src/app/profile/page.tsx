"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Header } from "@/components/Header"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: number; email: string; password: string } | null>(null)
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/users/me",
          { credentials: "include" }
        )
        if (!response.ok) throw new Error('Failed to fetch user data')
        const userData = await response.json()
        setUser(userData)
        setEmail(userData.email)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUser()
  }, [setUser])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({ id: user?.id || 0, email, password })
    fetch(`http://localhost:3001/users/${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
    router.push("/tasks")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Password
                </label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
