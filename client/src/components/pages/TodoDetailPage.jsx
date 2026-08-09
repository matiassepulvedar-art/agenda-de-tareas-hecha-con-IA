import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteTodo, fetchTodo, setTodoCompleted } from '../../api/client'
import Button from '../atoms/Button'
import Checkbox from '../atoms/Checkbox'
import Heading from '../atoms/Heading'
import Label from '../atoms/Label'
import Message from '../atoms/Message'
import Text from '../atoms/Text'

export default function TodoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    try {
      setLoading(true)
      setError('')
      setTodo(await fetchTodo(id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  async function handleToggle() {
    try {
      setTodo(await setTodoCompleted(id, !todo.completed))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete() {
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
        <div className="skeleton-list" aria-hidden="true">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
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
          <Checkbox className="checkbox" checked={todo.completed} onChange={handleToggle} />
          <Text>Completada</Text>
        </Label>
        <Button className="btn btn--danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </main>
  )
}
