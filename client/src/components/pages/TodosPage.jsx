import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  fetchTodos,
  createTodo,
  setTodoCompleted,
  deleteTodo,
  updateTodo,
} from '../../api/client'
import TodoAppTemplate from '../templates/TodoAppTemplate'

export default function TodosPage({ filter = 'all' }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const noticeTimer = useRef(null)

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    return () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current)
    }
  }, [])

  async function load() {
    try {
      setLoading(true)
      setError('')
      setTodos(await fetchTodos())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function refresh() {
    try {
      setError('')
      setTodos(await fetchTodos())
    } catch (err) {
      setError(err.message)
    }
  }

  function showNotice(message) {
    if (noticeTimer.current) clearTimeout(noticeTimer.current)
    setNotice(message)
    noticeTimer.current = setTimeout(() => setNotice(''), 2600)
  }

  function handleSearchChange(value) {
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  async function handleAdd(event) {
    event.preventDefault()
    try {
      await createTodo(title, description)
      setTitle('')
      setDescription('')
      await refresh()
      showNotice('Tarea creada')
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggle(todo) {
    try {
      await setTodoCompleted(todo.id, !todo.completed)
      await refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id)
      await refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  function startEdit(todo) {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description)
  }

  async function handleSaveEdit(event) {
    event.preventDefault()
    try {
      await updateTodo(editingId, {
        title: editTitle,
        description: editDescription,
      })
      setEditingId(null)
      await refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  const visibleTodos = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return todos.filter((todo) => {
      if (filter === 'pending' && todo.completed) return false
      if (filter === 'completed' && !todo.completed) return false
      if (!needle) return true
      return (
        todo.title.toLowerCase().includes(needle) ||
        (todo.description || '').toLowerCase().includes(needle)
      )
    })
  }, [todos, filter, q])

  const total = todos.length
  const done = todos.filter((todo) => todo.completed).length
  const pending = total - done
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <TodoAppTemplate
      search={q}
      onSearchChange={handleSearchChange}
      filter={filter}
      query={q}
      loading={loading}
      onRetry={load}
      notice={notice}
      stats={{ total, done, pending, pct }}
      todos={visibleTodos}
      title={title}
      description={description}
      onTitleChange={(event) => setTitle(event.target.value)}
      onDescriptionChange={(event) => setDescription(event.target.value)}
      onAdd={handleAdd}
      error={error}
      editingId={editingId}
      editTitle={editTitle}
      editDescription={editDescription}
      onEditTitleChange={(event) => setEditTitle(event.target.value)}
      onEditDescriptionChange={(event) => setEditDescription(event.target.value)}
      onToggle={handleToggle}
      onEdit={startEdit}
      onDelete={handleDelete}
      onSave={handleSaveEdit}
      onCancel={() => setEditingId(null)}
    />
  )
}
