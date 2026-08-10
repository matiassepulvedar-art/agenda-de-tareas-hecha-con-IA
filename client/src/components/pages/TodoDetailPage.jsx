import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteTodo, fetchTodo, setTodoCompleted } from '../../api/client'
import Button from '../atoms/Button'
import Checkbox from '../atoms/Checkbox'
import Heading from '../atoms/Heading'
import Label from '../atoms/Label'
import Message from '../atoms/Message'
import Skeleton from '../atoms/Skeleton'
import Text from '../atoms/Text'

export default function TodoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const requestSeq = useRef(0)

  const load = useCallback(async () => {
    const seq = ++requestSeq.current
    try {
      setLoading(true)
      setError('')
      const data = await fetchTodo(id)
      if (seq === requestSeq.current) setTodo(data)
    } catch (err) {
      if (seq === requestSeq.current) setError(err.message)
    } finally {
      if (seq === requestSeq.current) setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  async function handleToggle() {
    if (!todo || saving) return
    const nextCompleted = !todo.completed
    const previous = todo
    setSaving(true)
    setTodo({ ...todo, completed: nextCompleted })
    try {
      setTodo(await setTodoCompleted(todo.id, nextCompleted))
    } catch (err) {
      setTodo(previous)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!todo) return
    if (!window.confirm(`¿Eliminar la tarea «${todo.title}»?`)) return
    try {
      await deleteTodo(id)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <main className="app">
        <Link to="/" className="btn btn--ghost">
          ← Volver
        </Link>
        <Skeleton count={3} />
      </main>
    )
  }

  if (error) {
    return (
      <main className="app">
        <Link to="/" className="btn btn--ghost">
          ← Volver
        </Link>
        <Message className="message message--error" role="alert">
          {error}
          <Button className="btn btn--retry" onClick={load}>
            Reintentar
          </Button>
        </Message>
      </main>
    )
  }

  return (
    <main className="app">
      <header className="app-header">
        <Link to="/" className="btn btn--ghost">
          ← Volver
        </Link>
        <p className="eyebrow">Detalle de la tarea</p>
        <Heading level={1} className="app-title">
          {todo.title}
        </Heading>
      </header>

      {todo.description && <Text className="page-lead">{todo.description}</Text>}

      <div className="detail-actions">
        <Label className="detail-toggle">
          <Checkbox className="checkbox" checked={todo.completed} onChange={handleToggle} disabled={saving} />
          <Text>Completada</Text>
        </Label>
        <Button className="btn btn--danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </main>
  )
}
