import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const [togglingIds, setTogglingIds] = useState(() => new Set())
  const noticeTimer = useRef(null)
  const requestSeq = useRef(0)

  const loadTodos = useCallback(async (showLoading = false) => {
    const seq = ++requestSeq.current
    try {
      if (showLoading) setLoading(true)
      setError('')
      const data = await fetchTodos()
      if (seq === requestSeq.current) setTodos(data)
    } catch (err) {
      if (seq === requestSeq.current) setError(err.message)
    } finally {
      if (showLoading && seq === requestSeq.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTodos(true)
  }, [loadTodos])

  useEffect(() => {
    return () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current)
    }
  }, [])

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
      const created = await createTodo(title, description)
      setTodos((prev) => [...prev, created])
      setTitle('')
      setDescription('')
      showNotice('Tarea creada')
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggle(todo) {
    const nextCompleted = !todo.completed
    setTogglingIds((prev) => new Set(prev).add(todo.id))
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, completed: nextCompleted } : t)),
    )
    try {
      const updated = await setTodoCompleted(todo.id, nextCompleted)
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, completed: updated.completed } : t)),
      )
    } catch (err) {
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, completed: todo.completed } : t)),
      )
      setError(err.message)
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev)
        next.delete(todo.id)
        return next
      })
    }
  }

  async function handleDelete(id) {
    const target = todos.find((t) => t.id === id)
    if (!target) return
    if (!window.confirm(`¿Eliminar la tarea «${target.title}»?`)) return
    const previous = todos
    setTodos((prev) => prev.filter((t) => t.id !== id))
    try {
      await deleteTodo(id)
      showNotice('Tarea eliminada')
    } catch (err) {
      setTodos(previous)
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
    const previous = todos
    setTodos((prev) =>
      prev.map((t) =>
        t.id === editingId ? { ...t, title: editTitle, description: editDescription } : t,
      ),
    )
    setEditingId(null)
    try {
      await updateTodo(editingId, { title: editTitle, description: editDescription })
      showNotice('Tarea guardada')
    } catch (err) {
      setTodos(previous)
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
      onRetry={() => loadTodos(true)}
      notice={notice}
      stats={{ total, done, pending, pct }}
      todos={visibleTodos}
      togglingIds={togglingIds}
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
