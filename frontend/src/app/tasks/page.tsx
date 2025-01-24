'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Task = {
  id: string
  name: string
  completed: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3001/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (!res.ok) {
          throw new Error('Failed to fetch tasks')
        }

        const data = await res.json()
        setTasks(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const addTask = async () => {
    if (newTask.trim() === '') return

    try {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: newTask,
          completed: false
        })
      })

      if (!res.ok) {
        throw new Error('Failed to add task')
      }

      const newTaskData = await res.json()
      setTasks([...tasks, newTaskData])
      setNewTask('')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id)
      if (!task) return

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          completed: !task.completed
        })
      })

      if (!res.ok) {
        throw new Error('Failed to update task')
      }

      const updatedTask = await res.json()
      setTasks(tasks.map(t => t.id === id ? updatedTask : t))
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error('Failed to delete task')
      }

      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  const startEditing = (id: string, name: string) => {
    setEditingId(id)
    setEditText(name)
  }

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: editText
        })
      })

      if (!res.ok) {
        throw new Error('Failed to update task')
      }

      const updatedTask = await res.json()
      setTasks(tasks.map(t => t.id === id ? updatedTask : t))
      setEditingId(null)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>ToDo App</CardTitle>
          <CardDescription>Manage your tasks efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask} className="bg-sky-600 hover:bg-sky-700">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          {loading ? (
            <div className="text-center">Loading tasks...</div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : (
            <ul className="space-y-2">
              {filteredTasks.map(task => (
                <li key={task.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  {editingId === task.id ? (
                    <div className="flex-1 flex items-center space-x-2">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                      />
                      <Button size="sm" onClick={() => saveEdit(task.id)} className="bg-sky-600 hover:bg-sky-700">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <span 
                      className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
                      onClick={() => startEditing(task.id, task.name)}
                    >
                      {task.name}
                    </span>
                  )}
                  {editingId !== task.id && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => startEditing(task.id, task.name)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <Select onValueChange={setFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </CardFooter>
      </Card>
    </div>
  )
}
