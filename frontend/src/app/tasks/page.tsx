'use client'

import { useState } from 'react'
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
  id: number
  text: string
  completed: boolean
}

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText } : task
    ))
    setEditingId(null)
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
          <CardTitle>Task App</CardTitle>
          <CardDescription>Manage your tasks efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
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
                    <Button size="sm" onClick={() => saveEdit(task.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <span 
                    className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
                    onClick={() => startEditing(task.id, task.text)}
                  >
                    {task.text}
                  </span>
                )}
                {editingId !== task.id && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => startEditing(task.id, task.text)}>
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

