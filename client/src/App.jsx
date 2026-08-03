import { useEffect, useState } from 'react'
import {
  fetchTodos,
  createTodo,
  setTodoCompleted,
  deleteTodo,
  updateTodo,
} from './api/client'

export default function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadTodos(search)
  }, [search])

  async function loadTodos(query = search) {
    try {
      setTodos(await fetchTodos(query))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleAdd(event) {
    event.preventDefault()
    try {
      await createTodo(title, description)
      setTitle('')
      setDescription('')
      await loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggle(todo) {
    try {
      await setTodoCompleted(todo.id, !todo.completed)
      await loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id)
      await loadTodos()
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
      await loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>Mis Todos</h1>

      <input
        type="search"
        placeholder="Buscar todos..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="todo-search"
      />

      <form onSubmit={handleAdd} className="todo-form">
        <input
          type="text"
          placeholder="Título (requerido)"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {todos.length === 0 ? (
        <p className="empty">No hay todos todavía</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              {editingId === todo.id ? (
                <form onSubmit={handleSaveEdit} className="edit-form">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(event) => setEditDescription(event.target.value)}
                  />
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditingId(null)}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo)}
                    />
                    <div>
                      <span className="title">{todo.title}</span>
                      {todo.description && (
                        <span className="description">{todo.description}</span>
                      )}
                    </div>
                  </label>
                  <button className="edit" onClick={() => startEdit(todo)}>
                    Editar
                  </button>
                  <button className="delete" onClick={() => handleDelete(todo.id)}>
                    Eliminar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
